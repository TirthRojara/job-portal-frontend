// components/chat-card-skeleton.tsx
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ChatCardSkeleton() {
  return (
    <Card className="w-full max-w-3xl mx-auto py-4 gap-3 border-none">
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-1 px-4">
        {/* Left: avatar + text */}
        <div className="flex items-start gap-3 min-w-0">
          <Skeleton className="h-9 w-9 sm:h-10 sm:w-10 rounded-full" />

          <div className="flex-1 space-y-1">
            <Skeleton className="h-3 sm:h-4 w-32 sm:w-40" />
            <Skeleton className="h-3 w-28 sm:w-32" />
          </div>
        </div>

        {/* Right: time */}
        <Skeleton className="h-3 sm:h-4 w-16" />
      </CardHeader>

      <CardContent className="pt-1 px-4">
        <div className="space-y-2">
          <Skeleton className="h-3 sm:h-4 w-full" />
          {/* <Skeleton className="h-3 sm:h-4 w-5/6" /> */}
        </div>
      </CardContent>
    </Card>
  );
}
