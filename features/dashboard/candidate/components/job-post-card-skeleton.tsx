// components/job-post-card-skeleton.tsx
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function JobPostCardSkeleton() {
  return (
    <Card className="w-full max-w-3xl mx-auto rounded-xl shadow-sm gap-2 py-4">
      {/* top section */}
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-2 px-4">
        <div className="flex-1 min-w-0 space-y-2">
          {/* title */}
          <Skeleton className="h-4 w-40 sm:w-56" />
          {/* company */}
          <Skeleton className="h-3 w-32 sm:w-40" />
        </div>

        {/* right column: views + date */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 pt-0 px-4">
        {/* location + salary */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-28" />
        </div>

        {/* badges + buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <Skeleton className="h-7 w-20 rounded-full" />
            <Skeleton className="h-7 w-20 rounded-full" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-20 rounded-full" />
            <Skeleton className="h-9 w-24 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
