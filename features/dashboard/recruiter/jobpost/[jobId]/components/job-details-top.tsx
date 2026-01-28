"use client";

import { MapPin, Building2, Banknote, Clock, Bookmark, Send, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility
import { useAppSelector } from "@/store/index.store";
import { Status, WorkPlace } from "../../api/types";
import { formatSalary, timeAgo } from "@/lib/utils/utils";
import { useGetJobViewById } from "../api/query";
import ViewCount from "./view-count";
import { JobByIdResponse } from "../api/types";
import JobSkill from "./job-skill";
import { useRouter } from "next/navigation";
import { useApplyJob } from "@/features/dashboard/candidate/job/api/mutate";
import { Spinner } from "@/components/ui/spinner";

export default function JobDetailsTop({ jobData }: { jobData: JobByIdResponse }) {
    const role = useAppSelector((state) => state.app.role);

    const { mutate, isPending, isSuccess } = useApplyJob();

    const handleCompanyClick = (companyId: number) => {
        if (role === "CANDIDATE") {
            window.open(`/dashboard/candidate/company/${companyId}`, "_blank", "noopener,noreferrer");
            // }
        } else {
            window.open(`/dashboard/recruiter/company`, "_blank", "noopener,noreferrer");
        }
    };

    const handleApply = () => {
        if (role === "CANDIDATE") {
            mutate({ jobId: jobData.id });
        }
    };

    return (
        <Card className="p-6  w-full max-w-4xl flex flex-col sm:gap-4 gap-0">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                <span className=" flex flex-col items-end absolute top-43 right-8 text-xs text-muted-foreground sm:hidden">
                    <p>{timeAgo(jobData.postedAt)}</p>
                    <div className="flex justify-end items-center gap-1.5 my-1.5">
                        <ViewCount jobId={jobData.id} />
                    </div>
                    {role !== "CANDIDATE" && jobData.isDeleted === false && <p>{jobData.status}</p>}
                    {role !== "CANDIDATE" && jobData.isDeleted === true && <p className="text-destructive">DELETED</p>}
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
                        <div className="flex justify-between">
                            <h3 className="text-xl font-bold text-primary">{jobData.title}</h3>
                        </div>
                        <p
                            onClick={() => handleCompanyClick(jobData.company.id)}
                            className="text-base font-medium text-muted-foreground hover:text-blue-600 hover:underline cursor-pointer"
                        >
                            {jobData.company.name}
                        </p>
                    </div>

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
                            <Badge>{jobData.jobRole.name}</Badge>
                        </div>
                    </div>
                </div>

                <div className=" flex shrink-0 flex-row items-center justify-between md:justify-evenly gap-3 sm:flex-col sm:items-end sm:justify-start">
                    {/* Date (Desktop only) */}
                    <span className=" hidden text-xs text-muted-foreground sm:block">
                        <p>{timeAgo(jobData.postedAt)}</p>
                        <div className="flex flex-col items-end gap-1.5 justify-end mt-1.5">
                            <div className="flex flex-row gap-1.5">
                                <ViewCount jobId={jobData.id} />
                            </div>
                            {role !== "CANDIDATE" && jobData.isDeleted === false && <p>{jobData.status}</p>}
                            {role !== "CANDIDATE" && jobData.isDeleted === true && <p className="text-destructive">DELETED</p>}
                        </div>
                    </span>
                </div>
            </div>

            {/* skills  */}
            <JobSkill jobId={jobData.id} />

            {role === "CANDIDATE" && (
                <div className="flex gap-3 mt-7 sm:mt-3">
                    {!isSuccess && (
                        <Button onClick={handleApply} className=" sm:w-50 w-35 ">
                            <Send className=" h-4 w-4" />
                            {isPending ? <Spinner /> : "Apply"}
                        </Button>
                    )}
                    {/* <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-emerald-600 sm:mt-auto">
                        <Bookmark className="h-5 w-5" />
                    </Button> */}
                </div>
            )}
        </Card>
    );
}
