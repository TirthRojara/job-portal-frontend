"use client";
import React from "react";
import JobDetails from "./job-details";
import { useGetUserData } from "@/features/dashboard/api/query";
import { EmptyState } from "@/components/empty-state";
import { tr } from "date-fns/locale";

export default function JobCreatePage() {
    const { data, isError, isLoading, isFetching, fetchStatus } = useGetUserData();

    if (isLoading) return <></>;

    if (isError) {
        return <EmptyState title="Something went wrong!" />;
    }

    // console.log({ data, isFetching, fetchStatus });

    return (
        <div className="flex flex-col justify-centers items-center gap-6 px-4 py-6">
            <JobDetails companyId={data?.data?.companyId!} />
        </div>
    );
}
