"use client";
import React from "react";
import Header from "./header";
import JobDetailsTop from "./job-details-top";
import JobDescription from "./job-description";
import { useGetJobById } from "../api/query";
import { is } from "date-fns/locale";
import { QueryBoundary } from "@/components/query-boundary";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";

export default function JobpostIdPage({ jobId }: { jobId: string }) {
    const { data: jobData, isError: isJobError, error: jobError, isLoading: isJobLoading } = useGetJobById(jobId);

    const ErrorState = (
        <EmptyState
            title="Something went wrong"
            description={jobError?.response?.data.message || "Please try again."}
            action={
                <>
                    <Button onClick={() => window.location.reload()}>Refresh</Button>
                </>
            }
        />
    );

    return (
        <>
            <QueryBoundary
                data={jobData}
                error={jobError}
                isLoading={isJobLoading}
                loadingFallback={LoadingState}
                isEmpty={jobError?.status === 404}
                emptyFallback={EmptyStateContent}
                isError={isJobError && jobError?.status !== 404 && jobError?.status !== 401}
                errorFallback={ErrorState}
            >
                {(safeData) => (
                    <div className="flex flex-col justify-centers items-center gap-6 px-4 py-6">
                        <Header jobId={jobId} />
                        <JobDetailsTop jobData={jobData?.data!} />
                        <JobDescription jobData={jobData?.data!} />
                    </div>
                )}
            </QueryBoundary>
        </>
    );
}

const EmptyStateContent = <EmptyState title="404 Not Found" description="" />;

const LoadingState = (
    <div className="space-y-4 p-4">
        {/* --- Top Card: Header Info --- */}
        <Card className="p-6">
            <div className="flex flex-col gap-6">
                {/* Top Row: Logo, Main Info, Right Meta */}
                <div className="flex justify-between items-start">
                    <div className="flex gap-4 w-full">
                        {/* Company Logo */}
                        <Skeleton className="h-14 w-14 rounded-lg shrink-0" />

                        <div className="space-y-2 w-full max-w-2xl">
                            {/* Job Title */}
                            <Skeleton className="h-7 w-1/3" />
                            {/* Company Name */}
                            <Skeleton className="h-4 w-1/4" />

                            {/* Metadata Row (Location, Type, Salary, Badge) */}
                            <div className="flex flex-wrap items-center gap-4 pt-1">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-6 w-16 rounded-full" /> {/* Fresher Badge */}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Date & Views */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                        <Skeleton className="h-3 w-16" /> {/* "2 days ago" */}
                        <div className="flex items-center gap-2 mt-1">
                            <Skeleton className="h-4 w-4 rounded-full" /> {/* Icon */}
                            <Skeleton className="h-3 w-10" /> {/* "Active" */}
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Required Skills */}
                <div className="space-y-3 pt-2">
                    <Skeleton className="h-5 w-32" /> {/* "Required skills" label */}
                    <div className="flex gap-3 flex-wrap">
                        {/* Simulate Skill Badges */}
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Skeleton key={i} className="h-8 w-24 rounded-md" />
                        ))}
                    </div>
                </div>
            </div>
        </Card>

        {/* --- Bottom Card: Description --- */}
        <Card className="p-6">
            <div className="space-y-8">
                {/* Header */}
                <Skeleton className="h-7 w-48" /> {/* "Job Description" */}
                {/* Description Body Paragraph 1 */}
                <div className="space-y-2.5">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[95%]" />
                    <Skeleton className="h-4 w-[90%]" />
                </div>
                {/* List Items / Bullet Points */}
                <div className="space-y-3 pl-2">
                    <Skeleton className="h-4 w-[60%]" />
                    <Skeleton className="h-4 w-[50%]" />
                    <Skeleton className="h-4 w-[55%]" />
                </div>
                {/* Skills Section within Description */}
                <div className="space-y-3">
                    <Skeleton className="h-5 w-24" /> {/* "Skills" Header */}
                    <div className="flex gap-4">
                        <Skeleton className="h-4 w-full max-w-md" />
                    </div>
                </div>
                {/* Footer Text */}
                <div className="space-y-2.5">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[92%]" />
                    <Skeleton className="h-4 w-[80%]" />
                </div>
            </div>
        </Card>
        <Card className="p-6">
            <div className="space-y-8">
                {/* Header */}
                <Skeleton className="h-7 w-48" /> {/* "Job Description" */}
                {/* Description Body Paragraph 1 */}
                <div className="space-y-2.5">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[95%]" />
                    <Skeleton className="h-4 w-[90%]" />
                </div>
                {/* List Items / Bullet Points */}
                <div className="space-y-3 pl-2">
                    <Skeleton className="h-4 w-[60%]" />
                    <Skeleton className="h-4 w-[50%]" />
                    <Skeleton className="h-4 w-[55%]" />
                </div>
                {/* Skills Section within Description */}
                <div className="space-y-3">
                    <Skeleton className="h-5 w-24" /> {/* "Skills" Header */}
                    <div className="flex gap-4">
                        <Skeleton className="h-4 w-full max-w-md" />
                    </div>
                </div>
                {/* Footer Text */}
                <div className="space-y-2.5">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[92%]" />
                    <Skeleton className="h-4 w-[80%]" />
                </div>
            </div>
        </Card>
    </div>
);
