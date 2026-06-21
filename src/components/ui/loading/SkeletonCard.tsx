import { Skeleton } from "@/components/ui/loading/Skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col">
      {/* Main Image block (4:5 aspect ratio) */}
      <Skeleton className="relative aspect-[4/5] w-full mb-4" />
      
      {/* Info section */}
      <div className="flex flex-col space-y-1">
        <div className="flex justify-between items-start">
          {/* Product Name */}
          <Skeleton className="h-5 w-2/3" />
          
          {/* "NEW" Badge */}
          <Skeleton className="h-4 w-10 ml-2" />
        </div>
        
        {/* Price */}
        <Skeleton className="h-4 w-1/4 mt-1" />
        
        {/* Bottom divider line */}
        <div className="mt-4 h-[1px] w-full bg-border" />
      </div>
    </div>
  );
}
