import React, { useEffect, useState } from "react";
import { JobPreviewCard } from "../../job/components/job-preview-card";
import { PaginationBar } from "../../components/pagination";
import { useGetSavedJobForCandidate } from "../api/query";
import { SavedJobResponse } from "../api/types";
import { JobResponseCandidate } from "../../job/api/types";
import { JobPreviewCardSkeleton } from "../../job/components/job-preview-card-skeleton";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SavedJobPage() {
    // const [currentPage, setCurrentPage] = useState(1);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const pageParam = searchParams.get("page");
    const currentPage = pageParam ? Number(pageParam) : 1;
    const limit = 5;

    const { data, isLoading, isError, error } = useGetSavedJobForCandidate(currentPage, limit);

    const savedJobs = data?.data;
    const totalPages = data?.pagination.totalPages || 1;
    const totalItems = data?.pagination.totalCount || 0;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());

        // Pushes new URL: /dashboard/candidate/savedjob?page=2
        router.push(`${pathname}?${params.toString()}`);
    };

    if (isLoading) {
        return (
            <>
                <JobPreviewCardSkeleton />
                <JobPreviewCardSkeleton />
                <JobPreviewCardSkeleton />
                <JobPreviewCardSkeleton />
                <JobPreviewCardSkeleton />
            </>
        );
    }

    if (isError) {
        return (
            <EmptyState
                title="Something went wrong!"
                description={error?.response?.data.message || "Please try again."}
                action={
                    <>
                        <Button onClick={() => window.location.reload()}>Refresh</Button>
                    </>
                }
            />
        );
    }

    return (
        <>
            <div className="flex flex-col justify-centers items-center gap-6 px-4 py-6">
                {/* <JobPreviewCard jobData={jobData} /> */}

                {savedJobs?.length! > 0 ? (
                    savedJobs?.map((job: JobResponseCandidate) => <JobPreviewCard key={job.id} jobData={job} />)
                ) : (
                    <div className="text-gray-500">No saved jobs.</div>
                )}

                {savedJobs?.length! > 0 && (
                    <PaginationBar
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={totalItems}
                        pageSize={limit}
                        // onPageChange={setCurrentPage}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </>
    );
}
