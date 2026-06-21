"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import type { Product } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const { hasItem, addItem, removeItem } = useWishlistStore();
  const isWishlisted = isMounted && hasItem(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isMounted) return;
    if (hasItem(product.id)) removeItem(product.id);
    else addItem(product);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && product.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 1000);
    } else {
      setCurrentImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, product.images.length]);

  return (
    <motion.div
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} className="relative aspect-[4/5] overflow-hidden bg-muted mb-4 block border-2 border-transparent group-hover:border-accent transition-colors duration-300">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentImageIndex}
            src={product.images[currentImageIndex]}
            alt={product.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </AnimatePresence>
      </Link>

      <div className="flex flex-col space-y-1">
        <div className="flex justify-between items-start">
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="text-base font-semibold tracking-wider uppercase text-white group-hover:text-accent transition-colors">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center">
            {product.isNew && (
              <div className="bg-accent text-black text-[10px] font-bold px-2 py-0.5 mr-3 tracking-widest">
                NEW
              </div>
            )}
            <button 
              onClick={toggleWishlist}
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label="Toggle wishlist"
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-accent text-accent" : ""}`} />
            </button>
          </div>
        </div>
        <p className="text-sm text-white/80">${product.price}</p>
        
        {/* Underline matching the mockup */}
        <div className="mt-4 h-[1px] w-full bg-border group-hover:bg-accent transition-colors duration-300" />
      </div>
    </motion.div>
  );
}
