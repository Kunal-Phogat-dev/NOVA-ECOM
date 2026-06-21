"use client";

import { ProductCollection } from "@/components/product/ProductCollection";
import { useWishlistStore } from "@/store/wishlistStore";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function WishlistPage() {
  const { items } = useWishlistStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return null; // Prevent hydration mismatch by rendering nothing on server
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-[60vh] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto border border-border">
            <Heart className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-widest uppercase">Wishlist Empty</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            You haven't added any items to your wishlist yet. Discover our latest collections and save your favorite pieces.
          </p>
          <Link href="/collections" className="inline-block mt-4">
            <Button size="lg">EXPLORE COLLECTIONS</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <ProductCollection 
      title="Your Wishlist" 
      description="Your curated selection of luxury fashion."
      products={items} 
    />
  );
}
