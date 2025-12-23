"use client";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FileUser } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

type StatCardProps = {
    label: string;
    count: number | string;
    //   icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    iconBgClassName?: string; // e.g. "bg-blue-500"
};

export function StatCard({
    label,
    count,
    icon: Icon,
    iconBgClassName = "bg-blue-500",
}: StatCardProps) {
    const { isMobile, state } = useSidebar();
    const isCollapsed = state === "collapsed";

    return (

        // <Card className="w-42 h-30 md:w-50 md:h-35 sm:w-37 sm:h-30 flex gap-1 justify-between items-center">
        // <Card className={`w-42 h-30 md:w-50 md:h-35 sm:w-37 sm:h-30 flex gap-1 justify-between items-center ${isCollapsed ? `md:w-65 md:h-38` : ''}`}>
        //  <Card className={`flex h-35 flex-1 min-w-[140px] max-w-sm flex-col items-center justify-center gap-3 rounded-xl border bg-card shadow-sm`}>
        //  <Card className={`flex h-35 flex-1 min-w-[140px] w-full flex-col items-center justify-center gap-3 rounded-xl border bg-card shadow-sm`}>
        <Card
            className={`flex h-35 flex-1 min-w-[140px] w-full flex-col items-center justify-center gap-3 rounded-xl border bg-card shadow-sm ${
                isCollapsed ? "md:h-37" : ""
            }`}
        >
            {/* <div className="bg-emerald-500 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"> */}
            <div
                className={`${iconBgClassName} text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg`}
            >
                <Icon />
            </div>
            {/* <h2>{count}</h2> */}
            <CardTitle>{count}</CardTitle>
            <CardDescription>{label}</CardDescription>
        </Card>
    );
}
