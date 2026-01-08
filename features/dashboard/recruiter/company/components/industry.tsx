"use client";
import { Badge } from "@/components/ui/badge";
import CardHeaderWrapper from "@/features/dashboard/components/card-header-wrapper";
import { X } from "lucide-react";
import React from "react";

const role = 'CANDIDATE';

const ALL_SKILLS = [
    { value: "react", label: "React" },
    { value: "java", label: "Java" },
    // { value: "javascript", label: "JavaScript" },
    // { value: "css", label: "CSS" },
    // { value: "python", label: "Python" },
];

export default function Industry() {
    return (
        <CardHeaderWrapper
            title="Industries"
            width="max-w-5xl"
            buttonLabel="Add"
            isButton={role === 'CANDIDATE' ? false : true}
        >
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
    );
}
