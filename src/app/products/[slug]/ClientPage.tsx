"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { mockProducts } from "@/lib/mock-data";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { Button } from "@/components/ui/Button";
import { SizeGuideModal } from "@/components/ui/SizeGuideModal";
import { ProductCard } from "@/components/product/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Heart, Star, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Loading from "./loading";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const params = useParams();
  const product = mockProducts.find((p) => p.id === params.slug);
  const { addItem, openCart } = useCartStore();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const { hasItem, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const isWishlisted = product ? hasItem(product.id) : false;
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Image Preloader Logic
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

  const recommendedProducts = mockProducts.filter((p) => p.id !== product?.id).slice(0, 4);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-semibold uppercase tracking-widest text-muted-foreground">Product not found</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (product.colors.length > 0 && !selectedColor) {
      toast.error("Please select a color");
      return;
    }

    addItem({
      product,
      quantity,
      selectedSize: selectedSize || undefined,
      selectedColor: selectedColor || undefined,
    });
    
    toast.success(`${product.name} added to cart`);
    openCart();
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    if (product) {
      const colorIndex = product.colors.indexOf(color);
      if (colorIndex === 0) {
        setSelectedImageIdx(0); // Primary color is always the first image
      } else if (colorIndex === 1) {
        setSelectedImageIdx(product.images.length - 1); // Secondary color was appended to the end
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {!imagesLoaded && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-background overflow-hidden flex flex-col"
          >
            <Loading />
          </motion.div>
        )}
      </AnimatePresence>
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 ${!imagesLoaded ? 'invisible h-0 overflow-hidden' : 'visible h-auto'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Product Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col-reverse md:flex-row gap-4"
        >
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:w-24 flex-shrink-0 hide-scrollbar pb-2 md:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative aspect-[3/4] w-20 md:w-full flex-shrink-0 overflow-hidden transition-all ${
                    selectedImageIdx === idx ? "ring-2 ring-accent ring-offset-2 ring-offset-background" : "border-2 border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`${product.name} - view ${idx + 1}`} fill sizes="100px" className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Main Image */}
          <div className="relative aspect-[3/4] md:aspect-[4/5] bg-muted overflow-hidden flex-1">
            <Image 
              src={product.images[selectedImageIdx]} 
              alt={product.name} 
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-opacity duration-300"
            />
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-4">{product.name}</h1>
            
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center text-accent">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`w-4 h-4 ${star <= Math.round(product.rating) ? "fill-accent" : "text-muted-foreground fill-transparent"}`} />
                ))}
              </div>
              <span className="text-sm font-bold text-accent">{product.rating}</span>
              <span className="text-sm text-muted-foreground underline cursor-pointer hover:text-white transition-colors">
                {product.reviewCount} Ratings
              </span>
            </div>

            <p className="text-xl md:text-2xl text-muted-foreground">${product.price.toFixed(2)}</p>
          </div>

          <div className="space-y-8 mb-10">
            {/* Colors */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase mb-3">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorSelect(color)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        selectedColor === color ? "ring-2 ring-accent ring-offset-2 ring-offset-background scale-110" : "border-2 border-transparent hover:scale-105"
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select color ${color}`}
                    >
                      {selectedColor === color && (
                        <Check className={color === "#ffffff" ? "text-black" : "text-white"} size={16} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-semibold tracking-wider uppercase">Size</h3>
                  <button 
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs text-muted-foreground underline hover:text-accent transition-colors"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 flex items-center justify-center text-sm font-medium transition-all ${
                        selectedSize === size 
                          ? "border-2 border-accent bg-accent/10 text-accent shadow-[0_0_10px_rgba(0,240,255,0.3)]" 
                          : "border border-border hover:border-accent hover:text-accent"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description & Highlights */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase mb-3">About this item</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{product.description}</p>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground leading-relaxed">
                {product.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
            </div>

            {/* Accordions */}
            <div className="border-t border-border pt-4 mt-8 space-y-4">
              {/* Materials & Care */}
              <div className="border-b border-border pb-4">
                <button 
                  className="flex justify-between items-center w-full text-left tracking-wider uppercase font-semibold text-sm hover:text-accent transition-colors"
                  onClick={() => setOpenAccordion(openAccordion === 'materials' ? null : 'materials')}
                >
                  Materials & Care
                  {openAccordion === 'materials' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <AnimatePresence>
                  {openAccordion === 'materials' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 space-y-4 text-muted-foreground text-sm">
                        <div>
                          <strong className="block text-white mb-1">Composition</strong>
                          <p>{product.materials}</p>
                        </div>
                        <div>
                          <strong className="block text-white mb-1">Care Instructions</strong>
                          <p>{product.careInstructions}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Shipping & Returns */}
              <div className="border-b border-border pb-4">
                <button 
                  className="flex justify-between items-center w-full text-left tracking-wider uppercase font-semibold text-sm hover:text-accent transition-colors"
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                >
                  Shipping & Returns
                  {openAccordion === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <AnimatePresence>
                  {openAccordion === 'shipping' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 space-y-4 text-muted-foreground text-sm">
                        <div>
                          <strong className="block text-white mb-1">Free Expedited Shipping</strong>
                          <p>All orders over $500 automatically qualify for free 2-day cyber-freight delivery.</p>
                        </div>
                        <div>
                          <strong className="block text-white mb-1">Returns</strong>
                          <p>We accept returns within 14 days of delivery. Items must be unworn with all tags attached.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              ADD TO CART
            </Button>
            <button 
              onClick={() => {
                if (!isMounted) return;
                if (isWishlisted) {
                  removeFromWishlist(product!.id);
                  toast("Removed from wishlist");
                } else {
                  addToWishlist(product!);
                  toast.success("Added to wishlist");
                }
              }}
              className="h-14 w-14 border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
            >
              <Heart className={`h-6 w-6 ${isMounted && isWishlisted ? "fill-accent text-accent" : ""}`} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* You May Also Like Section */}
      <div className="mt-24 border-t border-border pt-16">
        <h2 className="text-2xl md:text-3xl font-bold tracking-widest uppercase mb-10 text-center">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {recommendedProducts.map((recProduct, idx) => (
            <motion.div
              key={recProduct.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <ProductCard product={recProduct} />
            </motion.div>
          ))}
        </div>
      </div>

      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} category={product.category} />
    </div>
    </>
  );
}
