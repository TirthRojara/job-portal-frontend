"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";
import WorkExperienceAdd from "./work-experience-add";
import WorkExperienceCard from "./work-experience-card";
import { useAppSelector } from "@/store/index.store";
import { useGetCandidateExperience, useGetCandidateExperienceForRecruiter } from "../api/query";
import { EmptyState } from "@/components/empty-state";
import { ROOT_DIR_ALIAS } from "next/dist/lib/constants";

export default function WorkExperience({ jobId, applicantId }: { jobId?: string; applicantId?: string }) {
    const role = useAppSelector((state) => state.app.role);

    const { data: candidateExperience, error, isPending } = useGetCandidateExperience(role);
    const {
        data: candidateExperienceForRecruiter,
        error: recruiterError,
        isPending: isPendingRecruiter,
    } = useGetCandidateExperienceForRecruiter(role, jobId!, applicantId!);

    const isCandidate = role === "CANDIDATE";
    const isRecruiter = role === "RECRUITER";

    const activeData = isCandidate ? candidateExperience : isRecruiter ? candidateExperienceForRecruiter : undefined;

    const activeError = isCandidate ? error : isRecruiter ? recruiterError : undefined;

    const activeLoading = isCandidate ? isPending : isRecruiter ? isPendingRecruiter : true;

    if (!role || activeLoading) return null;

    if (activeError && activeError.status !== 404) {
        return <EmptyState title="Something went wrong!" />;
    }

    if (activeError?.status === 404 || !activeData?.data?.length) {
        return (
            <Card className="max-w-4xl w-full py-4">
                <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                    <CardTitle className=" md:text-lg">Work Experience</CardTitle>
                    <div className="flex gap-2">
                        {role === "CANDIDATE" && (
                            <WorkExperienceAdd
                                isEdit={false}
                                trigger={
                                    <Button variant={"outline"}>
                                        <Plus />
                                        Add Experience
                                    </Button>
                                }
                            />
                        )}
                    </div>
                </CardHeader>
                <CardContent className=" px-4 flex flex-col gap-4">
                    <div className="text-center py-12 text-muted-foreground rounded-md border-2 border-dashed border-border">
                        {role === "CANDIDATE" && ` No Work Experience added yet. Click "Add" to get started.`}
                        {role === "RECRUITER" && ` No Work Experience added.`}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="max-w-4xl w-full py-4">
            <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                <CardTitle className=" md:text-lg">Work Experience</CardTitle>
                <div className="flex gap-2">
                    {role === "CANDIDATE" && (
                        <WorkExperienceAdd
                            isEdit={false}
                            trigger={
                                <Button variant={"outline"}>
                                    <Plus />
                                    Add Experience
                                </Button>
                            }
                        />
                    )}
                </div>
            </CardHeader>
            <CardContent className=" px-4 flex flex-col gap-4">
                {/* {candidateExperience?.data?.map((item) => (
                    <WorkExperienceCard key={item.id} experience={item} />
                ))}

                {candidateExperienceForRecruiter?.data?.map((item) => (
                    <WorkExperienceCard key={item.id} experience={item} />
                ))} */}

                {activeData?.data?.map((item) => (
                    <WorkExperienceCard key={item.id} experience={item} />
                ))}
            </CardContent>
        </Card>
    );
}
