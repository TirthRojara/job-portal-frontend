// components/job-card.tsx
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, CircleDollarSign, Eye } from "lucide-react";

export type Job = {
    title: string;
    company: string;
    location: string;
    salaryRange: string;
    postedAgo: string; // "1 day ago"
    views: number; // 1234
    jobType: string; // "Full-time"
};

type JobCardProps = {
    job: Job;
    onView?: () => void;
    onQuickApply?: () => void;
};

export function JobPostCard({ job, onView, onQuickApply }: JobCardProps) {
    const { title, company, location, salaryRange, postedAgo, views, jobType } =
        job;

    return (
        // <Card className="w-full max-w-3xl mx-auto rounded-xl border border-emerald-200 shadow-sm gap-2 py-4">
        <Card className="w-full max-w-3xl mx-auto rounded-xl shadow-sm gap-2 py-4 hover:border-blue-300">
            {/* top section */}
            <CardHeader className="flex flex-row items-start justify-between gap-3 pb-2 px-4">
                <div className="flex-1 min-w-0">
                    <CardTitle className="text-base text-md sm:text-lg font-semibold">
                        {title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        {company}
                    </CardDescription>
                </div>

                {/* right column: date + views */}
                <div className="flex flex-col items-end gap-1 text-xs sm:text-sm text-muted-foreground shrink-0">
                    <span className="inline-flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        {views.toLocaleString()} Views
                    </span>
                    <span>{postedAgo}</span>
                </div>
            </CardHeader>

            {/* <CardContent className="flex flex-col gap-4 pt-0 pb-4 sm:pb-5"> */}
            <CardContent className="flex flex-col gap-3 pt-0 px-4">
                {/* location + salary */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <CircleDollarSign className="h-4 w-4" />
                        {salaryRange}
                    </span>
                </div>

                {/* badge + buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className=" flex gap-1">
                        <Badge
                            variant="secondary"
                            className=" px-3 py-1 bg-accent  text-xs sm:text-sm"
                        >
                            {jobType}
                        </Badge>
                        <Badge
                            variant="secondary"
                            className=" px-3 py-1 bg-accent  text-xs sm:text-sm"
                        >
                            {jobType}
                        </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            className=" px-4 text-sm"
                            onClick={onView}
                        >
                            View
                        </Button>
                        <Button
                            //   className="rounded-full px-4 text-sm bg-emerald-600 hover:bg-emerald-700 text-white"
                            variant={"default"}
                            onClick={onQuickApply}
                        >
                            Quick Apply
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
