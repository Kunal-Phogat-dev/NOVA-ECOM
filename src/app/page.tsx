import HomeClient from "./ClientPage"; // cache bust

export const dynamic = 'force-dynamic';

async function fetchHomeData() {
  // Simulate network delay to demonstrate the premium loading skeleton
  await new Promise((resolve) => setTimeout(resolve, 1500));
}

export default async function Page() {
  await fetchHomeData();
  return <HomeClient />;
}
