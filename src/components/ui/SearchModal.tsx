"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { mockProducts } from "@/lib/mock-data";
import Link from "next/link";
import Image from "next/image";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(mockProducts.slice(0, 4)); // default to some products
  
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = mockProducts.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.category.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex flex-col items-center pt-24 px-4"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="w-full max-w-3xl relative">
            <Search className="absolute left-0 top-4 w-8 h-8 text-muted-foreground" />
            <input
              type="text"
              autoFocus
              placeholder="Search for items, collections, or designers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent border-b-2 border-border text-2xl md:text-4xl py-4 pl-12 focus:outline-none focus:border-accent transition-colors placeholder:text-muted-foreground"
            />
          </div>

          <div className="w-full max-w-4xl mt-12 overflow-y-auto max-h-[60vh] hide-scrollbar pb-12">
            {query.length === 0 ? (
              <>
                <h3 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-6">Trending Searches</h3>
                <div className="flex flex-wrap gap-4 mb-12">
                  {["Neon Blazer", "Onyx Dress", "Cyber Handbag", "Spring '24"].map((term) => (
                    <button 
                      key={term}
                      onClick={() => { setQuery(term); }}
                      className="px-6 py-2 border border-border hover:border-accent hover:text-accent transition-colors rounded-none uppercase text-xs tracking-wider"
                    >
                      {term}
                    </button>
                  ))}
                </div>
                <h3 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-6">Suggested Products</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {mockProducts.slice(0, 4).map(product => (
                    <Link href={`/products/${product.id}`} key={product.id} onClick={onClose} className="group">
                      <div className="relative aspect-[4/5] bg-muted overflow-hidden mb-3">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider group-hover:text-accent transition-colors">{product.name}</h4>
                      <p className="text-xs text-muted-foreground">${product.price}</p>
                    </Link>
                  ))}
                </div>
              </>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {results.map(product => (
                  <Link href={`/products/${product.id}`} key={product.id} onClick={onClose} className="group">
                    <div className="relative aspect-[4/5] bg-muted overflow-hidden mb-3">
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider group-hover:text-accent transition-colors">{product.name}</h4>
                    <p className="text-xs text-muted-foreground">${product.price}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground tracking-widest uppercase">No results found for "{query}"</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
