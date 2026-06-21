import { SkeletonCard } from "@/components/ui/loading/SkeletonCard";
import { Skeleton } from "@/components/ui/loading/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section Skeleton */}
      <section className="relative h-[85vh] w-full bg-muted flex items-center justify-center overflow-hidden">
        <Skeleton className="absolute inset-0 w-full h-full" />
      </section>

      {/* Product Grid Skeleton */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <Skeleton className="h-10 w-48 mb-4" />
              <Skeleton className="h-5 w-64" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </section>
    </div>
  );
}
