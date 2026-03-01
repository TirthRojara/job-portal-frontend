// components/job-status-card.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, CalendarDays } from "lucide-react";
import { JobResponseRecruiter } from "../jobpost/api/types";
import { formatDateDMY, timeAgo } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";

type JobStatusCardProps = {
    job: JobResponseRecruiter;
};

export function JobPostCard({ job }: JobStatusCardProps) {
    const isActive = job.status.toLowerCase() === "active";

    const handleViewClick = () => {
        window.open(`/dashboard/recruiter/jobpost/${job.id}`, "_blank", "noopener,noreferrer");
    };

    const handleEditClick = () => {
        window.open(`/dashboard/recruiter/jobpost/${job.id}/edit`, "_blank", "noopener,noreferrer");
    };

    const handleApplicantsClick = () => {
        window.open(`/dashboard/recruiter/jobpost/${job.id}/applicants`, "_blank", "noopener,noreferrer");
    };

    return (
        <Card className="w-full max-w-3xl mx-auto rounded-xl shadow-sm border py-4">
            {/* top row */}
            <CardHeader className="flex flex-row items-start justify-between gap-3  px-4">
                <div className="flex-1 min-w-0">
                    <CardTitle className="text-base sm:text-lg font-semibold">{job.title}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                        Posted: {timeAgo(job.postedAt)}
                    </CardDescription>
                </div>

                <Badge
                    variant="outline"
                    className={"rounded-full px-3 py-1 text-xs sm:text-sm" + (isActive ? "  bg-accent" : "bg-blue-200 border-4")}
                >
                    {job.status}
                </Badge>
            </CardHeader>

            <CardContent className="flex flex-col gap-3  px-4">
                {/* middle row: applicants + deadline */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-muted-foreground">
                    {/* <span className="inline-flex items-center gap-1.5">
                        <Users className="h-4 w-4" />
                         applicants
                    </span> */}
                    <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4" />
                        Deadline: {formatDateDMY(job.applicationDeadline)}
                    </span>
                </div>

                {/* bottom row: actions */}
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" className="px-4" onClick={handleViewClick}>
                        View
                    </Button>
                    <Button variant="ghost" size="sm" className="px-3" onClick={handleEditClick}>
                        Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="px-3" onClick={handleApplicantsClick}>
                        Applicants
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
