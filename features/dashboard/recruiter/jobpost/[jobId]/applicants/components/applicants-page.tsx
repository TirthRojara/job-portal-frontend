"use client";
import ApplicantsCard from "@/app/dashboard/(recruiter)/recruiter/jobpost/[jobId]/applicants/components/appicants-card";
import React, { useEffect } from "react";
import { useGetApplicants } from "../api/query";
import { useParams, useRouter } from "next/navigation";
import { useGetUserData } from "@/features/dashboard/api/query";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/components/ui/spinner";
import { JobPreviewCardSkeleton } from "@/features/dashboard/candidate/job/components/job-preview-card-skeleton";

export default function ApplicantsPage() {
    const params = useParams();

    const jobId = params.jobId;

    const { ref, inView } = useInView({
        delay: 100,
        rootMargin: "0px 0px 150px 0px", // Pre-fetch 150px before bottom
    });

    const { data: user, isPending, isError: isGetUserError, error: getUserError } = useGetUserData();

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useGetApplicants({
        limit: 10,
        companyId: user?.data?.companyId!,
        jobId: Number(jobId),
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if(isPending) return <></>

    if (isLoading) {
        return (
            <div className="flex flex-col p-4 gap-5">
                <JobPreviewCardSkeleton />
                <JobPreviewCardSkeleton />
                <JobPreviewCardSkeleton />
                <JobPreviewCardSkeleton />
                <JobPreviewCardSkeleton />
            </div>
        );
    }

    if (isError && error.status === 404) {
        return (
            <div className="flex flex-col-reverse sm:flex-row gap-6 px-6 py-6 justify-center">
                <div className="flex flex-col gap-4">
                    <p>No Applicants yet.</p>
                </div>
            </div>
        );
    }

    const applicants = data?.pages.flatMap((page) => page.data) ?? [];

    return (
        <div className="flex flex-col justify-centers items-center gap-6 px-4 py-6">
            {applicants.map((applicant) => (
                <ApplicantsCard key={applicant?.id} applicant={applicant!} />
            ))}

            {/* Sentinel Element */}
            {!isFetchingNextPage && hasNextPage && <div ref={ref} className="h-4 w-full bg-transparent" />}

            {isFetchingNextPage && <Spinner />}
            {!hasNextPage && !isLoading && <div className="p-4 text-center text-gray-500">No more applicants.</div>}
        </div>
    );
}
