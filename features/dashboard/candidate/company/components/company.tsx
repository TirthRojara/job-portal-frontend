"use client";
import { QueryBoundary } from "@/components/query-boundary";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCompanyById } from "@/features/dashboard/recruiter/company/api/query";
import About from "@/features/dashboard/recruiter/company/components/about";
import Empty from "@/features/dashboard/recruiter/company/components/empty";
import Industry from "@/features/dashboard/recruiter/company/components/industry";
import LocationBox from "@/features/dashboard/recruiter/company/components/location";
import MainCard from "@/features/dashboard/recruiter/company/components/main-card";
import { AlertCircle } from "lucide-react";
import React from "react";

export default function Company({ companyId }: { companyId: number }) {
    const {
        data: companyData,
        isLoading: isCompanyLoading,
        error: companyError,
        isError: isCompanyError,
    } = useGetCompanyById(Number(companyId));

    const LoadingState = (
        <div className="flex min-h-screen flex-col items-center gap-6 px-4 py-6">
            <div className="w-full max-w-5xl space-y-4">
                <Skeleton className="h-[180px] w-full" />
                <Skeleton className="h-[280px] w-full" />
                <Skeleton className="h-[180px] w-full" />
                <Skeleton className="h-[180px] w-full" />
            </div>
        </div>
    );

    const ErrorState = (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-center">
            <AlertCircle className="h-10 w-10 text-red-500" />
            <h2 className="text-xl font-semibold">Something went wrong</h2>
            <p className="text-muted-foreground">
                {companyError?.message || "We couldn't load your company details. Please try again later."}
            </p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
    );

    return (
        <div>
            <QueryBoundary
                data={companyData}
                isLoading={isCompanyLoading}
                loadingFallback={LoadingState}
                isError={isCompanyError}
                errorFallback={ErrorState}
                error={companyError}
            >
                {(safeCompany) => (
                    <div className="flex flex-col items-center gap-6 justify-center px-4 py-6 ">
                        <MainCard companyDetails={companyData?.data!} />
                        <About description={companyData?.data?.description!} />
                        <LocationBox location={companyData?.data?.location!} />
                        <Industry companyId={companyData?.data?.id!} />
                    </div>
                )}
            </QueryBoundary>
        </div>
    );
}
