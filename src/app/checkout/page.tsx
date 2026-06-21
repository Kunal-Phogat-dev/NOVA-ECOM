"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth?redirect=/checkout");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const total = subtotal();
  const shipping = total > 0 ? 15 : 0;
  const tax = total * 0.08; // 8% tax mock
  const finalTotal = total + shipping + tax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Mock processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="mb-8"
        >
          <CheckCircle2 className="w-24 h-24 text-accent mx-auto" />
        </motion.div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-widest uppercase mb-4">Order Confirmed</h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-10">
          Thank you for your purchase. Your order has been processed and you will receive an email confirmation shortly.
        </p>
        <Link href="/">
          <Button size="lg">RETURN TO STORE</Button>
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-3xl font-bold tracking-widest uppercase mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/">
          <Button>CONTINUE SHOPPING</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      <h1 className="text-3xl md:text-4xl font-bold tracking-widest uppercase mb-12">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        {/* Left Column - Forms */}
        <div className="lg:col-span-7 space-y-12">
          
          <form id="checkout-form" onSubmit={handleCheckout} className="space-y-8">
            {/* Contact Info */}
            <section>
              <h2 className="text-xl font-semibold uppercase tracking-wider mb-6 pb-2 border-b border-border">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email Address</label>
                  <input type="email" id="email" required className="w-full bg-transparent border border-border p-3 focus:outline-none focus:border-accent transition-colors" />
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="text-xl font-semibold uppercase tracking-wider mb-6 pb-2 border-b border-border">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="firstName" className="block text-sm font-medium text-muted-foreground mb-1">First Name</label>
                  <input type="text" id="firstName" required className="w-full bg-transparent border border-border p-3 focus:outline-none focus:border-accent transition-colors" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="lastName" className="block text-sm font-medium text-muted-foreground mb-1">Last Name</label>
                  <input type="text" id="lastName" required className="w-full bg-transparent border border-border p-3 focus:outline-none focus:border-accent transition-colors" />
                </div>
                <div className="col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-muted-foreground mb-1">Address</label>
                  <input type="text" id="address" required className="w-full bg-transparent border border-border p-3 focus:outline-none focus:border-accent transition-colors" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="city" className="block text-sm font-medium text-muted-foreground mb-1">City</label>
                  <input type="text" id="city" required className="w-full bg-transparent border border-border p-3 focus:outline-none focus:border-accent transition-colors" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="postalCode" className="block text-sm font-medium text-muted-foreground mb-1">Postal Code</label>
                  <input type="text" id="postalCode" required className="w-full bg-transparent border border-border p-3 focus:outline-none focus:border-accent transition-colors" />
                </div>
              </div>
            </section>

            {/* Mock Payment (Stripe Elements UI Mock) */}
            <section>
              <div className="flex items-center space-x-4 mb-6 pb-2 border-b border-border">
                <h2 className="text-xl font-semibold uppercase tracking-wider">Payment</h2>
                <div className="px-3 py-1 border border-accent/30 bg-accent/10 text-accent text-xs tracking-widest uppercase font-bold rounded-full">
                  Mock System
                </div>
              </div>
              <div className="p-6 border border-border bg-muted/30">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-muted-foreground mb-1">Name on Card</label>
                    <input type="text" id="cardName" required className="w-full bg-transparent border border-border p-3 focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-muted-foreground mb-1">Card Number</label>
                    <div className="w-full bg-background border border-border p-3 flex items-center justify-between text-muted-foreground">
                      <span>•••• •••• •••• ••••</span>
                      <span className="text-xs font-mono bg-muted px-2 py-1">MM / YY / CVC</span>
                    </div>
                    <p className="text-xs text-accent mt-2">This is a mock payment interface for demo purposes.</p>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-muted p-6 md:p-8 sticky top-24">
            <h2 className="text-xl font-semibold uppercase tracking-wider mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex space-x-4">
                  <div className="relative w-16 h-20 bg-muted overflow-hidden flex-shrink-0">
                    <Image 
                      src={item.product.images[0]} 
                      alt={item.product.name}
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                    <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-accent text-accent-foreground text-xs font-bold rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-semibold text-sm uppercase">{item.product.name}</h3>
                    <div className="text-xs text-muted-foreground mt-1">
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="font-medium text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 py-6 border-t border-b border-border/50 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-base font-semibold uppercase tracking-wider">Total</span>
              <span className="text-2xl font-bold">${finalTotal.toFixed(2)}</span>
            </div>

            <Button 
              type="submit" 
              form="checkout-form" 
              size="lg" 
              className="w-full relative overflow-hidden"
              isLoading={isProcessing}
            >
              {isProcessing ? "PROCESSING..." : "PAY NOW"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
