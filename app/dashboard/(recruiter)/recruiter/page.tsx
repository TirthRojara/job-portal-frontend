"use client";

import CardGroup from "@/features/dashboard/components/card-group";
import RecentMessagesCard from "@/features/dashboard/components/recent-messages-card";
import RecentJobCard from "@/features/dashboard/recruiter/components/recent-job-post";
import { CalendarClock, ClipboardList, Eye, Files } from "lucide-react";
import React from "react";

const stats = [
    {
        label: "Active Job Post",
        count: 2,
        icon: ClipboardList,
        iconBgClassName: "bg-rose-500",
    },
    {
        label: "Total Job Post",
        count: 6,
        icon: Files,
        iconBgClassName: "bg-emerald-500",
    },
    {
        label: "Company Views",
        count: 1000,
        icon: Eye,
        iconBgClassName: "bg-purple-500",
    },
    {
        label: "Today’s Applications",
        count: 5,
        icon: CalendarClock,
        iconBgClassName: "bg-orange-500",
    },
];

export default function Page() {
    return (
        <>
            <div className="pt-6">
            <CardGroup items={stats} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 px-4 py-6 md:gap-4 gap-4">
                <RecentJobCard />
                <RecentMessagesCard />
            </div>
        </>
    );
}
