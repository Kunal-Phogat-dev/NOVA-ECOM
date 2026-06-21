"use client";

import { motion } from "framer-motion";
import { Package, Truck, RotateCcw, ShieldCheck } from "lucide-react";

export default function ShippingReturnsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 min-h-[80vh] max-w-4xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h1 className="text-3xl md:text-5xl font-bold tracking-widest uppercase mb-4">Shipping & Returns</h1>
        <p className="text-muted-foreground text-lg">Global priority transit and seamless returns for the elite.</p>
      </motion.div>

      <div className="space-y-16">
        {/* Shipping Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="border border-border/50 bg-background/50 backdrop-blur-sm p-8 md:p-12"
        >
          <div className="flex items-center space-x-4 mb-8 border-b border-border pb-4">
            <Truck className="w-8 h-8 text-accent" />
            <h2 className="text-2xl font-bold tracking-widest uppercase">Global Shipping</h2>
          </div>
          
          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <div>
              <h3 className="text-white font-bold tracking-widest uppercase mb-2">Priority Cyber-Freight</h3>
              <p>
                NOVA operates on a priority global fulfillment network. All orders are processed within 24 hours of payment verification. 
                Our logistical grid ensures that your luxury items are transported securely and efficiently.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 p-6 border border-border/30">
                <h4 className="text-accent font-bold uppercase tracking-wider mb-2 text-sm">Domestic (US/JP/EU)</h4>
                <p className="text-sm">Delivery within 1-3 business days.<br/>Complimentary on orders over $500.<br/>Standard flat rate: $15.</p>
              </div>
              <div className="bg-white/5 p-6 border border-border/30">
                <h4 className="text-accent font-bold uppercase tracking-wider mb-2 text-sm">International Rest of World</h4>
                <p className="text-sm">Delivery within 3-7 business days.<br/>Taxes and duties calculated at checkout.<br/>Priority flat rate: $45.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 mt-6 p-4 bg-accent/5 border border-accent/20 rounded-sm">
              <Package className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-sm text-white">
                Every order is shipped in our signature carbon-neutral NOVA lock-boxes to ensure maximum security and pristine unboxing conditions.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Returns Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border border-border/50 bg-background/50 backdrop-blur-sm p-8 md:p-12"
        >
          <div className="flex items-center space-x-4 mb-8 border-b border-border pb-4">
            <RotateCcw className="w-8 h-8 text-accent" />
            <h2 className="text-2xl font-bold tracking-widest uppercase">Returns & Exchanges</h2>
          </div>
          
          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <div>
              <h3 className="text-white font-bold tracking-widest uppercase mb-2">The 14-Day Guarantee</h3>
              <p>
                We accept returns within 14 days of the delivery date. To be eligible for a return, the item must be unworn, unwashed, and in its pristine original condition with all NOVA holographic security tags attached.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-bold tracking-widest uppercase">How to Initiate a Return</h3>
              <ol className="list-decimal list-inside space-y-3 marker:text-accent">
                <li>Navigate to the <span className="text-white">Customer Service Hub</span> and select your recent order.</li>
                <li>Select the items you wish to return and instantly generate a prepaid cryptographic shipping label.</li>
                <li>Securely repackage the item in the original lock-box.</li>
                <li>Drop the package off at any authorized priority courier terminal.</li>
              </ol>
            </div>

            <div className="flex items-start space-x-3 mt-6 p-4 bg-white/5 border border-border/30 rounded-sm">
              <ShieldCheck className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                Refunds are processed within 48 hours of inspection at our facility. The funds will be returned to your original payment method or crypto-wallet.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
