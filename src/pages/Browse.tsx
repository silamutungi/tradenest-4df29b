import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { type Listing, type ListingCategory } from '../types'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Badge } from '../components/ui/badge'
import { Card, CardContent } from '../components/ui/card'
import { formatCurrency, timeUntil } from '../lib/utils'
import { Search } from 'lucide-react'

const CATEGORIES: { value: ListingCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'handmade', label: 'Handmade' },
  { value: 'vintage', label: 'Vintage' },
  { value: 'collectibles', label: 'Collectibles' },
  { value: 'art', label: 'Art' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'other', label: 'Other' }
]

export default function Browse() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<ListingCategory | 'all'>('all')

  useEffect(() => {
    fetchListings()
  }, [category])

  async function fetchListings() {
    setLoading(true)
    setError('')
    let query = supabase
      .from('listings')
      .select('*')
      .eq('status', 'active')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(48)
    if (category !== 'all') query = query.eq('category', category)
    const { data, error: fetchError } = await query
    setLoading(false)
    if (fetchError) {
      setError('Unable to load listings. Please try again.')
    } else {
      setListings(data ?? [])
    }
  }

  const filtered = listings.filter((l) =>
    search.trim() === '' || l.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">Browse listings</h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 flex flex-col gap-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
              <Input
                id="search"
                type="search"
                placeholder="Search for anything..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium min-h-[36px] transition-colors border focus:outline-none focus:ring-2 focus:ring-ring ${
                category === c.value
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-foreground border-border hover:bg-muted'
              }`}
              aria-pressed={category === c.value}
            >
              {c.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-48 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <p className="text-destructive mb-4">{error}</p>
            <Button variant="outline" onClick={fetchListings}>Try again</Button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <h2 className="text-xl font-bold text-foreground mb-2">Nothing found</h2>
            <p className="text-muted-foreground mb-6">Try a different search or category.</p>
            <Button variant="outline" onClick={() => { setSearch(''); setCategory('all') }}>Clear filters</Button>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((listing) => (
              <Link to={`/listings/${listing.id}`} key={listing.id} className="group focus:outline-none focus:ring-2 focus:ring-ring rounded-lg">
                <Card className="border border-border hover:border-primary transition-colors h-full">
                  <CardContent className="p-4 flex flex-col gap-3 h-full">
                    <div className="flex items-start justify-between gap-2">
                      <Badge variant={listing.listing_type === 'auction' ? 'default' : 'secondary'}>
                        {listing.listing_type === 'auction' ? 'Auction' : 'Buy now'}
                      </Badge>
                      <Badge variant="outline">{listing.category}</Badge>
                    </div>
                    <p className="font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">{listing.title}</p>
                    <div className="mt-auto">
                      <p className="text-xl font-bold text-foreground">{formatCurrency(listing.listing_type === 'auction' && listing.current_bid ? listing.current_bid : listing.price)}</p>
                      {listing.listing_type === 'auction' && (
                        <p className="text-xs text-muted-foreground mt-1">{listing.bid_count} bids &middot; {listing.auction_end_at ? timeUntil(listing.auction_end_at) : 'No end date'}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
