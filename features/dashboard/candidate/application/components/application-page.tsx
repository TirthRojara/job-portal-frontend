"use client";
import React, { useEffect, useState } from "react";
import ApplicationTable from "./application-table";
import ApplicationCard from "./application-card";
import { PaginationBar } from "../../components/pagination";
import { useGetAllApplication } from "../api/query";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";
import { ApplicationResponse } from "../api/types";

export default function ApplicationPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 8;

    const { data, isLoading, isError, error } = useGetAllApplication(currentPage, limit);

    const totalPages = data?.pagination.totalPages || 1;
    const totalItems = data?.pagination.totalCount || 0;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    if (isLoading) return <div>Loading .....</div>;
    if (error?.status === 404)
        return <div className="text-gray-500 text-lg flex justify-center relative top-5">You didn't apply to any jobs.</div>;
    if (isError && error.status !== 404) {
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
        <div className=" py-6 flex flex-col items-center gap-6">
            {/* <div className="flex flex-col justify-centers items-center gap-6 px-4 py-6"> */}
            <h1 className="px-4 font-semibold text-3xl my-4">Application</h1>

            {/* DESKTOP VIEW  */}
            <div className="hidden md:block md:px-4">
                <ApplicationTable tableData={data?.data!} />
            </div>

            {/* MOBILE VIEW  */}
            <div className="flex flex-col gap-2 md:hidden">
                {/* <ApplicationCard />
                <ApplicationCard />
                <ApplicationCard />
                <ApplicationCard />
                <ApplicationCard /> */}
                {data?.data?.map((tableData: ApplicationResponse) => (
                    <ApplicationCard key={tableData.id} tableData={tableData} />
                ))}
            </div>
            <PaginationBar
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={limit}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
