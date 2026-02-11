import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin } from "lucide-react";
import { ApplicantsResponse } from "@/features/dashboard/recruiter/jobpost/[jobId]/applicants/api/types";
import { getInitials, timeAgo } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";

export default function ApplicantsCard({ applicant }: { applicant: ApplicantsResponse }) {
    const router = useRouter();

    return (
        <Card
            onClick={() => window.open(`/dashboard/recruiter/jobpost/1/applicants/${applicant.candidateProfile.id}`, "_blank")}
            className="w-full max-w-4xl transition-all hover:shadow-xl dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]  cursor-pointer "
        >
            <CardHeader className="flex flex-row items-start justify-between pb-0 space-y-0">
                {/* Left side: Avatar + Name/Title */}
                <div className="flex items-center space-x-4">
                    <Avatar className="h-11 w-11 rounded-xl">
                        {/* We use AvatarFallback because there is no image URL, just initials.
                Custom coloring applied to match the design. */}
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-bold text-2xl rounded-xl">
                            {getInitials(applicant.candidateProfile.fullName)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold text-blue-600 leading-none">{applicant.candidateProfile.fullName}</h3>
                        <p className="text-sm text-muted-foreground">
                            {/* Senior Frontend Developer */}
                            {applicant.job.title}
                        </p>
                    </div>
                </div>

                {/* Right side: Date */}
                <span className="text-sm text-muted-foreground whitespace-nowrap ml-auto pl-4">
                    {/* Applied 1d ago */}
                    {timeAgo(applicant.applyDate)}
                </span>
            </CardHeader>

            <CardContent>
                {/* Location Row */}
                <div className="flex items-center text-muted-foreground mt-0">
                    <MapPin className="h-4 w-4 mr-1.5 shrink-0" />
                    <span className="text-sm font-medium">
                        {/* New York, USA */}
                        {applicant.candidateProfile.address}
                    </span>
                </div>

                {/* Description/Bio */}
                <p className="mt-4 text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {/* Expert in React, TypeScript, and Tailwind. Previously led frontend at FinTech startup andd there is some more
                    about i would like to work on backend but i know frontend as well. I am full stack Developer. I would like to
                    build full stack application. Expert in React, TypeScript, and Tailwind. Previously led frontend at FinTech
                    startup andd there is some more about i would like to work on backend but i know frontend as well. I am full
                    stack Developer. I would like to build full stack application. Expert in React, TypeScript, and Tailwind.
                    Previously led frontend at FinTech startup andd there is some more about i would like to work on backend but i
                    know frontend as well. I am full stack Developer. I would like to build full stack application. */}
                    {applicant.candidateProfile.summary}
                </p>
            </CardContent>
        </Card>
    );
}
