"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export function SizeGuideModal({ isOpen, onClose, category }: SizeGuideModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const clothingSizes = [
    { us: "XXS", uk: "4", eu: "32", it: "36", jp: "5" },
    { us: "XS", uk: "6", eu: "34", it: "38", jp: "7" },
    { us: "S", uk: "8", eu: "36", it: "40", jp: "9" },
    { us: "M", uk: "10", eu: "38", it: "42", jp: "11" },
    { us: "L", uk: "12", eu: "40", it: "44", jp: "13" },
    { us: "XL", uk: "14", eu: "42", it: "46", jp: "15" },
    { us: "XXL", uk: "16", eu: "44", it: "48", jp: "17" },
  ];

  const shoeSizes = [
    { us: "5", uk: "3", eu: "36", it: "35", jp: "22" },
    { us: "6", uk: "4", eu: "37", it: "36", jp: "23" },
    { us: "7", uk: "5", eu: "38", it: "37", jp: "24" },
    { us: "8", uk: "6", eu: "39", it: "38", jp: "25" },
    { us: "9", uk: "7", eu: "40", it: "39", jp: "26" },
    { us: "10", uk: "8", eu: "41", it: "40", jp: "27" },
    { us: "11", uk: "9", eu: "42", it: "41", jp: "28" },
  ];

  const isShoes = category?.toLowerCase() === "footwear";
  const sizes = isShoes ? shoeSizes : clothingSizes;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-3xl bg-background border border-border shadow-[0_0_40px_rgba(0,240,255,0.1)] overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
              <h2 className="text-xl font-bold tracking-widest uppercase">
                {isShoes ? "Shoe Size Guide" : "Clothing Size Guide"}
              </h2>
              <button 
                onClick={onClose}
                className="p-2 text-muted-foreground hover:text-accent transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto">
              <p className="text-muted-foreground mb-8">
                Measurements are provided as a guide. Please note that exact fits may vary by style and material. For detailed measurements of a specific item, please contact our client services.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="py-4 px-4 text-sm font-bold tracking-widest uppercase text-white">US / Standard</th>
                      <th className="py-4 px-4 text-sm font-bold tracking-widest uppercase text-muted-foreground">UK</th>
                      <th className="py-4 px-4 text-sm font-bold tracking-widest uppercase text-muted-foreground">EU</th>
                      <th className="py-4 px-4 text-sm font-bold tracking-widest uppercase text-muted-foreground">IT</th>
                      <th className="py-4 px-4 text-sm font-bold tracking-widest uppercase text-muted-foreground">JP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.map((size, index) => (
                      <tr 
                        key={index} 
                        className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-4 px-4 text-white font-medium">{size.us}</td>
                        <td className="py-4 px-4 text-muted-foreground">{size.uk}</td>
                        <td className="py-4 px-4 text-muted-foreground">{size.eu}</td>
                        <td className="py-4 px-4 text-muted-foreground">{size.it}</td>
                        <td className="py-4 px-4 text-muted-foreground">{size.jp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
