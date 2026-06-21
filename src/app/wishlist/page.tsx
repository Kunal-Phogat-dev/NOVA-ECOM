"use client";

import { ProductCollection } from "@/components/product/ProductCollection";
import { useWishlistStore } from "@/store/wishlistStore";
import { useState, useEffect } from "react";

export default function WishlistPage() {
  const { items } = useWishlistStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return null; // Prevent hydration mismatch by rendering nothing on server
  }

  return (
    <ProductCollection 
      title="Your Wishlist" 
      description={items.length === 0 ? "" : "Your curated selection of luxury fashion."}
      products={items} 
    />
  );
}
