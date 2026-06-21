"use client";

import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/loading/Skeleton";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full md:w-[400px] bg-background border-l border-border flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="text-lg font-semibold uppercase tracking-widest">Cart</h2>
              </div>
              <button 
                onClick={closeCart}
                className="p-2 text-muted-foreground hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {isLoading ? (
                <>
                  {[1, 2].map((i) => (
                    <div key={i} className="flex space-x-4">
                      <Skeleton className="w-24 h-32 flex-shrink-0" />
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <Skeleton className="h-4 w-3/4 mb-2" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                        <Skeleton className="h-6 w-full mt-4" />
                      </div>
                    </div>
                  ))}
                </>
              ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-70">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                  <p className="text-muted-foreground uppercase tracking-widest text-sm">Your cart is empty</p>
                  <Button variant="outline" onClick={closeCart} className="mt-4">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex space-x-4">
                    <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-muted">
                      <Image 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        fill
                        sizes="100px"
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-sm uppercase">{item.product.name}</h3>
                          <button 
                            onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                            className="text-muted-foreground hover:text-accent transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="mt-1 text-xs text-muted-foreground space-y-1">
                          {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                          {item.selectedColor && (
                            <div className="flex items-center space-x-2">
                              <span>Color:</span>
                              <div 
                                className="w-3 h-3 rounded-full border border-border" 
                                style={{ backgroundColor: item.selectedColor }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-border">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                            className="p-1 hover:bg-muted transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                            className="p-1 hover:bg-muted transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-medium text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-background">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Subtotal</span>
                  <span className="text-xl font-bold">${subtotal().toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-6">Shipping and taxes calculated at checkout.</p>
                
                {isMounted && isAuthenticated ? (
                  <Link href="/checkout" onClick={closeCart}>
                    <Button className="w-full" size="lg">
                      PROCEED TO CHECKOUT
                    </Button>
                  </Link>
                ) : (
                  <Link href="/auth?redirect=/checkout" onClick={closeCart}>
                    <Button className="w-full" size="lg">
                      LOGIN TO CHECKOUT
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
