"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "Where do you ship to?",
        a: "We offer expedited global shipping. All international orders are handled via priority cyber-freight and usually arrive within 3-5 business days."
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes. All orders over $500 automatically qualify for complimentary priority shipping worldwide."
      },
      {
        q: "Can I track my order?",
        a: "Absolutely. Once your order has been dispatched, you will receive an encrypted tracking link via email to monitor your package in real-time."
      }
    ]
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 14 days of delivery. Items must be unworn, in their original pristine condition, with all tags and protective seals attached."
      },
      {
        q: "How do I initiate a return?",
        a: "Log into your account, navigate to your Orders page, and select 'Request Return'. You will be provided with a prepaid shipping label."
      }
    ]
  },
  {
    category: "Products & Sizing",
    questions: [
      {
        q: "How do I know my size?",
        a: "Every product page features a detailed 'Size Guide'. Since our garments feature avant-garde tailoring, please pay close attention to the specific measurements provided."
      },
      {
        q: "Are the materials sustainable?",
        a: "We are committed to the future. Our synthetic leathers are 100% cruelty-free, and we heavily utilize recycled polymers and sustainable cyber-wool blends."
      }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleAccordion = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 max-w-4xl min-h-[70vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h1 className="text-3xl md:text-5xl font-bold tracking-widest uppercase mb-4">Frequently Asked Questions</h1>
        <p className="text-muted-foreground text-lg">Everything you need to know about shopping with NOVA.</p>
      </motion.div>

      <div className="space-y-16">
        {faqs.map((section, sectionIndex) => (
          <motion.div 
            key={sectionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
          >
            <h2 className="text-xl font-bold tracking-widest uppercase mb-8 text-accent border-b border-border pb-4">
              {section.category}
            </h2>
            <div className="space-y-4">
              {section.questions.map((faq, faqIndex) => {
                const uniqueIndex = `${sectionIndex}-${faqIndex}`;
                const isOpen = openIndex === uniqueIndex;
                
                return (
                  <div key={uniqueIndex} className="border border-border/50 bg-background/50 backdrop-blur-sm">
                    <button 
                      className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors"
                      onClick={() => toggleAccordion(uniqueIndex)}
                    >
                      <span className="font-bold tracking-wide">{faq.q}</span>
                      {isOpen ? <ChevronUp className="text-accent" /> : <ChevronDown className="text-muted-foreground" />}
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 pt-0 text-muted-foreground leading-relaxed border-t border-border/50">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
