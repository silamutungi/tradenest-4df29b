export type ListingType = 'fixed' | 'auction'
export type ListingStatus = 'active' | 'sold' | 'ended'
export type ListingCategory = 'handmade' | 'vintage' | 'collectibles' | 'art' | 'clothing' | 'electronics' | 'other'

export interface Listing {
  id: string
  user_id: string
  title: string
  description: string
  price: number
  category: ListingCategory
  listing_type: ListingType
  status: ListingStatus
  auction_end_at: string | null
  current_bid: number | null
  bid_count: number
  image_url: string | null
  created_at: string
  deleted_at: string | null
  seller_email?: string
}

export interface Bid {
  id: string
  listing_id: string
  user_id: string
  amount: number
  created_at: string
  deleted_at: string | null
}

export interface Review {
  id: string
  reviewer_id: string
  seller_id: string
  listing_id: string
  rating: number
  comment: string
  created_at: string
  deleted_at: string | null
}

export interface Profile {
  id: string
  user_id: string
  display_name: string
  bio: string | null
  avg_rating: number | null
  review_count: number
  created_at: string
}

export interface Message {
  id: string
  sender_id: string
  recipient_id: string
  listing_id: string
  content: string
  read: boolean
  created_at: string
  deleted_at: string | null
}
