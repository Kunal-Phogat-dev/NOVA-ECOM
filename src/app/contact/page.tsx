"use client";

import { motion } from "framer-motion";
import { Search, Box, CreditCard, User, Diamond, Shirt, Headphones, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CustomerServiceHub() {
  const supportTiles = [
    {
      title: "A Delivery, Order or Return",
      description: "Track packages, initiate returns, or report missing items.",
      icon: <Box className="w-8 h-8 text-accent" />,
      href: "/account"
    },
    {
      title: "Payment, Charges or Gift Cards",
      description: "Manage saved cards, crypto wallets, and billing issues.",
      icon: <CreditCard className="w-8 h-8 text-accent" />,
      href: "/account"
    },
    {
      title: "Login, Address & Security",
      description: "Update passwords, manage 2FA, and edit address book.",
      icon: <User className="w-8 h-8 text-accent" />,
      href: "/account"
    },
    {
      title: "NOVA Black Membership",
      description: "Manage your exclusive perks, early access, and concierge.",
      icon: <Diamond className="w-8 h-8 text-accent" />,
      href: "/account"
    },
    {
      title: "Styling & Sizing Advice",
      description: "Connect with a personal cyber-stylist or view size guides.",
      icon: <Shirt className="w-8 h-8 text-accent" />,
      href: "/faq"
    },
    {
      title: "Contact a Human",
      description: "Open a live chat or send an email to our support team.",
      icon: <Headphones className="w-8 h-8 text-accent" />,
      href: "#"
    }
  ];

  const helpTopics = [
    "Where is my refund?",
    "How do I track an international order?",
    "What is the return policy for sale items?",
    "How do I care for synthetic vegan leather?",
    "Can I change my shipping address after ordering?",
    "How does the NOVA Black Membership work?"
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 min-h-[80vh] max-w-6xl">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-3xl md:text-5xl font-bold tracking-widest uppercase mb-4">Welcome to Customer Service</h1>
        <h2 className="text-xl md:text-2xl text-muted-foreground tracking-wide">What would you like help with today?</h2>
      </motion.div>

      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative w-full max-w-2xl mb-16"
      >
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input 
          type="text" 
          placeholder="Search our help library..." 
          className="w-full bg-white/5 border border-border py-4 pl-12 pr-4 focus:outline-none focus:border-accent focus:bg-white/10 transition-colors text-white text-lg placeholder:text-muted-foreground"
        />
      </motion.div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {supportTiles.map((tile, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
          >
            <Link href={tile.href} className="block h-full group">
              <div className="border border-border/50 bg-background/50 backdrop-blur-sm p-8 h-full flex flex-col hover:border-accent hover:bg-white/5 transition-all duration-300">
                <div className="mb-6 bg-accent/10 w-16 h-16 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform duration-300">
                  {tile.icon}
                </div>
                <h3 className="text-lg font-bold tracking-widest uppercase mb-3">{tile.title}</h3>
                <p className="text-muted-foreground leading-relaxed flex-1">{tile.description}</p>
                <div className="mt-6 flex items-center text-sm font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>SELECT</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Help Topics Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="border-t border-border pt-16"
      >
        <h2 className="text-2xl font-bold tracking-widest uppercase mb-8">Search Help Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {helpTopics.map((topic, index) => (
            <Link 
              key={index} 
              href="/faq" 
              className="group flex items-center justify-between py-4 border-b border-border/50 hover:border-accent transition-colors"
            >
              <span className="text-muted-foreground group-hover:text-white transition-colors">{topic}</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-accent transition-all transform group-hover:translate-x-2" />
            </Link>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
