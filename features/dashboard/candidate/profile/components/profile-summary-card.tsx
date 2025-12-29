"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Mail } from "lucide-react";

type ProfileData = {
    name: string;
    role: string;
    location: string;
    email: string;
    completion: number; // 0–100
};

type ProfileSummaryCardProps = {
    profile: ProfileData;
};

export function ProfileSummaryCard({ profile }: ProfileSummaryCardProps) {
    const { name, role, location, email, completion } = profile;

    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        // <Card className="w-full overflow-hidden border-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
        <Card className="w-full max-w-4xl overflow-hidden border-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white">
            <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between md:p-4">
                {/* Left: avatar + info */}
                <div className="flex flex-1 items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-lg font-semibold md:text-xl">
                            {name}
                        </h2>
                        <p className="text-xs font-medium text-white md:text-sm">
                            {role}
                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white md:text-sm">
                            <span className="inline-flex items-center gap-1">
                                <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                                {location}
                            </span>
                            <span className="inline-flex items-center gap-1">
                                <Mail className="h-3 w-3 md:h-4 md:w-4" />
                                {email}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right: progress */}
                <div className="flex w-full flex-col items-end gap-1 sm:w-40 md:w-48">
                    <div className="flex md:flex-col md:items-end w-full items-center justify-between text-xs md:text-sm">
                        <span className="font-semibold md:text-2xl text-xl">
                            {completion}%
                        </span>
                        <span className="text-white">Profile Complete</span>
                    </div>

                    <Progress
                        value={completion}
                        // className="h-2 w-full bg-white/40"
                        className="h-2 bg-white/30 mt-2 mb-4 [&>div]:bg-white"
                    />
                </div>
            </div>
        </Card>
    );
}
