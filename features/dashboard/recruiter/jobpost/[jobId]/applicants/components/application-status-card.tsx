"use client";
import { FormSelect } from "@/components/custom-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useGetApplicantById } from "../api/query";
import { EmptyState } from "@/components/empty-state";
import { formatShortDate } from "@/lib/utils/utils";
import { ApplicationStatus, UpdateJobStatus, updateJobStatusSchema } from "../api/types";
import { useUpdateApplicationStatus } from "../api/mutation";
import { useGetUserData } from "@/features/dashboard/api/query";

export default function ApplicationStatusCard({ jobId, applicantId }: { jobId: string; applicantId: string }) {
    const { data: user, isPending: isPendingUser } = useGetUserData();
    const { data, isPending, isError } = useGetApplicantById(jobId, applicantId);

    const { mutate: updateApplicatioinStatusMutate, isPending: isPendingApplicationStatus } = useUpdateApplicationStatus();

    const form = useForm<UpdateJobStatus>({
        resolver: zodResolver(updateJobStatusSchema),
        defaultValues: {
            status:
                data?.data?.status !== ApplicationStatus.PENDING && data?.data?.status !== ApplicationStatus.VIEWED
                    ? data?.data?.status
                    : undefined,
        },
    });

    useEffect(() => {
        if (
            data?.data?.status &&
            data.data.status !== ApplicationStatus.PENDING &&
            data.data.status !== ApplicationStatus.VIEWED
        ) {
            form.reset({
                status: data.data.status,
            });
        } else {
            form.reset({
                status: undefined,
            });
        }
    }, [data, form]);

    if (isPendingUser) return <></>;
    if (isPending) return <></>;
    if (isError) return <EmptyState title="Something went wrong." />;

    function onSubmit(data: UpdateJobStatus) {
        console.log({ data });

        if (data.status) {
            updateApplicatioinStatusMutate(
                {
                    companyId: user!.data!.companyId!.toString(),
                    jobId,
                    payload: {
                        candidateProfileId: Number(applicantId),
                        status: data.status,
                    },
                },
                {
                    onSuccess: () => {
                        form.reset({
                            status: data.status,
                        });
                    },
                },
            );
        }

        form.reset({ status: data.status });
    }

    return (
        <Card className="w-full ">
            <CardHeader>
                <CardTitle>Application Status</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                        <p>Applied for:</p>
                        <p className="font-semibold">{data.data?.job.title}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Applied on:</p>
                        <p className="font-semibold">{formatShortDate(data.data?.applyDate!)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Current Status:</p>
                        <Badge>{data.data?.status}</Badge>
                    </div>
                </div>
                <Separator />
                <div>
                    <form className="flex flex-col gap-4">
                        <FormSelect
                            control={form.control}
                            form={form}
                            name="status"
                            label="Update Status"
                            placeholder="Change Status"
                            // placeholder={data?.data?.status === "PENDING" ? "Change Status" : undefined}
                            errorReserve
                        >
                            <SelectItem key={ApplicationStatus.INTOUCH} value={ApplicationStatus.INTOUCH}>
                                In-Touch
                            </SelectItem>
                            <SelectItem key={ApplicationStatus.NOTSELECT} value={ApplicationStatus.NOTSELECT}>
                                Not Select
                            </SelectItem>
                            <SelectItem key={ApplicationStatus.SELECTED} value={ApplicationStatus.SELECTED}>
                                Selected
                            </SelectItem>
                        </FormSelect>

                        {form.formState.isDirty && (
                            <Button type="submit" onClick={form.handleSubmit(onSubmit)} disabled={!form.formState.isDirty}>
                                Save
                            </Button>
                        )}
                    </form>
                </div>
            </CardContent>
        </Card>
    );
}
