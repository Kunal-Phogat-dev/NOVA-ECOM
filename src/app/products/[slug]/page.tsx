import ProductDetailClient from "./ClientPage";

export const dynamic = 'force-dynamic';

async function fetchProductData() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
}

export default async function Page() {
  await fetchProductData();
  return <ProductDetailClient />;
}
