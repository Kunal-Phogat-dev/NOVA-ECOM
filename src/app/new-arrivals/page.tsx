import { ProductCollection } from "@/components/product/ProductCollection";
import { mockProducts } from "@/lib/mock-data";

export default function NewArrivalsPage() {
  const newArrivals = mockProducts.filter((p) => p.isNew);
  
  return (
    <ProductCollection 
      title="New Arrivals" 
      description="Discover our latest luxury pieces, crafted for the bold."
      products={newArrivals} 
    />
  );
}
