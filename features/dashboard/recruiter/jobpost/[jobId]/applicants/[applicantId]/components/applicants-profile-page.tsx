"use client";
import { Button } from "@/components/ui/button";
import { Gender } from "@/features/dashboard/candidate/profile/api/types";
import EducationDetails from "@/features/dashboard/candidate/profile/components/education-details";
import LanguageDetails from "@/features/dashboard/candidate/profile/components/language-details";
import ProfileDetails from "@/features/dashboard/candidate/profile/components/profile-details";
import SkillsDetails from "@/features/dashboard/candidate/profile/components/skills-details";
import Summary from "@/features/dashboard/candidate/profile/components/summary";
import WorkExperience from "@/features/dashboard/candidate/profile/components/work-experience";
import { ArrowDownToLine, MessageSquareMore } from "lucide-react";
import React from "react";
import ApplicationStatusCard from "../../components/application-status-card";
import { useGetCandidateProfilById, useGetCandidateResumeForRecruiter } from "@/features/dashboard/candidate/profile/api/query";
import { useAppSelector } from "@/store/index.store";
import { GlobalError } from "next/dist/build/templates/app-page";
import { EmptyState } from "@/components/empty-state";
import { Spinner } from "@/components/ui/spinner";

export default function ApplicantsProfilePage({ applicantId, jobId }: { applicantId: string; jobId: string }) {
    console.log({ applicantId, jobId });

    const role = useAppSelector((state) => state.app.role);

    const { data: candidateDataforRecruiter, isError, error, isPending } = useGetCandidateProfilById(role, applicantId);

    const { refetch, isFetching: isResumeFetching } = useGetCandidateResumeForRecruiter(jobId, applicantId);

    const handleDownload = async () => {
        const result = await refetch();

        if (result.data) {
            const blob = result.data.data;

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = result.data.headers["content-disposition"];
            link.click();

            window.URL.revokeObjectURL(url);
        }
    };

    if (isPending) return <></>;

    if (isError) {
        return <EmptyState title="Something went wrong!" />;
    }

    return (
        <div className="flex sm:flex-row flex-col-reverse gap-6 justify-center px-4 py-6 ">
            <div className="flex flex-col gap-6">
                <Summary summary={candidateDataforRecruiter.data?.summary!} />
                <ProfileDetails profileData={candidateDataforRecruiter?.data!} />
                <SkillsDetails applicantId={applicantId} jobId={jobId} />
                <WorkExperience applicantId={applicantId} jobId={jobId} />
                <EducationDetails applicantId={applicantId} jobId={jobId} />
                <LanguageDetails applicantId={applicantId} jobId={jobId} />
            </div>
            <div className="flex flex-col gap-4 sm:sticky sm:top-25 sm:h-fit">
                <div className="flex gap-3 sm:flex-row flex-col">
                    <Button variant={"outline"}>
                        <MessageSquareMore /> Send Message
                    </Button>
                    <Button onClick={handleDownload} variant={"outline"}>
                        {isResumeFetching ? (
                            <Spinner className="w-[155px]" />
                        ) : (
                            <>
                                <ArrowDownToLine /> Download Resume
                            </>
                        )}
                    </Button>
                </div>
                <div className="w-full max-w-xl">
                    <ApplicationStatusCard applicantId={applicantId} jobId={jobId} />
                </div>
            </div>
        </div>
    );
}
