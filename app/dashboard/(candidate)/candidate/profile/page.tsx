import { FormInput } from "@/components/custom-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileDetails from "@/features/dashboard/candidate/profile/components/profile-details";

import { ProfileSummaryCard } from "@/features/dashboard/candidate/profile/components/profile-summary-card";



const profile = {
    name: "John Smith",
    role: "Senior Frontend Developer",
    location: "San Francisco, CA",
    email: "john.smith@email.com",
    completion: 85,
};

export default function Page() {
    return (
        <>
            {/* <h1>profile page</h1> */}
            <div className="flex flex-col justify-centers items-center gap-6 px-4 py-6">
                <ProfileSummaryCard profile={profile} />
                <ProfileDetails />
               
            </div>
        </>
    );
}
