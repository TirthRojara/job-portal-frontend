import { Button } from "@/components/ui/button";
import EducationDetails from "@/features/dashboard/candidate/profile/components/education-details";
import LanguageDetails from "@/features/dashboard/candidate/profile/components/language-details";
import ProfileDetails from "@/features/dashboard/candidate/profile/components/profile-details";
import Resume from "@/features/dashboard/candidate/profile/components/resume";
import SkillsDetails from "@/features/dashboard/candidate/profile/components/skills-details";
import Summary from "@/features/dashboard/candidate/profile/components/summary";
import WorkExperience from "@/features/dashboard/candidate/profile/components/work-experience";
import ApplicationStatusCard from "@/features/dashboard/recruiter/jobpost/[jobId}/applicants/components/application-status-card";
import { ArrowDownToLine, MessageSquareMore } from "lucide-react";

const languages = [
    { id: "1", name: "English", level: "Native" },
    { id: "2", name: "Spanish", level: "Beginner" },
    { id: "3", name: "Gujarati", level: "Intermediate" },
];

export default async function Page({
    params,
}: {
    params: Promise<{ applicantId: string }>;
}) {
    const { applicantId } = await params;
    console.log({ applicantId });

    return (
        <>
            <div className="flex sm:flex-row flex-col-reverse gap-6 justify-center px-4 py-6 ">
                <div className="flex flex-col gap-6">
                    <Summary />
                    <ProfileDetails />
                    <SkillsDetails />
                    <WorkExperience />
                    <EducationDetails />
                    <LanguageDetails languages={languages} />
                </div>
                <div className="flex flex-col gap-4 sm:sticky sm:top-25 sm:h-fit">
                    <div className="flex gap-3 sm:flex-row flex-col">
                        <Button variant={"outline"}> 
                            <MessageSquareMore /> Send Message
                        </Button>
                        <Button variant={"outline"}> 
                            <ArrowDownToLine /> Download Resume
                        </Button>
                    </div>
                    <div className="w-full max-w-xl">
                        <ApplicationStatusCard />
                    </div>
                </div>
            </div>
        </>
    );
}
