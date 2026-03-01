"use client";
import ProfileCompletionCard from "@/features/dashboard/candidate/components/profile-completion-card";
import RecentMessagesCard from "@/features/dashboard/components/recent-messages-card";
import RecommendedJobCard from "@/features/dashboard/candidate/components/recommended-job";
import CardGroup from "@/features/dashboard/components/card-group";

import { Bookmark, CalendarClock, CalendarRange, FileUser } from "lucide-react";
import React from "react";
import { useGetCandidateStates } from "@/features/dashboard/api/query";
import { useAppSelector } from "@/store/index.store";

export default function Page() {
    const role = useAppSelector((state) => state.app.role);

    const { data: states } = useGetCandidateStates(role);

    const stats = [
        {
            label: "Applications",
            count: states?.data?.totalApplication ?? "",
            icon: FileUser,
            iconBgClassName: "bg-rose-500",
        },
        {
            label: "Saved jobs",
            count: states?.data?.savedJob ?? "",
            icon: Bookmark,
            iconBgClassName: "bg-emerald-500",
        },
        {
            label: "Today Apply",
            count: states?.data?.todayApply ?? "",
            icon: CalendarClock,
            iconBgClassName: "bg-purple-500",
        },
        {
            label: "Weekly Apply",
            count: states?.data?.weeklyApply ?? "",
            icon: CalendarRange,
            iconBgClassName: "bg-orange-500",
        },
    ];

    return (
        <>
            {/* <ProfileCompletionCard name="Tirth" value={80} /> */}
            <div className="mt-6">
                <CardGroup items={stats} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 px-4 py-6 md:gap-4 gap-4">
                <RecommendedJobCard />
                <RecentMessagesCard />
            </div>
        </>
    );
}
