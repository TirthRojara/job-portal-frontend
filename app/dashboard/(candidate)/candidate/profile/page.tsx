// "use client";
import { FormInput } from "@/components/custom-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EducationDetails from "@/features/dashboard/candidate/profile/components/education-details";
import LanguageDetails, { Language } from "@/features/dashboard/candidate/profile/components/language-details";
import ProfileDetails from "@/features/dashboard/candidate/profile/components/profile-details";

import { ProfileSummaryCard } from "@/features/dashboard/candidate/profile/components/profile-summary-card";
import Resume from "@/features/dashboard/candidate/profile/components/resume";
import SkillsDetails from "@/features/dashboard/candidate/profile/components/skills-details";
import Summary from "@/features/dashboard/candidate/profile/components/summary";
import WorkExperience from "@/features/dashboard/candidate/profile/components/work-experience";
import { Languages } from "next/dist/lib/metadata/types/alternative-urls-types";
import { string } from "zod";



const profile = {
    name: "John Smith",
    role: "Senior Frontend Developer",
    location: "San Francisco, CA",
    email: "john.smith@email.com",
    completion: 85,
};

const languages = [
    { id: "1", name: "English", level: "Native" },
    { id: "2", name: "Spanish", level: "Beginner" },
    { id: "3", name: "Gujarati", level: "Intermediate" },
];


export default function Page() {
    return (
        <>
            {/* <h1>profile page</h1> */}
            <div className="flex flex-col justify-centers items-center gap-6 px-4 py-6">
                <ProfileSummaryCard profile={profile} />
                <Summary />
                <ProfileDetails />
                <LanguageDetails languages={languages} />
                {/* <LanguageDetails languages={[]} /> */}
                <SkillsDetails />
                <EducationDetails />
                <WorkExperience />
                <Resume />
               
            </div>
        </>
    );
}
