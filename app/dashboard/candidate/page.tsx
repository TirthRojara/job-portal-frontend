"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileCompletionCard from "@/features/dashboard/candidate/components/profile-completion-card";
import RecentMessagesCard from "@/features/dashboard/candidate/components/recent-messages-card";
import RecommendedJobCard from "@/features/dashboard/candidate/components/recommended-job";
import CardGroup from "@/features/dashboard/components/card-group";
import { ChatCard } from "@/features/dashboard/components/chat-card";
import { ChatCardSkeleton } from "@/features/dashboard/components/chat-card-skeleton";
import { StatCard } from "@/features/dashboard/components/dashboard-card";
import { EmptyChat } from "@/features/dashboard/components/empty-chat";
import { JobPostCard } from "@/features/dashboard/components/job-post-card";
import { Bookmark, CalendarClock, CalendarRange, FileUser } from "lucide-react";
import React from "react";

const stats = [
    {
        label: "Applications",
        count: 24,
        icon: FileUser,
        iconBgClassName: "bg-rose-500",
    },
    {
        label: "Saved jobs",
        count: 8,
        icon: Bookmark,
        iconBgClassName: "bg-emerald-500",
    },
    {
        label: "Today Apply",
        count: 3,
        icon: CalendarClock,
        iconBgClassName: "bg-purple-500",
    },
    {
        label: "Weekly Apply",
        count: 5,
        icon: CalendarRange,
        iconBgClassName: "bg-orange-500",
    },
];

export default function Page() {
    return (
        <>
            {/* <h1 className="">main area</h1> */}

            <ProfileCompletionCard name="Tirth" value={80} />
            <CardGroup items={stats} />

            <div className="grid grid-cols-1 md:grid-cols-2 px-4 py-6 md:gap-4 gap-4">
                <RecommendedJobCard />
                <RecentMessagesCard />
            </div>
        </>
    );
}
