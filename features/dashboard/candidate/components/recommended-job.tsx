import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { JobPostCard } from "../../components/job-post-card";

const job = {
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salaryRange: "$120k - $150k",
    postedAgo: "2 days ago",
    views: 1234,
    jobType: "Full-time",
};

export default function RecommendedJobCard
() {
    return (
        <Card className="gap-6">
            <CardHeader className=" flex flex-row items-center justify-between">
                <CardTitle className=" md:text-xl">Recommended Jobs</CardTitle>
                <Button variant={"ghost"}>View All</Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 px-4">
                {/* <CardContent className="flex flex-col gap-4 px-0"> */}
                <JobPostCard job={job} />
                <JobPostCard job={job} />
                <JobPostCard job={job} />
            </CardContent>
        </Card>
    );
}
