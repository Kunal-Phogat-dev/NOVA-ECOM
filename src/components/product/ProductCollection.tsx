"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Filter, X } from "lucide-react";

interface ProductCollectionProps {
  title: string;
  description?: string;
  products: Product[];
}

type SortOption = "featured" | "newest" | "price-asc" | "price-desc";

export function ProductCollection({ title, description, products }: ProductCollectionProps) {
  const [sort, setSort] = useState<SortOption>("featured");
  
  // Filter States
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Extract unique filter options from the available products
  const availableCategories = useMemo(() => Array.from(new Set(products.map(p => p.category))), [products]);
  const availableGenders = useMemo(() => Array.from(new Set(products.map(p => p.gender))), [products]);
  const availableColors = useMemo(() => Array.from(new Set(products.flatMap(p => p.colors))), [products]);

  const toggleFilter = (set: React.Dispatch<React.SetStateAction<string[]>>, current: string[], value: string) => {
    if (current.includes(value)) set(current.filter(item => item !== value));
    else set([...current, value]);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchGender = selectedGenders.length === 0 || selectedGenders.includes(p.gender);
      const matchColor = selectedColors.length === 0 || selectedColors.some(c => p.colors.includes(c));
      return matchCategory && matchGender && matchColor;
    });
  }, [products, selectedCategories, selectedGenders, selectedColors]);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "newest": return a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1;
      default: return 0; // featured (original order)
    }
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 md:mb-16 text-center max-w-2xl mx-auto"
      >
        <h1 className="text-3xl md:text-5xl font-bold tracking-widest uppercase mb-4">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </motion.div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-y border-border py-4 gap-4">
        <div className="flex items-center space-x-4">
          <button 
            className="flex lg:hidden items-center space-x-2 text-sm uppercase tracking-widest text-muted-foreground hover:text-white transition-colors"
            onClick={() => setIsMobileFilterOpen(true)}
          >
            <Filter size={16} />
            <span>Filters</span>
          </button>
          <span className="hidden sm:inline text-sm text-muted-foreground uppercase tracking-widest">
            {filteredProducts.length} Items
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm uppercase tracking-widest text-muted-foreground">Sort By:</span>
          <select 
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="bg-transparent text-sm border-none focus:ring-0 uppercase tracking-widest cursor-pointer hover:text-accent transition-colors outline-none"
          >
            <option value="featured" className="bg-background text-foreground">Featured</option>
            <option value="newest" className="bg-background text-foreground">New Arrivals</option>
            <option value="price-asc" className="bg-background text-foreground">Price: Low to High</option>
            <option value="price-desc" className="bg-background text-foreground">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block w-64 flex-shrink-0 space-y-10">
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-accent border-b border-border pb-2">Category</h3>
            <div className="space-y-2">
              {availableCategories.map(category => (
                <div key={category} onClick={() => toggleFilter(setSelectedCategories, selectedCategories, category)} className="flex items-center space-x-3 cursor-pointer group">
                  <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedCategories.includes(category) ? "border-accent bg-accent/20" : "border-muted-foreground group-hover:border-accent"}`}>
                    {selectedCategories.includes(category) && <div className="w-2 h-2 bg-accent" />}
                  </div>
                  <span className={`text-sm tracking-wide ${selectedCategories.includes(category) ? "text-white" : "text-muted-foreground group-hover:text-white"}`}>{category}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-accent border-b border-border pb-2">Gender</h3>
            <div className="space-y-2">
              {availableGenders.map(gender => (
                <div key={gender} onClick={() => toggleFilter(setSelectedGenders, selectedGenders, gender)} className="flex items-center space-x-3 cursor-pointer group">
                  <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedGenders.includes(gender) ? "border-accent bg-accent/20" : "border-muted-foreground group-hover:border-accent"}`}>
                    {selectedGenders.includes(gender) && <div className="w-2 h-2 bg-accent" />}
                  </div>
                  <span className={`text-sm tracking-wide ${selectedGenders.includes(gender) ? "text-white" : "text-muted-foreground group-hover:text-white"}`}>{gender}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-accent border-b border-border pb-2">Color</h3>
            <div className="flex flex-wrap gap-3">
              {availableColors.map(color => (
                <button
                  key={color}
                  onClick={() => toggleFilter(setSelectedColors, selectedColors, color)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${selectedColors.includes(color) ? "border-accent scale-110 shadow-[0_0_10px_rgba(0,240,255,0.5)]" : "border-border"}`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Filter Overlay */}
        <AnimatePresence>
          {isMobileFilterOpen && (
            <motion.div
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-0 z-50 bg-background flex flex-col pt-20 px-6 lg:hidden overflow-y-auto"
            >
              <button 
                className="absolute top-6 right-6 text-muted-foreground hover:text-white"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                <X size={24} />
              </button>
              
              <h2 className="text-2xl font-bold tracking-widest uppercase mb-8">Filters</h2>

              <div className="space-y-10 pb-24">
                <div>
                  <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-accent border-b border-border pb-2">Category</h3>
                  <div className="space-y-4">
                    {availableCategories.map(category => (
                      <label key={category} className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => toggleFilter(setSelectedCategories, selectedCategories, category)} className="w-5 h-5 accent-accent bg-transparent border-border" />
                        <span className="text-lg tracking-wide">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-accent border-b border-border pb-2">Gender</h3>
                  <div className="space-y-4">
                    {availableGenders.map(gender => (
                      <label key={gender} className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" checked={selectedGenders.includes(gender)} onChange={() => toggleFilter(setSelectedGenders, selectedGenders, gender)} className="w-5 h-5 accent-accent bg-transparent border-border" />
                        <span className="text-lg tracking-wide">{gender}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-accent border-b border-border pb-2">Color</h3>
                  <div className="flex flex-wrap gap-4">
                    {availableColors.map(color => (
                      <button
                        key={color}
                        onClick={() => toggleFilter(setSelectedColors, selectedColors, color)}
                        className={`w-10 h-10 rounded-full border-2 transition-transform ${selectedColors.includes(color) ? "border-accent scale-110 shadow-[0_0_10px_rgba(0,240,255,0.5)]" : "border-border"}`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
                <Button className="w-full" onClick={() => setIsMobileFilterOpen(false)}>
                  Show {filteredProducts.length} Results
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <div className="flex-1">
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-6">
              <p className="text-xl uppercase tracking-widest text-muted-foreground">No products found matching your filters</p>
              <Button onClick={() => { setSelectedCategories([]); setSelectedGenders([]); setSelectedColors([]); }} variant="outline">Clear Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
