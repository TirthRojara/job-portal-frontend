import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function JobPreviewCardSkeleton() {
  return (
    <Card className="relative flex w-full max-w-4xl flex-col gap-6 p-6 sm:flex-row sm:items-start">
      {/* Mobile Date Skeleton (Absolute Positioned) */}
      <Skeleton className="absolute top-6 right-6 h-3 w-16 sm:hidden" />

      {/* 1. Logo Section Skeleton */}
      <div className="shrink-0">
        <Skeleton className="h-12 w-12 rounded-lg" />
      </div>

      {/* 2. Main Content Section Skeleton */}
      <div className="flex flex-1 flex-col gap-3">
        {/* Header: Title & Company */}
        <div className="space-y-2">
          {/* Title */}
          <Skeleton className="h-6 w-3/4 sm:w-1/2" />
          {/* Company */}
          <Skeleton className="h-4 w-1/3" />
        </div>

        {/* Meta Row: Location, Salary, etc. */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-28" />
        </div>

        {/* Description (2 lines) */}
        <div className="space-y-2 pt-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>

      {/* 3. Actions Section Skeleton */}
      <div className="flex shrink-0 flex-row items-center justify-between gap-3 sm:flex-col sm:items-end sm:justify-start">
        {/* Desktop Date Skeleton */}
        <Skeleton className="hidden h-3 w-16 sm:block" />

        <div className="flex w-full flex-row gap-3 sm:w-auto sm:flex-col-reverse sm:items-end">
          {/* Apply Button Skeleton */}
          <Skeleton className="h-10 w-full rounded-md sm:w-32" />
          
          {/* Bookmark Button Skeleton */}
          <Skeleton className="h-10 w-10 rounded-md sm:mt-auto" />
        </div>
      </div>
    </Card>
  );
}