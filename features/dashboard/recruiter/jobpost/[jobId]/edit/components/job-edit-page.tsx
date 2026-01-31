"use client";
import { EmptyState } from "@/components/empty-state";
import { useGetUserData } from "@/features/dashboard/api/query";
import React from "react";
import JobDetails from "../../../create/components/job-details";

export default function JobEditPage() {
    const { data, isError, isLoading, isFetching, fetchStatus } = useGetUserData();

    if (isLoading) return <></>;

    if (isError) {
        return <EmptyState title="Something went wrong!" />;
    }

    return (
        <div className="flex flex-col justify-centers items-center gap-6 px-4 py-6">
            <JobDetails companyId={data?.data?.companyId!} />
        </div>
    );
}
