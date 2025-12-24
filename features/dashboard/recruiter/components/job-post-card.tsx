// components/job-status-card.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, CalendarDays } from "lucide-react";

export type JobStatus = {
  title: string;
  postedAgo: string;      // "5 days ago"
  status: "Active" | "Closed" | string;
  applicants: number;     // 45
  deadline: string;       // "2024-02-15"
};

type JobStatusCardProps = {
  job: JobStatus;
  onView?: () => void;
  onEdit?: () => void;
  onApplicants?: () => void;
};

export function JobPostCard({
  job,
  onView,
  onEdit,
  onApplicants,
}: JobStatusCardProps) {
  const { title, postedAgo, status, applicants, deadline } = job;

  const isActive = status.toLowerCase() === "active";

  return (
    <Card className="w-full max-w-3xl mx-auto rounded-xl shadow-sm border py-4">
      {/* top row */}
      <CardHeader className="flex flex-row items-start justify-between gap-3  px-4">
        <div className="flex-1 min-w-0">
          <CardTitle className="text-base sm:text-lg font-semibold">
            {title}
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-muted-foreground">
            Posted {postedAgo}
          </CardDescription>
        </div>

        <Badge
          variant="outline"
          className={
            "rounded-full px-3 py-1 text-xs sm:text-sm" +
            (isActive
              ? "  bg-accent"
              : "bg-blue-200 border-4")
          }
        >
          {status}
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col gap-3  px-4">
        {/* middle row: applicants + deadline */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            {applicants} applicants
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            Deadline: {deadline}
          </span>
        </div>

        {/* bottom row: actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="px-4"
            onClick={onView}
          >
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="px-3"
            onClick={onEdit}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="px-3"
            onClick={onApplicants}
          >
            Applicants
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
