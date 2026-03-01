import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { JobPostCard } from "./job-post-card";
import { JobPostCardSkeleton } from "./job-post-card-skeleton";
import { useGetAllJobsCandidate } from "../job/api/query";
import { useRouter } from "next/navigation";

const job = {
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salaryRange: "$120k - $150k",
    postedAgo: "2 days ago",
    views: 1234,
    jobType: "Full-time",
};

export default function RecommendedJobCard() {
    const router = useRouter();

    const { data, isLoading, isError, error } = useGetAllJobsCandidate({
        limit: 10,
        page: 1,
    });

    if (isLoading) {
        return (
            <Card className="gap-6">
                <CardHeader className=" flex flex-row items-center justify-between">
                    <CardTitle className=" md:text-xl">Recommended Jobs</CardTitle>
                    <Button variant={"ghost"}>View All</Button>
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
                    <CardTitle className=" md:text-xl">Recommended Jobs</CardTitle>
                    <Button variant={"ghost"}>View All</Button>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 px-4">
                    {/* <CardContent className="flex flex-col gap-4 px-0"> */}
                    No Recommended Jobs Found.
                </CardContent>
            </Card>
        );
    }

    const jobs = data?.pages.flatMap((page) => page.data) ?? [];

    return (
        <Card className="gap-6">
            <CardHeader className=" flex flex-row items-center justify-between">
                <CardTitle className=" md:text-xl">Recommended Jobs</CardTitle>
                <Button onClick={() => router.push("/dashboard/candidate/job")} variant={"ghost"}>
                    View All
                </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 px-4">
                {/* <CardContent className="flex flex-col gap-4 px-0"> */}

                {jobs.slice(0, 3).map((job) => (
                    <JobPostCard key={job?.id} job={job!} />
                ))}
            </CardContent>
        </Card>
    );
}
