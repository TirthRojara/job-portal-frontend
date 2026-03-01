"use client";

import { useGetRecruiterStates, useGetUserData } from "@/features/dashboard/api/query";
import CardGroup from "@/features/dashboard/components/card-group";
import RecentMessagesCard from "@/features/dashboard/components/recent-messages-card";
import RecentJobCard from "@/features/dashboard/recruiter/components/recent-job-post";
import { useAppSelector } from "@/store/index.store";
import { CalendarClock, ClipboardList, Eye, Files } from "lucide-react";
import React from "react";

export default function Page() {
    const role = useAppSelector((state) => state.app.role);

    const { data: user, isSuccess } = useGetUserData();
    const { data: states } = useGetRecruiterStates(role, user?.data?.companyId!, isSuccess);

    const stats = [
        {
            label: "Active Job Post",
            count: states?.data?.activeJobPost ?? "",
            icon: ClipboardList,
            iconBgClassName: "bg-rose-500",
        },
        {
            label: "Total Job Post",
            count: states?.data?.totalJobPost ?? "",
            icon: Files,
            iconBgClassName: "bg-emerald-500",
        },
        {
            label: "Company Views",
            count: states?.data?.companyView ?? "",
            icon: Eye,
            iconBgClassName: "bg-purple-500",
        },
        {
            label: "Today’s Applications",
            count: states?.data?.todayApplication ?? "",
            icon: CalendarClock,
            iconBgClassName: "bg-orange-500",
        },
    ];

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
