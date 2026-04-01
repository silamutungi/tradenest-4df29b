import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Button } from './ui/button'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
        <Link to="/" className="font-bold text-xl text-foreground tracking-tight focus:outline-none focus:ring-2 focus:ring-ring rounded">TradeNest</Link>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/browse" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">Browse</Link>
          <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">Contact</Link>
          {user ? (
            <>
              <Link to="/sell" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">Sell</Link>
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">Dashboard</Link>
              <Button variant="outline" size="sm" onClick={handleLogout} className="min-h-[36px]">Sign out</Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">Sign in</Link>
              <Link to="/signup">
                <Button size="sm" className="min-h-[36px]">Start selling</Button>
              </Link>
            </>
          )}
        </div>
        <button
          className="md:hidden p-2 rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 pb-6 flex flex-col gap-4">
          <Link to="/browse" className="text-sm font-medium text-foreground py-2 min-h-[44px] flex items-center" onClick={() => setOpen(false)}>Browse</Link>
          <Link to="/contact" className="text-sm font-medium text-foreground py-2 min-h-[44px] flex items-center" onClick={() => setOpen(false)}>Contact</Link>
          {user ? (
            <>
              <Link to="/sell" className="text-sm font-medium text-foreground py-2 min-h-[44px] flex items-center" onClick={() => setOpen(false)}>Sell</Link>
              <Link to="/dashboard" className="text-sm font-medium text-foreground py-2 min-h-[44px] flex items-center" onClick={() => setOpen(false)}>Dashboard</Link>
              <Button variant="outline" onClick={() => { handleLogout(); setOpen(false) }} className="min-h-[44px] w-full">Sign out</Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-foreground py-2 min-h-[44px] flex items-center" onClick={() => setOpen(false)}>Sign in</Link>
              <Link to="/signup" onClick={() => setOpen(false)}>
                <Button className="min-h-[44px] w-full">Start selling</Button>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}
