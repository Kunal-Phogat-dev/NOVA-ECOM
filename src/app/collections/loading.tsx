import { Skeleton } from "@/components/ui/loading/Skeleton";

export default function CollectionsLoading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      <div className="mb-12 md:mb-16 text-center max-w-2xl mx-auto flex flex-col items-center">
        <Skeleton className="h-12 w-64 mb-4" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-y border-border py-4 gap-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-48" />
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Skeleton */}
        <div className="hidden lg:block w-64 flex-shrink-0 space-y-10">
          {[1, 2, 3].map(i => (
            <div key={`sidebar-skel-${i}`}>
              <Skeleton className="h-4 w-24 mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>
          ))}
        </div>

        {/* Grid Skeleton */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={`grid-skel-${i}`} className="flex flex-col">
              <Skeleton className="aspect-[4/5] w-full mb-4" />
              <div className="flex justify-between items-start mb-2">
                <div>
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
              <Skeleton className="h-[1px] w-full mt-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
