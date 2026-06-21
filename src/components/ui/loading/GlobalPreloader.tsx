"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function GlobalPreloader() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);

    // Give the DOM a tiny bit of time to render the image tags
    const initTimer = setTimeout(() => {
      const images = Array.from(document.images);
      let loadedCount = 0;

      const hideLoader = () => {
        setIsLoading(false);
      };

      if (images.length === 0) {
        hideLoader();
        return;
      }

      const handleImageLoad = () => {
        loadedCount++;
        // We can hide loader if at least 70% of images are loaded, or all of them.
        if (loadedCount >= images.length) {
          hideLoader();
        }
      };

      images.forEach(img => {
        if (img.complete) {
          handleImageLoad();
        } else {
          img.addEventListener("load", handleImageLoad);
          img.addEventListener("error", handleImageLoad); // treat error as loaded so we don't block
        }
      });

      // Absolute max wait time of 2 seconds so the user isn't stuck
      const fallbackTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => {
        clearTimeout(fallbackTimeout);
        images.forEach(img => {
          img.removeEventListener("load", handleImageLoad);
          img.removeEventListener("error", handleImageLoad);
        });
      };
    }, 100);

    return () => clearTimeout(initTimer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            className="text-4xl md:text-6xl font-bold tracking-[0.3em] uppercase text-white mb-8 drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]"
          >
            NOVA
          </motion.h1>
          <div className="w-64 h-[2px] bg-white/10 overflow-hidden relative">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-y-0 left-0 w-1/2 bg-[#00f0ff] shadow-[0_0_15px_#00f0ff]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
