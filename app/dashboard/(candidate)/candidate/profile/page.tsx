import { FormInput } from "@/components/custom-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LanguageDetails from "@/features/dashboard/candidate/profile/components/language-details";
import ProfileDetails from "@/features/dashboard/candidate/profile/components/profile-details";

import { ProfileSummaryCard } from "@/features/dashboard/candidate/profile/components/profile-summary-card";
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

const lang = [{
    id: string, name: string, level: string
}]

export default function Page() {
    return (
        <>
            {/* <h1>profile page</h1> */}
            <div className="flex flex-col justify-centers items-center gap-6 px-4 py-6">
                <ProfileSummaryCard profile={profile} />
                <ProfileDetails />
                <LanguageDetails languages={languages} />
               
            </div>
        </>
    );
}
