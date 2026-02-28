"use client";
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { Bell, BriefcaseBusiness, Building2, FileUser, LayoutDashboard, MessageSquareMore, User, Users, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { useGetUnReadCount } from "../../components/chat/api/query";
import { useGetUserData } from "../../api/query";

const items = [
    { title: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    { title: "Company", url: "/dashboard/recruiter/company", icon: Building2 },
    { title: "Job Posts", url: "/dashboard/recruiter/jobpost", icon: BriefcaseBusiness },
    // { title: "Applicants", url: "#", icon: Users },
    { title: "Message", url: "/dashboard/recruiter/chat", icon: MessageSquareMore },
    { title: "Notification", url: "/dashboard/recruiter/notification", icon: Bell },
];

export default function RecruiterSidebarMenu() {
    const { isMobile, state } = useSidebar();
    const isCollapsed = state === "collapsed";
    const pathname = usePathname();

    const { data: user, isSuccess } = useGetUserData();
    const { data: unread, isPending, isError } = useGetUnReadCount(isSuccess, user?.data?.companyId);

    const isItemActive = (itemUrl: string) => {
        if (pathname === itemUrl) return true;
        if (itemUrl === "/dashboard/recruiter") return false;
        return pathname.startsWith(`${itemUrl}/`);
    };


    const unreadCount = unread?.data?.unreadCount || 0;
    // const unreadCount = 55

    return (
        <>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isMessageItem = item.url === "/dashboard/recruiter/chat";

                                return (
                                    <SidebarMenuItem key={item.title} className="relative">
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isItemActive(item.url)}
                                            tooltip={item.title}
                                            size="lg"
                                            className={
                                                isCollapsed
                                                    ? "[&_.lucide]:h-5 [&_.lucide]:w-6"
                                                    : "justify-start gap-2 [&_.lucide]:h-5 [&_.lucide]:w-6"
                                            }
                                        >
                                            <a href={item.url} className="flex items-center gap-2 w-full">
                                                <item.icon className={isCollapsed ? "pl-[5px]" : ""} />
                                                <span className="text-md">{item.title}</span>

                                                {/* 🔥 BADGE */}
                                                {isMessageItem && unreadCount > 0 && !isCollapsed && (
                                                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                                        {/* {unreadCount}
                                                        {unreadCount >= 99 && "99+"} */}
                                                        {unreadCount < 99 ? unreadCount : "99+"}
                                                    </span>
                                                )}
                                            </a>
                                        </SidebarMenuButton>

                                        {/* If collapsed sidebar → show floating badge */}
                                        {isMessageItem && unreadCount > 0 && isCollapsed && (
                                            <span
                                                className={`absolute bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full ${unreadCount < 99 ? "bottom-4 left-4" : "bottom-5 left-2"}`}
                                            >
                                                {unreadCount < 99 ? unreadCount : "99+"}
                                            </span>
                                        )}
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </>
    );
}
