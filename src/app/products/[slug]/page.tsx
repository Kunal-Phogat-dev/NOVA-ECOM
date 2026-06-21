import ProductDetailClient from "./ClientPage";

async function fetchProductData() {
  // Simulate network delay to demonstrate the premium PDP loading skeleton
  await new Promise((resolve) => setTimeout(resolve, 1500));
}

export default async function Page() {
  await fetchProductData();
  return <ProductDetailClient />;
}
