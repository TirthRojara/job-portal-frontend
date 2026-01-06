"use client";
import { Badge } from "@/components/ui/badge";
import CardHeaderWrapper from "@/features/dashboard/components/card-header-wrapper";
import { X } from "lucide-react";
import React from "react";

const ALL_SKILLS = [
    { value: "react", label: "React" },
    { value: "java", label: "Java" },
    { value: "javascript", label: "JavaScript" },
    { value: "css", label: "CSS" },
    { value: "python", label: "Python" },
];

export default function JobDescription() {
    return (
        <div className="w-full max-w-4xl flex flex-col gap-6">
            <CardHeaderWrapper title="Job Description" width="max-w-4xl">
                <p className=" whitespace-pre-wrap">{`This is description.\n\n- one \n-two\n-three\n\nSkills\n\n- one    - two    - three    - four\n\nSwitching between projects is seamless with the File: Open Recent feature, accessible via CTRL + R.\n\nThis functionality keeps a handy list of your recently accessed projects, allowing you to switch contexts without breaking your workflow. It’s a simple yet effective way to manage multiple projects simultaneously.`}</p>
                {/* <p className=" whitespace-pre-wrap">{`this is description 

𝗻𝗼𝘄 𝘁𝗵𝗶𝘀 𝗶𝘀 𝗯𝗼𝗹𝗱

  • one
  • two
  • three
  • four

  1. 1
  2. 2
  3. 3
  4. 4
`}</p> */}
            </CardHeaderWrapper>
            <CardHeaderWrapper title="Key Responsibilities" width="max-w-4xl">
                <p className=" whitespace-pre-wrap">{`This is description.\n\n- one \n-two\n-three\n\nSkills\n\n- one    - two    - three    - four\n\nSwitching between projects is seamless with the File: Open Recent feature, accessible via CTRL + R.\n\nThis functionality keeps a handy list of your recently accessed projects, allowing you to switch contexts without breaking your workflow. It’s a simple yet effective way to manage multiple projects simultaneously.`}</p>
            </CardHeaderWrapper>
            <CardHeaderWrapper title="Requirements" width="max-w-4xl">
                <p className=" whitespace-pre-wrap">{`This is description.\n\n- one \n-two\n-three\n\nSkills\n\n- one    - two    - three    - four\n\nSwitching between projects is seamless with the File: Open Recent feature, accessible via CTRL + R.\n\nThis functionality keeps a handy list of your recently accessed projects, allowing you to switch contexts without breaking your workflow. It’s a simple yet effective way to manage multiple projects simultaneously.`}</p>
            </CardHeaderWrapper>
            <CardHeaderWrapper title="Benefits & Perks" width="max-w-4xl">
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
            </CardHeaderWrapper>
        </div>
    );
}
