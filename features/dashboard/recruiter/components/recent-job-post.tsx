import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

import { Plus } from "lucide-react";
import { JobPostCard, JobStatus } from "./job-post-card";
import { JobPostCardSkeleton } from "./job-post-card-skeleton";

const job: JobStatus = {
    title: "Senior Frontend Developer",
    postedAgo: "5 days ago",
    status: "Active",
    applicants: 45,
    deadline: "2024-02-15",
};

export default function RecentJobCard() {
    return (
        <Card className="gap-6">
            <CardHeader className=" flex flex-row items-center justify-between">
                <CardTitle className=" md:text-xl">Recent Jobs Post</CardTitle>
                {/* <Button variant={"default"}><Plus /> New Job</Button> */}
                <Button variant={"ghost"}>View All</Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 px-4">
                <JobPostCard job={job} />
                <JobPostCard job={job} />
                <JobPostCard job={job} />

                {/* <JobPostCardSkeleton />
                <JobPostCardSkeleton />
                <JobPostCardSkeleton /> */}
            </CardContent>
        </Card>
    );
}
