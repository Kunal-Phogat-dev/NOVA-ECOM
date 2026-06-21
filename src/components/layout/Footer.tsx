import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold tracking-widest text-white">NOVA</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-4 max-w-xs">
              Discover the Future of High-Fashion. Curated luxury for the bold.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider text-foreground mb-4 uppercase">Shop</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/new-arrivals" className="hover:text-accent transition-colors">New Arrivals</Link></li>
              <li><Link href="/category/women" className="hover:text-accent transition-colors">Women</Link></li>
              <li><Link href="/category/men" className="hover:text-accent transition-colors">Men</Link></li>
              <li><Link href="/collections" className="hover:text-accent transition-colors">Collections</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider text-foreground mb-4 uppercase">Support</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-accent transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider text-foreground mb-4 uppercase">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex" action="#">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-transparent border-b border-muted-foreground/50 px-0 py-2 text-sm focus:outline-none focus:border-accent text-white"
                required
              />
              <button
                type="button"
                className="ml-2 flex items-center justify-center text-muted-foreground hover:text-accent transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NOVA. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
