"use client";

import {
    MapPin,
    Building2,
    Banknote,
    Clock,
    Bookmark,
    Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility

interface JobCardProps {
    logo?: string; // URL for image, fallback handled in component
    title?: string;
    company?: string;
    location?: string;
    workPlace?: string; // e.g. "Hybrid"
    salary?: string;
    description?: string;
    postedAt?: string;
}

export function JobPreviewCard({
    title = "Senior Frontend Developer",
    company = "TechCorp Inc.",
    location = "San Francisco, CA",
    workPlace = "Remote",
    salary = "$120k - $150k",
    description = "We are looking for a Senior Frontend Developer to join our dynamic team...",
    postedAt = "2 days ago",
}: JobCardProps) {
    return (
        <Card className="cursor-pointer group relative flex w-full max-w-4xl flex-col gap-6 p-6 transition-all hover:shadow-xl hover:scale-101 sm:flex-row sm:items-start">
            <span className="absolute top-6 right-6 text-xs text-muted-foreground sm:hidden">
                {postedAt}
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

                {/* Description */}
                <p className="line-clamp-2 text-sm text-muted-foreground">
                    {description}
                </p>
            </div>

            {/* 3. Actions Section (Right Side) */}
            <div className=" flex shrink-0 flex-row items-center justify-between gap-3 sm:flex-col sm:items-end sm:justify-start">
                {/* Date (Desktop only) */}
                <span className="hidden text-xs text-muted-foreground sm:block">
                    {postedAt}
                </span>

                <div className="flex flex-row sm:items-end sm:flex-col-reverse gap-3">
                    <Button className="flex-1 sm:w-32">
                        <Send className="mr-2 h-4 w-4" />
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
            </div>
        </Card>
    );
}
