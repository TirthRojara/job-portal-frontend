'use client';
import { PaginationBar } from "@/features/dashboard/candidate/components/pagination";
import { JobPreviewCard } from "@/features/dashboard/candidate/job/components/job-preview-card";
import Header from "@/features/dashboard/recruiter/jobpost/create/components/header";
import JobDetails from "@/features/dashboard/recruiter/jobpost/create/components/job-details";
import { useState } from "react";

export default function Page() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    return (
        <>
            <div className="flex flex-col justify-centers items-center gap-6 px-4 py-6">
                <JobPreviewCard />
                <JobPreviewCard />
                <JobPreviewCard />
                <JobPreviewCard />
                <JobPreviewCard />

                <PaginationBar
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={100}
                    pageSize={10}
                    onPageChange={setCurrentPage}
                />
            </div>
        </>
    );
}
