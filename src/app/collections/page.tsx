import { ProductCollection } from "@/components/product/ProductCollection";
import { mockProducts } from "@/lib/mock-data";

export default function CollectionsPage() {
  return (
    <ProductCollection 
      title="All Collections" 
      description="Explore the entire NOVA archive of cyber-luxury fashion."
      products={mockProducts} 
    />
  );
}
