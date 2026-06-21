import { Skeleton } from "@/components/ui/loading/Skeleton";

export function SkeletonPDP() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Left Side: Product Image Gallery Skeleton */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 overflow-x-hidden md:w-24 flex-shrink-0">
            <Skeleton className="aspect-[3/4] w-20 md:w-full flex-shrink-0" />
            <Skeleton className="aspect-[3/4] w-20 md:w-full flex-shrink-0" />
            <Skeleton className="aspect-[3/4] w-20 md:w-full flex-shrink-0 hidden md:block" />
          </div>

          {/* Main Image */}
          <Skeleton className="relative aspect-[3/4] md:aspect-[4/5] flex-1" />
        </div>

        {/* Right Side: Product Info Skeleton */}
        <div className="flex flex-col justify-center">
          <div className="mb-8 space-y-4">
            <Skeleton className="h-10 md:h-14 w-3/4" />
            <Skeleton className="h-6 md:h-8 w-1/4" />
          </div>

          <div className="space-y-8 mb-10">
            {/* Colors */}
            <div>
              <Skeleton className="h-4 w-16 mb-3" />
              <div className="flex space-x-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="w-10 h-10 rounded-full" />
              </div>
            </div>

            {/* Sizes */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-3 w-20" />
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>

            {/* Description */}
            <div>
              <Skeleton className="h-4 w-24 mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Skeleton className="h-14 flex-1" />
            <Skeleton className="h-14 w-14" />
          </div>
        </div>
      </div>
    </div>
  );
}
