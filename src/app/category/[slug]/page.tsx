import { ProductCollection } from "@/components/product/ProductCollection";
import { mockProducts } from "@/lib/mock-data";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.toLowerCase();
  
  const categoryProducts = mockProducts.filter((p) => 
    p.category.toLowerCase() === slug || 
    p.gender.toLowerCase() === slug ||
    (slug === "women" && p.gender.toLowerCase() === "unisex") ||
    (slug === "men" && p.gender.toLowerCase() === "unisex")
  );
  
  const title = slug.charAt(0).toUpperCase() + slug.slice(1);
  
  return (
    <ProductCollection 
      title={`${title}`} 
      description={`Shop the latest in luxury cyber-fashion for ${title}.`}
      products={categoryProducts} 
    />
  );
}
