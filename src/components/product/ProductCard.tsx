"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import type { Product } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import Image from "next/image";
import { toast } from "sonner";

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
    if (hasItem(product.id)) {
      removeItem(product.id);
      toast("Removed from wishlist");
    } else {
      addItem(product);
      toast.success("Added to wishlist");
    }
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
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/products/${product.id}`} className="relative aspect-[4/5] overflow-hidden bg-muted mb-4 block border-2 border-transparent group-hover:border-accent transition-all duration-300">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={product.images[currentImageIndex]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </motion.div>
        </AnimatePresence>
      </Link>

      <div className="flex flex-col space-y-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-base font-semibold tracking-wider uppercase text-white group-hover:text-accent transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-white/80">${product.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center">
            {product.isNew && (
              <div className="bg-accent text-black text-[10px] font-bold px-2 py-0.5 mr-3 tracking-widest">
                NEW
              </div>
            )}
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={toggleWishlist}
              className="text-muted-foreground hover:text-accent transition-colors p-1"
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-accent text-accent" : ""}`} />
            </motion.button>
          </div>
        </div>
        
        {/* Underline matching the mockup */}
        <div className="mt-4 h-[1px] w-full bg-border group-hover:bg-accent transition-colors duration-300" />
      </div>
    </motion.div>
  );
}
