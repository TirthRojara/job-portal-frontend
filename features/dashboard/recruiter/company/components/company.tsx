"use client";
import React from "react";
import { useGetCompanyIndustry, useGetMyComanyDetails } from "../api/query";
import { Button } from "@/components/ui/button";
import { AlertCircle, PencilLine } from "lucide-react";
import MainCard from "./main-card";
import About from "./about";
import Industry from "./industry";
import LocationBox from "./location";
import { StyledJsxStyleRegistry } from "styled-jsx";
import { Skeleton } from "@/components/ui/skeleton";
import Empty from "./empty";
import { useAppDispatch } from "@/store/index.store";
import { appActions } from "@/store/app.slice";
import { QueryBoundary } from "@/components/query-boundary";
import { useRouter } from "next/navigation";


export default function Company() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {
        data: companyData,
        isLoading: isCompanyLoading,
        error: companyError,
        isError: isCompanyError,
    } = useGetMyComanyDetails();

    const company = companyData?.data?.[0];

    if (companyData) {
        dispatch(appActions.setCompanyId(companyData?.data?.[0].id));
    }

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
    
    const isCriticalError = companyError?.response?.status !== 404 && companyError?.response?.status !== 401 && isCompanyError;
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

    const EmptyState = (
        <div className="flex justify-center h-[calc(100vh_-_74px)] items-center   gap-6 px-4 py-6 ">
            <div className="flex w-full">
                <Empty />
            </div>
        </div>
    );

    return (
        <>
            <QueryBoundary
                data={company}
                isLoading={isCompanyLoading}
                loadingFallback={LoadingState}
                isError={isCriticalError}
                errorFallback={ErrorState}
                error={companyError}
                isEmpty={!company && !isCompanyLoading}
                emptyFallback={EmptyState}
            >
                {(safeCompany) => (
                    <div className="flex min-h-screen flex-col items-center gap-6 px-4 py-6 ">
                        <div className="flex w-full max-w-5xl justify-between">
                            <div>
                                <h2 className="font-semibold text-2xl sm:text-3xl">Company Profile</h2>
                                <p className="text-muted-foreground">Manage your company information and branding</p>
                            </div>
                            <div>
                                <Button onClick={() => router.push('/dashboard/recruiter/company/edit')}>
                                    <PencilLine /> Edit
                                </Button>
                            </div>
                        </div>
                        <div className="w-full flex flex-col items-center gap-6 justify-center">
                            <MainCard companyDetails={company!} />
                            <About description={company!.description} />
                            <LocationBox location={company!.location} />
                            <Industry companyId={company!.id} />
                        </div>
                    </div>
                )}
            </QueryBoundary>
        </>
    );
}
