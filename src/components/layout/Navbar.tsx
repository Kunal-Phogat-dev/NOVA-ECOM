"use client";

import Link from "next/link";
import { Search, User, Heart, ShoppingBag, Menu } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuthStore } from "@/store/authStore";
import { useState, useEffect } from "react";
import { SearchModal } from "@/components/ui/SearchModal";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { openCart, totalItems } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const itemCount = isMounted ? totalItems() : 0;
  const { items: wishlistItems } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button 
              className="mr-4 sm:hidden text-foreground/80 hover:text-accent transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </button>
            <Link href="/" className="flex items-center space-x-2">
              <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white fill-current">
                <path d="M14.6 24L0 0H4.2L16.4 19.8V0H20.2V24H16.2L1.8 4.2V24H0V24H14.6ZM35.8 24C29.2 24 24.8 19.2 24.8 12C24.8 4.8 29.2 0 35.8 0C42.4 0 46.8 4.8 46.8 12C46.8 19.2 42.4 24 35.8 24ZM35.8 20.4C40.2 20.4 42.8 16.8 42.8 12C42.8 7.2 40.2 3.6 35.8 3.6C31.4 3.6 28.8 7.2 28.8 12C28.8 16.8 31.4 20.4 35.8 20.4ZM64.2 0L54.4 24H50.2L40.4 0H44.6L52.4 19.4L60.2 0H64.2ZM81.2 24L78.6 17H69L66.4 24H62.2L71.8 0H75.8L85.4 24H81.2ZM73.8 4.4L70.2 13.8H77.4L73.8 4.4Z" />
              </svg>
            </Link>
          </div>

          <nav className="hidden sm:flex items-center space-x-8 text-sm font-medium">
            <Link href="/new-arrivals" className="text-foreground/80 hover:text-accent transition-colors">
              New Arrivals
            </Link>
            <Link href="/category/women" className="text-foreground/80 hover:text-accent transition-colors">
              Women
            </Link>
            <Link href="/category/men" className="text-foreground/80 hover:text-accent transition-colors">
              Men
            </Link>
            <Link href="/collections" className="text-foreground/80 hover:text-accent transition-colors">
              Collections
            </Link>
            <Link href="/editorial" className="text-foreground/80 hover:text-accent transition-colors">
              Editorial
            </Link>
          </nav>

          <div className="flex items-center space-x-4 sm:space-x-6">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-foreground/80 hover:text-accent transition-colors"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </button>
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <Link href={isMounted && isAuthenticated ? "/account" : "/auth"} className="hidden sm:block text-foreground/80 hover:text-accent transition-colors">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
            <Link href="/wishlist" className="hidden sm:block text-foreground/80 hover:text-accent transition-colors relative">
              <Heart className="h-5 w-5" />
              {isMounted && wishlistItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  {wishlistItems.length}
                </span>
              )}
              <span className="sr-only">Wishlist</span>
            </Link>
            <button 
              className="text-foreground/80 hover:text-accent transition-colors relative"
              onClick={openCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background flex flex-col pt-20 px-6 sm:hidden"
          >
            <button 
              className="absolute top-6 right-6 text-muted-foreground hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            <nav className="flex flex-col space-y-8 text-2xl font-bold tracking-widest uppercase mt-8">
              <Link href="/new-arrivals" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent transition-colors">New Arrivals</Link>
              <Link href="/category/women" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent transition-colors">Women</Link>
              <Link href="/category/men" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent transition-colors">Men</Link>
              <Link href="/collections" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent transition-colors">Collections</Link>
              <Link href="/editorial" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent transition-colors">Editorial</Link>
            </nav>

            <div className="mt-auto pb-12 flex flex-col space-y-6">
              <Link href={isMounted && isAuthenticated ? "/account" : "/auth"} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-4 text-muted-foreground hover:text-accent transition-colors">
                <User className="h-6 w-6" />
                <span className="text-lg tracking-widest uppercase font-medium">Account</span>
              </Link>
              <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-4 text-muted-foreground hover:text-accent transition-colors relative">
                <Heart className="h-6 w-6" />
                <span className="text-lg tracking-widest uppercase font-medium">Wishlist</span>
                {isMounted && wishlistItems.length > 0 && (
                  <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
