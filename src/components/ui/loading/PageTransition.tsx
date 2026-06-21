"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

function PageTransitionInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Show the progress bar when the route changes
    setIsNavigating(true);
    
    // Hide it shortly after the new route renders
    const timeout = setTimeout(() => {
      setIsNavigating(false);
    }, 600);

    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "circOut" }}
          style={{ transformOrigin: "0% 50%" }}
          className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-[100] shadow-[0_0_10px_#00f0ff]"
        />
      )}
    </AnimatePresence>
  );
}

export function PageTransition() {
  return (
    <Suspense fallback={null}>
      <PageTransitionInner />
    </Suspense>
  );
}
