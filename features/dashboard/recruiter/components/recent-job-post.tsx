import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

import { Plus } from "lucide-react";
import { JobPostCard } from "./job-post-card";
import { JobPostCardSkeleton } from "./job-post-card-skeleton";
import { useRouter } from "next/navigation";
import { useGetAllJobsRecruiter } from "../jobpost/api/query";

export default function RecentJobCard() {
    const router = useRouter();

    const { data, isLoading, isError, error } = useGetAllJobsRecruiter({
        limit: 10,
        page: 1,
    });

    if (isLoading) {
        return (
            <Card className="gap-6">
                <CardHeader className=" flex flex-row items-center justify-between">
                    <CardTitle className=" md:text-xl">Recent Jobs Post</CardTitle>
                    <Button variant={"ghost"} onClick={() => router.push("/dashboard/recruiter/jobpost")}>
                        View All
                    </Button>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 px-4">
                    <JobPostCardSkeleton />
                    <JobPostCardSkeleton />
                    <JobPostCardSkeleton />
                </CardContent>
            </Card>
        );
    }

    if (isError && error.status === 404) {
        return (
            <Card className="gap-6">
                <CardHeader className=" flex flex-row items-center justify-between">
                    <CardTitle className=" md:text-xl">Recent Jobs Post</CardTitle>
                    <Button variant={"ghost"} onClick={() => router.push("/dashboard/recruiter/jobpost")}>
                        View All
                    </Button>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 px-4">No Job Post Yet.</CardContent>
            </Card>
        );
    }

    const jobs = data?.pages.flatMap((page) => page.data) ?? [];

    return (
        <Card className="gap-6">
            <CardHeader className=" flex flex-row items-center justify-between">
                <CardTitle className=" md:text-xl">Recent Jobs Post</CardTitle>
                {/* <Button variant={"default"}><Plus /> New Job</Button> */}
                <Button variant={"ghost"} onClick={() => router.push("/dashboard/recruiter/jobpost")}>
                    View All
                </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 px-4">
                {jobs.slice(0, 3).map((job) => (
                    <JobPostCard key={job?.id} job={job!} />
                ))}
            </CardContent>
        </Card>
    );
}
