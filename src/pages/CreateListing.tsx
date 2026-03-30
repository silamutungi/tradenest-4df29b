import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { type ListingCategory, type ListingType } from '../types'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

const CATEGORIES: ListingCategory[] = ['handmade', 'vintage', 'collectibles', 'art', 'clothing', 'electronics', 'other']

export default function CreateListing() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState<ListingCategory>('other')
  const [listingType, setListingType] = useState<ListingType>('fixed')
  const [auctionEnd, setAuctionEnd] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    const priceNum = parseFloat(price)
    if (!title.trim() || title.length < 3) { setError('Title must be at least 3 characters.'); return }
    if (!description.trim() || description.length < 10) { setError('Description must be at least 10 characters.'); return }
    if (isNaN(priceNum) || priceNum <= 0) { setError('Please enter a valid price.'); return }
    if (listingType === 'auction' && !auctionEnd) { setError('Please set an auction end date.'); return }
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setError('You must be signed in to list an item.'); setLoading(false); return }
    const { data, error: insertError } = await supabase.from('listings').insert({
      user_id: user.id,
      title: title.trim(),
      description: description.trim(),
      price: priceNum,
      category,
      listing_type: listingType,
      status: 'active',
      auction_end_at: listingType === 'auction' ? auctionEnd : null,
      current_bid: null,
      bid_count: 0
    }).select().single()
    setLoading(false)
    if (insertError) {
      setError('Your listing could not be saved. Please try again.')
    } else if (data) {
      navigate(`/listings/${data.id}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-12">
        <h1 className="text-2xl font-bold text-foreground mb-8">Create a listing</h1>
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-lg">Item details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What are you selling?" maxLength={120} required disabled={loading} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your item — condition, size, history, materials..."
                  maxLength={2000}
                  required
                  disabled={loading}
                  rows={5}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 resize-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ListingCategory)}
                  disabled={loading}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Listing type</Label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
                    <input type="radio" name="listingType" value="fixed" checked={listingType === 'fixed'} onChange={() => setListingType('fixed')} disabled={loading} className="accent-primary" />
                    <span className="text-sm font-medium">Fixed price</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
                    <input type="radio" name="listingType" value="auction" checked={listingType === 'auction'} onChange={() => setListingType('auction')} disabled={loading} className="accent-primary" />
                    <span className="text-sm font-medium">Auction</span>
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="price">{listingType === 'auction' ? 'Starting bid (USD)' : 'Price (USD)'}</Label>
                <Input id="price" type="number" min="0.01" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" required disabled={loading} />
              </div>
              {listingType === 'auction' && (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="auctionEnd">Auction ends at</Label>
                  <Input id="auctionEnd" type="datetime-local" value={auctionEnd} onChange={(e) => setAuctionEnd(e.target.value)} required disabled={loading} />
                </div>
              )}
              {error && <p role="alert" aria-live="polite" className="text-sm text-destructive">{error}</p>}
              <Button type="submit" disabled={loading} className="w-full min-h-[44px]">
                {loading ? 'Publishing...' : 'Publish listing'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
