import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button } from '../components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <p className="text-6xl font-bold text-muted-foreground mb-4">404</p>
        <h1 className="text-2xl font-bold text-foreground mb-2">Page not found</h1>
        <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">This page does not exist or may have been moved. Head back to browse thousands of listings.</p>
        <Link to="/browse">
          <Button className="min-h-[44px]">Browse listings</Button>
        </Link>
      </main>
      <Footer />
    </div>
  )
}
