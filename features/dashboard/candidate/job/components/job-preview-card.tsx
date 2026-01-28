"use client";

import { MapPin, Building2, Banknote, Clock, Bookmark, Send, Eye, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility
import { JobResponseRecruiter } from "@/features/dashboard/recruiter/jobpost/api/types";
import { useAppSelector } from "@/store/index.store";
import { formatSalary, timeAgo } from "@/lib/utils/utils";
import { useApplyJob, useToggleSaveJob } from "../api/mutate";
import { JobResponseCandidate } from "../api/types";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { never } from "zod";
import ViewCount from "@/features/dashboard/recruiter/jobpost/[jobId]/components/view-count";

const isBtnHide = true;

export function JobPreviewCard({ jobData }: { jobData: JobResponseCandidate | JobResponseRecruiter }) {
    const role = useAppSelector((state) => state.app.role);

    const isDeleted = "isDeleted" in jobData ? jobData.isDeleted : undefined;

    const companyName =
        "company" in jobData
            ? jobData.company.name //  Recruiter
            : jobData.companyName; //  Candidate

    const jobRole =
        "jobRole" in jobData
            ? jobData.jobRole.name //  Recruiter
            : jobData.jobRoleName; //  Candidate

    const initialIsAppliedByUser = "isAppliedByUser" in jobData ? jobData.isAppliedByUser : false;
    const [isAppliedByUser, setIsAppliedByUser] = useState(initialIsAppliedByUser);

    const initialSavedStatus = "isSaved" in jobData ? jobData.isSaved : false;
    const [isSaved, setIsSaved] = useState(initialSavedStatus);

    const { mutate: applyJobMutate, isPending: isApplyJobLoading } = useApplyJob();
    const { mutate: toggleSaveJobMutate, isPending: isToggleSaveJobLoading } = useToggleSaveJob();

    useEffect(() => {
        if ("isAppliedByUser" in jobData) {
            setIsAppliedByUser(jobData.isAppliedByUser);
        }
    }, [jobData]);

    useEffect(() => {
        if ("isSaved" in jobData) {
            setIsSaved(jobData.isSaved);
        }
    }, [jobData]);

    const handleCardClick = () => {
        if (role === "CANDIDATE") {
            window.open(`/dashboard/candidate/job/${jobData.id}`, "_blank", "noopener,noreferrer");
        } else {
            window.open(`/dashboard/recruiter/jobpost/${jobData.id}`, "_blank", "noopener,noreferrer");
        }
    };

    const handleApplyJob = () => {
        if (role === "CANDIDATE") {
            applyJobMutate(
                { jobId: jobData.id },
                {
                    onError: () => {
                        setIsAppliedByUser(false);
                    },
                    onSuccess: () => {
                        setIsAppliedByUser(true);
                    },
                },
            );
        }
    };

    const handleSaveJob = () => {
        if (role === "CANDIDATE") {
            setIsSaved((prev) => !prev);

            toggleSaveJobMutate(
                { jobId: jobData.id },
                {
                    onError: () => {
                        setIsSaved((prev) => !prev);
                    },
                },
            );
        }
    };

    return (
        <Card className=" group relative flex w-full max-w-4xl flex-col gap-6 p-6 transition-all hover:shadow-xl sm:flex-row sm:items-start">
            <span className=" flex flex-col items-end absolute top-6 right-6 text-xs text-muted-foreground sm:hidden">
                {/* {postedAt} */}
                <p>{timeAgo(jobData.postedAt)}</p>
                <div className="flex justify-end items-center gap-1.5 my-1.5">
                    <ViewCount jobId={jobData.id} />
                </div>
                {role !== "CANDIDATE" && !isDeleted && <p>{jobData.status}</p>}
                {role === "CANDIDATE" && isAppliedByUser && <p>Applied</p>}
                {role === "RECRUITER" && isDeleted && <p className=" text-destructive">DELETED</p>}
            </span>
            {/* 1. Logo Section */}
            <div className="shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 dark:text-black">
                    {/* Replace this with an <img /> if you have a real logo */}
                    <Building2 className="h-6 w-6" />
                </div>
            </div>

            {/* 2. Main Content Section */}
            <div className="flex flex-1 flex-col gap-3">
                {/* Header: Title & Company */}
                <div>
                    <div
                        className="flex justify-between cursor-pointer hover:underline hover:text-blue-600"
                        onClick={handleCardClick}
                    >
                        <h3 className="text-xl font-bold text-primary">{jobData.title}</h3>
                    </div>
                    <p className="text-base font-medium text-muted-foreground">{companyName}</p>
                </div>

                {/* Meta Row: Location, Salary, etc. */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{jobData.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        <span>{jobData.workplace}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Banknote className="h-4 w-4" />
                        <span>
                            ₹{formatSalary(jobData.salaryMin)} - ₹{formatSalary(jobData.salaryMax)}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Badge>{jobRole}</Badge>
                    </div>
                </div>

                {/* Description */}
                <p className="line-clamp-2 text-sm text-muted-foreground">{jobData.description}</p>
            </div>

            {/* 3. Actions Section (Right Side) */}
            {/* <div className=" flex shrink-0 flex-row items-center justify-between gap-3 sm:flex-col sm:items-end sm:justify-start"> */}
            <div className=" flex shrink-0 flex-row items-center justify-between md:justify-evenly gap-3 sm:flex-col sm:items-end sm:justify-start">
                {/* Data (Desktop only) */}
                <span className=" hidden text-xs text-muted-foreground sm:block">
                    {/* {postedAt} */}
                    <p>{timeAgo(jobData.postedAt)}</p>
                    <div className="flex flex-col items-end gap-1.5 justify-end mt-1.5">
                        <div className="flex flex-row gap-1.5">
                            <ViewCount jobId={jobData.id} />
                        </div>
                        {role !== "CANDIDATE" && !isDeleted && <p>{jobData.status}</p>}
                        {role === "CANDIDATE" && isAppliedByUser && <p>Applied</p>}
                        {role === "RECRUITER" && isDeleted && <p className=" text-destructive">DELETED</p>}
                    </div>
                </span>

                {role === "CANDIDATE" && (
                    <div className="flex flex-row sm:items-end sm:flex-col-reverse gap-3">
                        {!isAppliedByUser && (
                            <Button className="flex-1 sm:w-32" onClick={handleApplyJob} disabled={isApplyJobLoading}>
                                {isApplyJobLoading ? (
                                    <Spinner data-icon="inline-start" />
                                ) : (
                                    <>
                                        <Send className="mr-2 h-4 w-4" /> Apply
                                    </>
                                )}
                            </Button>
                        )}

                        <Button
                            onClick={handleSaveJob}
                            disabled={isToggleSaveJobLoading}
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-blue-600 sm:mt-auto"
                        >
                            {isSaved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    );
}
