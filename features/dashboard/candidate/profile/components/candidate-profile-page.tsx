"use client";
import React from "react";
import { ProfileSummaryCard } from "./profile-summary-card";
import Summary from "./summary";
import ProfileDetails from "./profile-details";
import LanguageDetails from "./language-details";
import SkillsDetails from "./skills-details";
import EducationDetails from "./education-details";
import WorkExperience from "./work-experience";
import Resume from "./resume";
import { useGetUserData } from "@/features/dashboard/api/query";
import CreateProfile from "./create-profile";
import { useGetCandidateProfilById, useGetCandidateProfile } from "../api/query";
import { useAppSelector } from "@/store/index.store";

export default function CandidateProfilePage() {
    const role = useAppSelector((state) => state.app.role);

    const { data: userData, isError, isLoading } = useGetUserData();
    const { data: candidateData, isLoading: isLoadingCandidateData } = useGetCandidateProfile(role);

    // console.log("candidate data", userData);

    if (isLoading || isLoadingCandidateData) return <></>;
    if (!userData?.data) return <></>;

    const isProfileReady = !!userData?.data?.candidateProfileId;

    return (
        <>
            <div className="flex flex-col justify-centers items-center gap-6 px-4 py-6">
                {!isProfileReady && !candidateData ? (
                    <CreateProfile />
                ) : (
                    <>
                        {/* <ProfileSummaryCard profile={profile} /> */}
                        <Summary summary={candidateData?.data?.summary!} />
                        <ProfileDetails profileData={candidateData?.data!} />
                        {/* <LanguageDetails languages={languages} /> */}
                        <LanguageDetails />
                        <SkillsDetails />
                        <EducationDetails />
                        <WorkExperience />
                        <Resume />
                    </>
                )}
            </div>
        </>
    );
}
