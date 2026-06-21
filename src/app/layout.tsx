import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOVA | Premium Fashion",
  description: "Discover the Future of High-Fashion. Curated luxury for the bold.",
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { PageTransition } from "@/components/ui/loading/PageTransition";
import { GlobalPreloader } from "@/components/ui/loading/GlobalPreloader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark antialiased bg-background text-foreground">
      <body className="min-h-screen flex flex-col font-sans">
        <GlobalPreloader />
        <PageTransition />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <CartDrawer />
        
        {/* Subtle Creator Badge */}
        <a 
          href="https://kunalphogat.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 z-50 text-[10px] uppercase tracking-widest text-muted-foreground/50 hover:text-accent transition-colors bg-background/50 backdrop-blur-sm px-2 py-1 border border-border/30 rounded-none"
        >
          Built by Kunal Phogat
        </a>
      </body>
    </html>
  );
}
