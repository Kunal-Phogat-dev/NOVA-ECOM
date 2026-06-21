"use client";

import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { mockProducts } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Loading from "./loading";

export default function Home() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const newArrivals = mockProducts.filter((p) => p.isNew).slice(0, 4);

  useEffect(() => {
    const images = Array.from(document.images);
    let loadedCount = 0;
    
    if (images.length === 0) {
      setImagesLoaded(true);
      return;
    }

    const checkDone = () => {
      loadedCount++;
      if (loadedCount >= images.length) {
        setImagesLoaded(true);
      }
    };

    images.forEach(img => {
      if (img.complete) {
        checkDone();
      } else {
        img.addEventListener('load', checkDone);
        img.addEventListener('error', checkDone);
      }
    });

    const timeout = setTimeout(() => setImagesLoaded(true), 2500);
    return () => clearTimeout(timeout);
  }, []);

  const scrollToProducts = () => {
    document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <AnimatePresence>
        {!imagesLoaded && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-background overflow-hidden"
          >
            <Loading />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className={`flex flex-col w-full ${!imagesLoaded ? 'invisible h-0 overflow-hidden' : 'visible h-auto'}`}>
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full bg-muted flex items-center justify-center overflow-hidden">
        {/* Background Image with slow zoom animation */}
        <motion.div 
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="/images/hero_image.png" 
            alt="Hero Background" 
            fill
            priority
            className="object-cover"
          />
        </motion.div>
        {/* Dynamic gradient overlay: dark on left for text, transparent on right for model */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase text-white mb-6 leading-tight">
              NOVA / SPRING '24 <br />
              COLLECTION
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 tracking-wide font-light max-w-lg">
              Discover the Future of High-Fashion. Curated luxury for the bold.
            </p>
            <Button size="lg" className="w-full sm:w-auto text-sm px-10" onClick={scrollToProducts}>
              SHOP THE LOOK
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section id="products-section" className="py-24 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-widest uppercase">New Arrivals</h2>
          <Link href="/collections" className="hidden sm:inline-flex">
            <Button variant="ghost">View All</Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {newArrivals.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center sm:hidden">
          <Link href="/collections">
            <Button variant="outline" className="w-full">View All</Button>
          </Link>
        </div>
      </section>
      </div>
    </>
  );
}
