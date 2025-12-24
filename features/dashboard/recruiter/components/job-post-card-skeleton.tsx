// components/job-status-card-skeleton.tsx
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function JobPostCardSkeleton() {
  return (
    <Card className="w-full max-w-3xl mx-auto rounded-xl shadow-sm border py-4">
      {/* top row */}
      <CardHeader className="flex flex-row items-start justify-between gap-3 px-4">
        <div className="flex-1 min-w-0 space-y-2">
          {/* title */}
          <Skeleton className="h-4 w-40 sm:w-56" />
          {/* posted ago */}
          <Skeleton className="h-3 w-28 sm:w-32" />
        </div>

        {/* status badge */}
        <Skeleton className="h-6 w-16 sm:w-20 rounded-full" />
      </CardHeader>

      <CardContent className="flex flex-col gap-3 px-4">
        {/* middle row: applicants + deadline */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-32" />
        </div>

        {/* bottom row: actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-8 w-16 rounded-md" />
          <Skeleton className="h-8 w-14 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}
