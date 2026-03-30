import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { type Listing } from '../types'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { formatCurrency, formatDate } from '../lib/utils'
import { Plus, Package, ShoppingBag } from 'lucide-react'

export default function Dashboard() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tab, setTab] = useState<'selling' | 'buying'>('selling')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserEmail(data.user.email ?? '')
    })
    fetchListings()
  }, [])

  async function fetchListings() {
    setLoading(true)
    setError('')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data, error: fetchError } = await supabase
      .from('listings')
      .select('*')
      .eq('user_id', user.id)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
    setLoading(false)
    if (fetchError) {
      setError('Unable to load your listings. Please try again.')
    } else {
      setListings(data ?? [])
    }
  }

  async function softDeleteListing(id: string) {
    if (!window.confirm('Remove this listing? This cannot be undone.')) return
    await supabase.from('listings').update({ deleted_at: new Date().toISOString() }).eq('id', id)
    setListings((prev) => prev.filter((l) => l.id !== id))
  }

  const statusColor = (s: string) =>
    s === 'active' ? 'default' : s === 'sold' ? 'secondary' : 'outline'

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Your marketplace</h1>
            <p className="text-muted-foreground text-sm mt-1">{userEmail}</p>
          </div>
          <Link to="/sell">
            <Button className="min-h-[44px] gap-2">
              <Plus className="w-4 h-4" aria-hidden="true" />
              New listing
            </Button>
          </Link>
        </div>

        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setTab('selling')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium min-h-[44px] transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
              tab === 'selling' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
            aria-label="View your listings"
          >
            <Package className="w-4 h-4" aria-hidden="true" />
            Selling
          </button>
          <button
            onClick={() => setTab('buying')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium min-h-[44px] transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
              tab === 'buying' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
            aria-label="View your purchases"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            Buying
          </button>
        </div>

        {tab === 'selling' && (
          <>
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 rounded-lg bg-muted animate-pulse" />
                ))}
              </div>
            )}
            {error && (
              <div className="text-center py-16">
                <p className="text-destructive mb-4">{error}</p>
                <Button variant="outline" onClick={fetchListings}>Try again</Button>
              </div>
            )}
            {!loading && !error && listings.length === 0 && (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">📦</p>
                <h2 className="text-xl font-bold text-foreground mb-2">No listings yet</h2>
                <p className="text-muted-foreground mb-6">Create your first listing and start selling today.</p>
                <Link to="/sell"><Button className="min-h-[44px]">Create a listing</Button></Link>
              </div>
            )}
            {!loading && !error && listings.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {listings.map((listing) => (
                  <Card key={listing.id} className="border border-border">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base font-semibold leading-snug">{listing.title}</CardTitle>
                        <Badge variant={statusColor(listing.status)}>{listing.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xl font-bold text-foreground">{formatCurrency(listing.price)}</p>
                          <p className="text-xs text-muted-foreground mt-1">{listing.listing_type === 'auction' ? `${listing.bid_count} bids` : 'Fixed price'} &middot; {formatDate(listing.created_at)}</p>
                        </div>
                        <div className="flex gap-2">
                          <Link to={`/listings/${listing.id}`}>
                            <Button variant="outline" size="sm" className="min-h-[36px]">View</Button>
                          </Link>
                          <Button variant="destructive" size="sm" className="min-h-[36px]" onClick={() => softDeleteListing(listing.id)}>Remove</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {tab === 'buying' && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🛍️</p>
            <h2 className="text-xl font-bold text-foreground mb-2">No purchases yet</h2>
            <p className="text-muted-foreground mb-6">Browse thousands of unique items and find something you love.</p>
            <Link to="/browse"><Button className="min-h-[44px]">Browse listings</Button></Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
