"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";
import EducationDetailsAdd from "./education-details-add";
import { EducationItem } from "./education-details-card";
import { useAppSelector } from "@/store/index.store";
import { useGetCandidateEducation, useGetCandidateEducationForRecruiter } from "../api/query";
import { EmptyState } from "@/components/empty-state";

export default function EducationDetails({ jobId, applicantId }: { jobId?: string; applicantId?: string }) {
    const role = useAppSelector((state) => state.app.role);

    const { data: candidateEducation, isPending, error } = useGetCandidateEducation(role);
    const {
        data: EducatoinForRecruiter,
        isPending: isPendingForRecruiter,
        error: recruiterError,
    } = useGetCandidateEducationForRecruiter(role, jobId!, applicantId!);

    const isCandidate = role === "CANDIDATE";
    const isRecruiter = role === "RECRUITER";

    const activeData = isCandidate ? candidateEducation : isRecruiter ? EducatoinForRecruiter : undefined;

    const activeError = isCandidate ? error : isRecruiter ? recruiterError : undefined;

    const activeLoading = isCandidate ? isPending : isRecruiter ? isPendingForRecruiter : true;

    if (!role || activeLoading) return null;

    if (activeError?.status === 404) {
        return (
            <Card className="max-w-4xl w-full py-4">
                <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                    <CardTitle className=" md:text-lg">Education</CardTitle>
                    <div className="flex gap-2">
                        {role === "CANDIDATE" && (
                            <EducationDetailsAdd
                                isEdit={false}
                                trigger={
                                    <Button variant={"outline"}>
                                        <Plus />
                                        Add Education
                                    </Button>
                                }
                            />
                        )}
                    </div>
                </CardHeader>
                <CardContent className=" px-4 flex flex-col gap-4">
                    <div className="text-center py-12 text-muted-foreground rounded-md border-2 border-dashed border-border">
                       {role === 'CANDIDATE' && ` No Education added yet. Click "Add" to get started.`}
                       {role === 'RECRUITER' && ` No Education added.`}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (activeError && activeError.status !== 404) {
        return <EmptyState title="Something went wrong!" />;
    }

    // if (!activeData?.data?.length) {
    //     return <div>No experience found</div>;
    // }

    return (
        <Card className="max-w-4xl w-full py-4">
            <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                <CardTitle className=" md:text-lg">Education</CardTitle>
                <div className="flex gap-2">
                    {role === "CANDIDATE" && (
                        <EducationDetailsAdd
                            isEdit={false}
                            trigger={
                                <Button variant={"outline"}>
                                    <Plus />
                                    Add Education
                                </Button>
                            }
                        />
                    )}
                </div>
            </CardHeader>
            <CardContent className=" px-4 flex flex-col gap-4">
                {activeData?.data?.map((item) => (
                    <EducationItem key={item.id} candidateEducation={item} />
                ))}
            </CardContent>
        </Card>
    );
}
