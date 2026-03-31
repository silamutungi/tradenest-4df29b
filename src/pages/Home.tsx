import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button } from '../components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section
        style={{ backgroundImage: 'url(https://loremflickr.com/1600/900/marketplace,vintage,handmade)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        className="relative min-h-[92vh] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">
          <p className="text-sm font-semibold tracking-widest uppercase text-white/60 mb-4">The marketplace for things that matter</p>
          <h1 className="text-5xl sm:text-7xl font-bold text-white leading-tight mb-6">
            Trade the rare,<br />the handmade,<br />the one-of-a-kind.
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-xl mb-10 leading-relaxed">
            Not everything deserves an algorithm. Sovereign is a calm, trust-first marketplace — built around the seller, not the platform.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/browse">
              <Button size="lg" className="min-h-[52px] px-8 text-base">Browse listings</Button>
            </Link>
            <Link to="/sell">
              <Button size="lg" variant="outline" className="min-h-[52px] px-8 text-base bg-white/10 border-white/30 text-white hover:bg-white/20">
                Start selling
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Differentiator 1: Seller Identity */}
      <section className="py-24 px-6 bg-background border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-4xl mb-6">🪪</p>
              <h2 className="text-3xl font-bold text-foreground mb-4 leading-tight">
                Sellers have a face,<br />not just a username.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Every seller on Sovereign has a verified profile — bio, review history, and average rating visible before you ever click a listing. You know who you're buying from, not just what they're selling.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⭐</span>
                  <span className="text-sm text-muted-foreground">Verified ratings after every transaction</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📝</span>
                  <span className="text-sm text-muted-foreground">Rich seller bios and full review history</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💬</span>
                  <span className="text-sm text-muted-foreground">Direct messaging before you commit</span>
                </div>
              </div>
            </div>
            <div className="bg-muted rounded-2xl p-8 flex flex-col gap-5 border border-border">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl">🧵</div>
                <div>
                  <p className="font-semibold text-foreground">Elara Voss</p>
                  <p className="text-sm text-muted-foreground">Handmade textiles · Since 2021</p>
                </div>
              </div>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-lg">★</span>)}
                <span className="text-sm text-muted-foreground ml-2">4.97 · 84 reviews</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic">&ldquo;I weave everything by hand in my studio in Lisbon. Every piece ships with a care card and the story behind the pattern.&rdquo;</p>
              <div className="grid grid-cols-3 gap-3 mt-2">
                <div className="bg-background rounded-lg p-3 border border-border text-center">
                  <p className="text-xl font-bold text-foreground">84</p>
                  <p className="text-xs text-muted-foreground">Sales</p>
                </div>
                <div className="bg-background rounded-lg p-3 border border-border text-center">
                  <p className="text-xl font-bold text-foreground">4.97</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
                <div className="bg-background rounded-lg p-3 border border-border text-center">
                  <p className="text-xl font-bold text-foreground">3y</p>
                  <p className="text-xs text-muted-foreground">Member</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiator 2: Curated Categories */}
      <section className="py-24 px-6 bg-muted/30 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { emoji: '🎨', label: 'Art', count: '2.1k items' },
                  { emoji: '✂️', label: 'Handmade', count: '4.8k items' },
                  { emoji: '🕰️', label: 'Vintage', count: '3.3k items' },
                  { emoji: '💎', label: 'Collectibles', count: '1.7k items' },
                  { emoji: '👗', label: 'Clothing', count: '2.9k items' },
                  { emoji: '🔌', label: 'Electronics', count: '890 items' },
                ].map(({ emoji, label, count }) => (
                  <Link
                    to="/browse"
                    key={label}
                    className="bg-background border border-border rounded-xl p-4 flex flex-col gap-2 hover:border-primary transition-colors"
                  >
                    <span className="text-3xl">{emoji}</span>
                    <span className="font-semibold text-foreground text-sm">{label}</span>
                    <span className="text-xs text-muted-foreground">{count}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <p className="text-4xl mb-6">🗂️</p>
              <h2 className="text-3xl font-bold text-foreground mb-4 leading-tight">
                Categories built for
                character, not volume.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                eBay lists 1.4 billion items. Sovereign lists fewer, better ones. Our categories are intentionally narrow — handmade, vintage, art, collectibles. No dropshipped bulk goods. No industrial surplus.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                We review all listings and remove anything that doesn't belong. Quality over quantity, always.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiator 3: Calm Auctions */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-4xl mb-6">⏳</p>
              <h2 className="text-3xl font-bold text-foreground mb-4 leading-tight">
                Auctions that extend,
                not explode.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Last-second sniping is a dark pattern. Sovereign's auctions auto-extend by 5 minutes any time a bid lands in the final 5 — giving everyone a fair chance without the panic.
              </p>
              <div className="flex flex-col gap-4">
                <div className="bg-muted rounded-xl p-4 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground">Sniping eliminated</span>
                    <span className="text-2xl">🚫</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Auto-extend on late bids. Every bidder plays on equal footing.</p>
                </div>
                <div className="bg-muted rounded-xl p-4 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground">Live bid feed</span>
                    <span className="text-2xl">📡</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Realtime updates so you always know where you stand — no page refresh needed.</p>
                </div>
                <div className="bg-muted rounded-xl p-4 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground">Reserve transparency</span>
                    <span className="text-2xl">🔓</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Sellers optionally disclose reserve prices. No mystery, no frustration.</p>
                </div>
              </div>
            </div>
            <div className="bg-muted/50 rounded-2xl p-8 border border-border">
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-6">Live auction — 3m 42s left</p>
              <p className="text-lg font-bold text-foreground mb-1">1960s Leica M3 Chrome Body</p>
              <p className="text-sm text-muted-foreground mb-6">Vintage · 7 bids · Auto-extend active</p>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-5xl font-bold text-foreground">$840</span>
                <span className="text-muted-foreground text-sm pb-2">current bid</span>
              </div>
              <div className="w-full bg-background rounded-full h-2 mb-2 border border-border overflow-hidden">
                <div className="bg-primary h-2 rounded-full" style={{ width: '73%' }} />
              </div>
              <p className="text-xs text-muted-foreground mb-6">73% of reserve met · Reserve visible</p>
              <div className="flex flex-col gap-2">
                {[
                  { bidder: 'Bidder #4', amount: '$840', time: '3m ago', top: true },
                  { bidder: 'Bidder #7', amount: '$790', time: '8m ago', top: false },
                  { bidder: 'Bidder #2', amount: '$740', time: '15m ago', top: false },
                ].map(({ bidder, amount, time, top }) => (
                  <div key={bidder} className={`flex items-center justify-between py-2 border-b border-border last:border-0 ${top ? 'text-foreground' : 'text-muted-foreground'}`}>
                    <span className="text-sm">{bidder}</span>
                    <span className={`font-semibold text-sm ${top ? 'text-primary' : ''}`}>{amount}</span>
                    <span className="text-xs">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-muted/40 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-5xl mb-6">✦</p>
          <h2 className="text-4xl font-bold text-foreground mb-4">Ready to sell something worth finding?</h2>
          <p className="text-muted-foreground text-lg mb-10">Join a marketplace that respects both the object and the person behind it.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/signup"><Button size="lg" className="min-h-[52px] px-10 text-base">Create your account</Button></Link>
            <Link to="/browse"><Button size="lg" variant="outline" className="min-h-[52px] px-10 text-base">Explore listings</Button></Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
