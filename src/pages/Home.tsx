import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button } from '../components/ui/button'
import { ShieldCheck, Star, Users } from 'lucide-react'

const HERO_IMAGE_URL = 'https://gudiuktjzynkjvtqmuvi.supabase.co/storage/v1/object/public/hero-images/2516aa74-5b63-432b-93d5-0e880504cbc3-hero.png'

const features = [
  { icon: '🛍️', title: 'Millions of unique items', body: 'Handmade crafts, vintage finds, collectibles, art, and everyday essentials — all in one place.' },
  { icon: '🔨', title: 'Auction and fixed price', body: 'List as a fixed-price sale or run a live auction. Buyers can bid and watch in real time.' },
  { icon: '⭐', title: 'Verified seller ratings', body: 'Every transaction builds your reputation. Buyers see your rating before they purchase.' },
  { icon: '💬', title: 'Direct buyer-seller chat', body: 'Ask questions, negotiate, and coordinate directly — no middleman, no friction.' }
]

const stats = [
  { label: 'Active listings', value: '2.4M+' },
  { label: 'Independent sellers', value: '180K+' },
  { label: 'Happy buyers', value: '3.1M+' }
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main>
        <section
          className="relative min-h-[100svh] flex items-end md:items-center overflow-hidden"
          style={{ backgroundImage: `url(${HERO_IMAGE_URL})`, backgroundSize: 'cover', backgroundPosition: 'center top' }}
          aria-label="Hero section"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          <div className="relative z-10 w-full max-w-3xl mx-auto px-6 pb-16 pt-32 md:py-32">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white mb-4 md:mb-6">
              The marketplace<br className="hidden sm:block" /> for everything<br className="hidden sm:block" /> worth finding.
            </h1>
            <p className="text-base md:text-lg text-white/80 mb-8 max-w-lg leading-relaxed">
              Discover handmade, vintage, and one-of-a-kind items from independent sellers worldwide. Buy securely or start selling in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/browse">
                <Button size="lg" className="w-full sm:w-auto min-h-[44px] px-8 text-base font-medium">
                  Browse listings
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-background">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-3 gap-8 text-center mb-20">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-3xl md:text-4xl font-bold text-foreground">{s.value}</p>
                  <p className="text-sm md:text-base text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {features.map((f) => (
                <div key={f.title} className="flex gap-5 items-start">
                  <span className="text-4xl shrink-0">{f.icon}</span>
                  <div>
                    <h2 className="text-lg font-bold text-foreground mb-2">{f.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-muted">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to start selling?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Create your free account, list your first item in under 5 minutes, and start reaching buyers today.
            </p>
            <Link to="/signup">
              <Button size="lg" className="min-h-[44px] px-10 text-base font-medium">Create free account</Button>
            </Link>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-background">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">Built for trust</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-start gap-3">
                <ShieldCheck className="w-8 h-8 text-primary" aria-hidden="true" />
                <h3 className="font-bold text-foreground text-lg">Secure payments</h3>
                <p className="text-muted-foreground leading-relaxed">Every payment is processed securely. Funds are held until you confirm delivery.</p>
              </div>
              <div className="flex flex-col items-start gap-3">
                <Star className="w-8 h-8 text-primary" aria-hidden="true" />
                <h3 className="font-bold text-foreground text-lg">Honest ratings</h3>
                <p className="text-muted-foreground leading-relaxed">Buyers rate every transaction. Sellers build real reputations over time.</p>
              </div>
              <div className="flex flex-col items-start gap-3">
                <Users className="w-8 h-8 text-primary" aria-hidden="true" />
                <h3 className="font-bold text-foreground text-lg">Real community</h3>
                <p className="text-muted-foreground leading-relaxed">Independent creators and collectors — not corporations. Real people, real items.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
