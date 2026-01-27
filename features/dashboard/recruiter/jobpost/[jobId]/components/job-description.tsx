"use client";
import { Badge } from "@/components/ui/badge";
import CardHeaderWrapper from "@/features/dashboard/components/card-header-wrapper";
import { X } from "lucide-react";
import React from "react";
import { JobByIdResponse } from "../api/types";
import { formatText } from "@/lib/utils/utils";
import JobBenefit from "./job-benefit";

const ALL_SKILLS = [
    { value: "react", label: "React" },
    { value: "java", label: "Java" },
    { value: "javascript", label: "JavaScript" },
    { value: "css", label: "CSS" },
    { value: "python", label: "Python" },
];

export default function JobDescription({ jobData }: { jobData: JobByIdResponse }) {
    return (
        <div className="w-full max-w-4xl flex flex-col gap-6">
            <CardHeaderWrapper title="Job Description" width="max-w-4xl" isButton={false}>
                <p className=" whitespace-pre-wrap">{formatText(jobData.description)}</p>
                {/* <p className=" whitespace-pre-wrap">{`This is description.\n\n- one \n-two\n-three\n\nSkills\n\n- one    - two    - three    - four\n\nSwitching between projects is seamless with the File: Open Recent feature, accessible via CTRL + R.\n\nThis functionality keeps a handy list of your recently accessed projects, allowing you to switch contexts without breaking your workflow. It’s a simple yet effective way to manage multiple projects simultaneously.`}</p> */}
            </CardHeaderWrapper>
            
            <CardHeaderWrapper title="Key Responsibilities" width="max-w-4xl" isButton={false}>
                <p className=" whitespace-pre-wrap">{formatText(jobData.responsibilities)}</p>
            </CardHeaderWrapper>

            <CardHeaderWrapper title="Requirements" width="max-w-4xl" isButton={false}>
                <p className=" whitespace-pre-wrap">{formatText(jobData.requirements)}</p>
            </CardHeaderWrapper>

            {/* <CardHeaderWrapper title="Benefits & Perks" width="max-w-4xl" isButton={false}>
                <div className="flex gap-2 flex-wrap">
                    {ALL_SKILLS.map((skill) => (
                        <Badge
                            key={skill.value}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm group cursor-pointer"
                        >
                            {skill.label}
                            <X className="ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Badge>
                    ))}
                </div>
            </CardHeaderWrapper> */}

            <JobBenefit jobId={jobData.id} />
        </div>
    );
}
