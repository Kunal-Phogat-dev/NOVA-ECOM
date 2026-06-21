"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

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

          <div className="w-full max-w-3xl mt-12">
            <h3 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-6">Trending Searches</h3>
            <div className="flex flex-wrap gap-4">
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
