"use client";

import {
    MapPin,
    Building2,
    Banknote,
    Clock,
    Bookmark,
    Send,
    Eye,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility

const ALL_SKILLS = [
    { value: "react", label: "React" },
    { value: "java", label: "Java" },
    { value: "javascript", label: "JavaScript" },
    { value: "css", label: "CSS" },
    { value: "python", label: "Python" },
];

interface jobDetailsTopProps {
    logo?: string; // URL for image, fallback handled in component
    title?: string;
    company?: string;
    location?: string;
    workPlace?: string; // e.g. "Hybrid"
    salary?: string;
    description?: string;
    postedAt?: string;
}

const role = "CANDIDATE";

export default function JobDetailsTop({
    title = "Senior Frontend Developer",
    company = "TechCorp Inc.",
    location = "San Francisco, CA",
    workPlace = "Remote",
    salary = "$120k - $150k",
    description = "We are looking for a Senior Frontend Developer to join our dynamic team...",
    postedAt = "2 days ago",
}: jobDetailsTopProps) {
    return (
        <Card className="p-6  w-full max-w-4xl flex flex-col sm:gap-4 gap-0">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                <span className=" flex flex-col items-end absolute top-6 right-6 text-xs text-muted-foreground sm:hidden">
                    {/* {postedAt} */}
                    <p>{postedAt}</p>
                    <div className="flex justify-end items-center gap-1.5 my-1.5">
                        <Eye className="h-4 w-4 " />
                        <p>1200</p>
                    </div>
                    {role !== "CANDIDATE" && <p>Active</p>}
                </span>
                {/* 1. Logo Section */}
                <div className="shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 dark:text-black">
                        {/* Replace this with an <img /> if you have a real logo */}
                        <Building2 className="h-6 w-6" />
                    </div>
                </div>

                {/* 2. Main Content Section */}
                <div className="flex flex-1 flex-col gap-3">
                    {/* Header: Title & Company */}
                    <div>
                        <div className="flex justify-between">
                            <h3 className="text-xl font-bold text-primary">
                                {title}
                            </h3>
                        </div>
                        <p className="text-base font-medium text-muted-foreground">
                            {company}
                        </p>
                    </div>

                    {/* Meta Row: Location, Salary, etc. */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            <span>{workPlace}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Banknote className="h-4 w-4" />
                            <span>{salary}</span>
                        </div>
                    </div>
                </div>

                <div className=" flex shrink-0 flex-row items-center justify-between md:justify-evenly gap-3 sm:flex-col sm:items-end sm:justify-start">
                    {/* Date (Desktop only) */}
                    <span className=" hidden text-xs text-muted-foreground sm:block">
                        {/* {postedAt} */}
                        <p>{postedAt}</p>
                        <div className="flex flex-col items-end gap-1.5 justify-end mt-1.5">
                            <div className="flex flex-row gap-1.5">
                                <Eye className="h-4 w-4" />
                                <p>1200</p>
                            </div>
                            {role !== "CANDIDATE" && <p>Active</p>}
                        </div>
                    </span>
                </div>
            </div>

            {/* skills  */}
            <div className="flex flex-col gap-4">
                <h2 className=" md:text-lg font-semibold">Required skills</h2>
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
            </div>

            {role === "CANDIDATE" && (
                <div className="flex gap-3 mt-7 sm:mt-3">
                    <Button className=" sm:w-50 w-35 ">
                        <Send className=" h-4 w-4" />
                        Apply
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-emerald-600 sm:mt-auto"
                    >
                        <Bookmark className="h-5 w-5" />
                    </Button>
                </div>
            )}
        </Card>
    );
}
