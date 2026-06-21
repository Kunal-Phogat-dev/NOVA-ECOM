"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function EditorialPage() {
  const articles = [
    {
      id: 1,
      title: "The Cyber-Luxury Renaissance",
      excerpt: "How neon accents and high-tech fabrics are reshaping the runway this Spring.",
      image: "/images/hero_image.png",
      date: "Spring 2024",
    },
    {
      id: 2,
      title: "Behind the Design: The Aether Blazer",
      excerpt: "An exclusive look at the craftsmanship behind our most requested piece.",
      image: "/images/aether_blazer.png",
      date: "Editorial Exclusive",
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center max-w-2xl mx-auto"
      >
        <h1 className="text-3xl md:text-5xl font-bold tracking-widest uppercase mb-4">Editorial</h1>
        <p className="text-muted-foreground">The latest stories, campaigns, and insights from the world of NOVA.</p>
      </motion.div>

      <div className="space-y-24">
        {articles.map((article, index) => (
          <motion.article 
            key={article.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}
          >
            <div className="w-full lg:w-1/2 aspect-[4/3] overflow-hidden bg-muted">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className={`w-full lg:w-1/2 flex flex-col justify-center ${index % 2 !== 0 ? 'lg:items-end lg:text-right' : ''}`}>
              <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4">{article.date}</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase mb-6 leading-tight">{article.title}</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-md">{article.excerpt}</p>
              <Link href="/collections">
                <Button variant="outline">Read Full Story</Button>
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
