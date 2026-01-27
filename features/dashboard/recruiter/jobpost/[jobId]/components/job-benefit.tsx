import { Badge } from "@/components/ui/badge";
import CardHeaderWrapper from "@/features/dashboard/components/card-header-wrapper";
import React from "react";
import { useGetJobIdBenefit } from "../api/query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { tr } from "date-fns/locale";

export default function JobBenefit({ jobId }: { jobId: number }) {
    const { data, isError, isLoading } = useGetJobIdBenefit(jobId);

    if (isLoading) {
        return (
            <Card className="w-full max-w-4xl">
                <CardHeader className="pb-3">
                    <Skeleton className="h-6 w-32" /> {/* "Benefits & Perks" title */}
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2 flex-wrap">
                        <Skeleton className="h-8 w-24 rounded-full" />
                        <Skeleton className="h-8 w-28 rounded-full" />
                        <Skeleton className="h-8 w-20 rounded-full" />
                        <Skeleton className="h-8 w-26 rounded-full" />
                        <Skeleton className="h-8 w-26 rounded-full" />
                    </div>
                </CardContent>
            </Card>
        );
    }
    if (isError) return <p className="text-destructive">Error</p>;
    if (data?.data?.benefitNames.length === 0) return <></>;

    return (
        <CardHeaderWrapper title="Benefits & Perks" width="max-w-4xl" isButton={false}>
            <div className="flex gap-2 flex-wrap">
                {data?.data?.benefitNames.map((benefit) => (
                    <Badge key={benefit} className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm group cursor-pointer">
                        {benefit}
                        {/* <X className="ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" /> */}
                    </Badge>
                ))}
            </div>
        </CardHeaderWrapper>
    );
}

const LoadingState = (
    <Card>
        <Skeleton className="h-14 w-14" />
    </Card>
);
