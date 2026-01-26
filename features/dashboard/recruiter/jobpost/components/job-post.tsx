"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useGetAllJobsRecruiter } from "../api/query";
import JobFillter, { FilterValues } from "@/features/dashboard/candidate/job/components/job-fillter";
import { JobPreviewCard } from "@/features/dashboard/candidate/job/components/job-preview-card";
import { JobPreviewCardSkeleton } from "@/features/dashboard/candidate/job/components/job-preview-card-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function JobPost() {
    const { ref, inView } = useInView({
        delay: 100,
        rootMargin: "0px 0px 150px 0px", // Pre-fetch 150px before bottom
    });

    const [filters, setFilters] = useState<FilterValues>({});

    // useEffect(() => {
    //     console.log("Filters updated:", filters);
    // }, [filters]);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useGetAllJobsRecruiter({
        limit: 10,
        page: 1,
        filter: filters.filter,
        location: filters.location,
        // salaryMin: filters.salaryMin,
        salaryMin: filters.salaryMin ? filters.salaryMin * 1000 : undefined,
        workplace: filters.workplace,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (isLoading)
        return (
            <>
                <JobPreviewCardSkeleton />
                <JobPreviewCardSkeleton />
                <JobPreviewCardSkeleton />
                <JobPreviewCardSkeleton />
                <JobPreviewCardSkeleton />
            </>
        );

    if (isError && error.status === 404) {
        return (
            <div className="flex flex-col-reverse sm:flex-row gap-6 px-6 py-6 justify-center">
                <div className="flex flex-col gap-4">
                    <NoJobsFound />
                </div>
                <div className="flex flex-col sm:sticky sm:top-25 sm:self-start  ">
                    <JobFillter onSearch={(values) => setFilters(values)} />
                </div>
            </div>
        );
    }

    // if (error?.status !== 404) return <div className="p-4 text-red-500">Error loading jobs.</div>;

    const jobs = data?.pages.flatMap((page) => page.data) ?? [];

    return (
        <>
            <div className="flex flex-col-reverse sm:flex-row gap-6 px-6 py-6 justify-center">
                <div className="flex flex-col gap-4">
                    {jobs.map((job) => (
                        <JobPreviewCard key={job?.id} jobData={job!} />
                    ))}

                    {/* Sentinel Element */}
                    {/* <div ref={ref} style={{ height: "20px", visibility: "hidden" }} /> */}
                    {/* <div ref={ref} className="h-4 w-full bg-transparent" /> */}

                    {!isFetchingNextPage && hasNextPage && <div ref={ref} className="h-4 w-full bg-transparent" />}

                    {isFetchingNextPage && <JobPreviewCardSkeleton />}
                    {!hasNextPage && <div className="p-4 text-center text-gray-500">No more jobs.</div>}

                    {/* <JobPreviewCardSkeleton /> */}
                </div>
                <div className="flex flex-col sm:sticky sm:top-25 sm:self-start  ">
                    <JobFillter defaultValues={filters} onSearch={(values) => setFilters(values)} />
                </div>
            </div>
        </>
    );
}

export function NoJobsFound() {
    return (
        <div className="flex w-full  justify-center px-4">
            <Card className="w-full max-w-md text-center shadow-sm m-0 p-0">
                <CardContent className="flex flex-col items-center gap-4 p-5 sm:p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                        <SearchX className="h-7 w-7 text-muted-foreground" />
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-lg font-semibold sm:text-xl">No jobs found</h2>
                        <p className="text-sm text-muted-foreground">
                            We couldn’t find any jobs matching your filters. Try adjusting your search criteria. Or You have not
                            posted any jobs yet.
                        </p>
                    </div>

                    {/* <Button variant="outline" className="mt-2 w-full sm:w-auto">
                        Reset filters
                    </Button> */}
                </CardContent>
            </Card>
        </div>
    );
}
