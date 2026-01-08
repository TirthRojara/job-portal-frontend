"use client";
import ApplicationCard from "@/features/dashboard/candidate/application/components/application-card";
import ApplicationTable from "@/features/dashboard/candidate/application/components/application-table";
import { PaginationBar } from "@/features/dashboard/candidate/components/pagination";
import { useState } from "react";

export default function Page() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    return (
        <div className=" py-6 flex flex-col items-center gap-6">
            {/* <div className="flex flex-col justify-centers items-center gap-6 px-4 py-6"> */}
            <h1 className="px-4 font-semibold text-3xl my-4">Appication</h1>
            <div className="hidden md:block md:px-4">
                <ApplicationTable />
            </div>
            <div className="flex flex-col gap-2 md:hidden">
                <ApplicationCard />
                <ApplicationCard />
                <ApplicationCard />
                <ApplicationCard />
                <ApplicationCard />
            </div>
            <PaginationBar
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={100}
                pageSize={10}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
