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

const items = [
    { title: "Dashboard", url: "/dashboard/candidate", icon: LayoutDashboard },
    { title: "Profile", url: "/dashboard/candidate/profile", icon: User },
    { title: "Job", url: "/dashboard/candidate/job", icon: BriefcaseBusiness },
    { title: "Saved Job", url: "/dashboard/candidate/savedjob", icon: Bookmark },
    // { title: "Quick Apply", url: "#", icon: Zap },
    { title: "Application", url: "/dashboard/candidate/application", icon: FileUser },
    { title: "Message", url: "/dashboard/candidate/chat", icon: MessageSquareMore },
    { title: "Notification", url: "/dashboard/candidate/notification", icon: Bell },
];

export default function CandidateSidebarMenu() {
    const { isMobile, state } = useSidebar();
    const isCollapsed = state === "collapsed";
    const pathname = usePathname();

    const isItemActive = (itemUrl: string) => {
        if (pathname === itemUrl) return true;
        if (itemUrl === "/dashboard/candidate") return false;
        return pathname.startsWith(`${itemUrl}/`);
    };

    return (
        <>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isItemActive(item.url)}
                                        tooltip={item.title}
                                        size={"lg"}
                                        // className="[&_.lucide]:h-6 [&_.lucide]:w-6"
                                        className={
                                            isCollapsed
                                                ? "  [&_.lucide]:h-5 [&_.lucide]:w-6" // icon centered
                                                : "justify-start gap-2 [&_.lucide]:h-5 [&_.lucide]:w-6"
                                        }
                                    >
                                        <a href={item.url} className="flex items-center gap-2">
                                            <item.icon className={isCollapsed ? "pl-[5px]" : ""} />
                                            <span className="text-md">{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                    {/* <SidebarMenuBadge>24</SidebarMenuBadge> */}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </>
    );
}
