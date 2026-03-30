import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { type Listing, type Bid } from '../types'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Badge } from '../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { formatCurrency, formatDate, timeUntil } from '../lib/utils'

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>()
  const [listing, setListing] = useState<Listing | null>(null)
  const [bids, setBids] = useState<Bid[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [bidAmount, setBidAmount] = useState('')
  const [bidLoading, setBidLoading] = useState(false)
  const [bidError, setBidError] = useState('')
  const [bidSuccess, setBidSuccess] = useState('')
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null))
    fetchListing()
  }, [id])

  async function fetchListing() {
    if (!id) return
    setLoading(true)
    setError('')
    const { data, error: fetchError } = await supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single()
    if (fetchError || !data) {
      setError('This listing could not be found.')
      setLoading(false)
      return
    }
    setListing(data)
    if (data.listing_type === 'auction') {
      const { data: bidData } = await supabase
        .from('bids')
        .select('*')
        .eq('listing_id', id)
        .is('deleted_at', null)
        .order('amount', { ascending: false })
        .limit(10)
      setBids(bidData ?? [])
    }
    setLoading(false)
  }

  async function placeBid() {
    setBidError('')
    setBidSuccess('')
    if (!userId) { setBidError('You must be signed in to bid.'); return }
    if (!listing) return
    const amount = parseFloat(bidAmount)
    const minBid = listing.current_bid ? listing.current_bid + 1 : listing.price
    if (isNaN(amount) || amount < minBid) {
      setBidError(`Bid must be at least ${formatCurrency(minBid)}.`)
      return
    }
    setBidLoading(true)
    const { error: bidErr } = await supabase.from('bids').insert({ listing_id: listing.id, user_id: userId, amount })
    if (bidErr) {
      setBidError('Your bid could not be placed. Please try again.')
    } else {
      await supabase.from('listings').update({ current_bid: amount, bid_count: (listing.bid_count ?? 0) + 1 }).eq('id', listing.id)
      setBidSuccess(`Your bid of ${formatCurrency(amount)} was placed.`)
      setBidAmount('')
      fetchListing()
    }
    setBidLoading(false)
  }

  if (loading) return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <div className="h-64 rounded-lg bg-muted animate-pulse mb-6" />
        <div className="h-8 rounded bg-muted animate-pulse w-1/2 mb-4" />
        <div className="h-4 rounded bg-muted animate-pulse w-1/3" />
      </main>
      <Footer />
    </div>
  )

  if (error || !listing) return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <p className="text-4xl mb-4">🔍</p>
        <h1 className="text-2xl font-bold text-foreground mb-2">Listing not found</h1>
        <p className="text-muted-foreground mb-6">{error || 'This item may have been removed.'}</p>
        <Link to="/browse"><Button>Browse all listings</Button></Link>
      </main>
      <Footer />
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="w-full aspect-square rounded-lg bg-muted flex items-center justify-center">
              <span className="text-7xl" aria-label="Product placeholder">📦</span>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-2 flex-wrap">
              <Badge>{listing.category}</Badge>
              <Badge variant={listing.listing_type === 'auction' ? 'default' : 'secondary'}>{listing.listing_type === 'auction' ? 'Auction' : 'Fixed price'}</Badge>
              <Badge variant="outline">{listing.status}</Badge>
            </div>
            <h1 className="text-2xl font-bold text-foreground leading-snug">{listing.title}</h1>
            <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
            <div>
              <p className="text-3xl font-bold text-foreground">
                {formatCurrency(listing.listing_type === 'auction' && listing.current_bid ? listing.current_bid : listing.price)}
              </p>
              {listing.listing_type === 'auction' && (
                <p className="text-sm text-muted-foreground mt-1">
                  {listing.bid_count} bids &middot; {listing.auction_end_at ? timeUntil(listing.auction_end_at) : 'No end date'}
                </p>
              )}
            </div>
            <p className="text-sm text-muted-foreground">Listed on {formatDate(listing.created_at)}</p>

            {listing.listing_type === 'auction' && listing.status === 'active' && (
              <Card className="border border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Place a bid</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <Label htmlFor="bidAmount">Your bid amount (USD)</Label>
                  <Input
                    id="bidAmount"
                    type="number"
                    min={listing.current_bid ? listing.current_bid + 1 : listing.price}
                    step="0.01"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder={`Min. ${formatCurrency(listing.current_bid ? listing.current_bid + 1 : listing.price)}`}
                    disabled={bidLoading}
                  />
                  {bidError && <p role="alert" aria-live="polite" className="text-sm text-destructive">{bidError}</p>}
                  {bidSuccess && <p role="status" aria-live="polite" className="text-sm text-green-600 dark:text-green-400">{bidSuccess}</p>}
                  <Button onClick={placeBid} disabled={bidLoading} className="min-h-[44px]">
                    {bidLoading ? 'Placing bid...' : 'Place bid'}
                  </Button>
                  {!userId && <p className="text-xs text-muted-foreground"><Link to="/login" className="underline">Sign in</Link> to place a bid.</p>}
                </CardContent>
              </Card>
            )}

            {listing.listing_type === 'fixed' && listing.status === 'active' && (
              <Button className="w-full min-h-[44px] text-base">Buy now — {formatCurrency(listing.price)}</Button>
            )}
          </div>
        </div>

        {listing.listing_type === 'auction' && bids.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-foreground mb-4">Recent bids</h2>
            <div className="flex flex-col gap-2">
              {bids.map((bid, i) => (
                <div key={bid.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">Bidder #{i + 1}</span>
                  <span className="font-semibold text-foreground">{formatCurrency(bid.amount)}</span>
                  <span className="text-xs text-muted-foreground">{formatDate(bid.created_at)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
