"use client";
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { Bell, Bookmark, BriefcaseBusiness, FileUser, LayoutDashboard, MessageSquareMore, User, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { useGetUnReadCount } from "../../components/chat/api/query";

const items = [
    { title: "Dashboard", url: "/dashboard/candidate", icon: LayoutDashboard },
    { title: "Profile", url: "/dashboard/candidate/profile", icon: User },
    { title: "Job", url: "/dashboard/candidate/job", icon: BriefcaseBusiness },
    { title: "Saved Job", url: "/dashboard/candidate/savedjob", icon: Bookmark },
    // { title: "Quick Apply", url: "#", icon: Zap },
    { title: "Application", url: "/dashboard/candidate/application", icon: FileUser },
    { title: "Message", url: "/dashboard/candidate/chat", icon: MessageSquareMore },
    // { title: "Notification", url: "/dashboard/candidate/notification", icon: Bell },
];

export default function CandidateSidebarMenu() {
    const { isMobile, state } = useSidebar();
    const isCollapsed = state === "collapsed";
    const pathname = usePathname();

    const { data: unread, isPending, isError } = useGetUnReadCount(true);

    const isItemActive = (itemUrl: string) => {
        if (pathname === itemUrl) return true;
        if (itemUrl === "/dashboard/candidate") return false;
        return pathname.startsWith(`${itemUrl}/`);
    };

    const unreadCount = unread?.data?.unreadCount || 0;

    return (
        <>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isMessageItem = item.url === "/dashboard/candidate/chat";

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
