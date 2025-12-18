import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import {
    Bell,
    BriefcaseBusiness,
    FileUser,
    LayoutDashboard,
    MessageSquareMore,
    User,
    Zap,
} from "lucide-react";
import React from "react";

const items = [
    { title: "Dashboard", url: "#", icon: LayoutDashboard },
    { title: "Profile", url: "#", icon: User },
    { title: "Job", url: "#", icon: BriefcaseBusiness },
    { title: "Quick Apply", url: "#", icon: Zap },
    { title: "Application", url: "#", icon: FileUser },
    { title: "Message", url: "#", icon: MessageSquareMore },
    { title: "Notification", url: "#", icon: Bell },
];

export default function CandidateSidebarMenu() {
    const { isMobile, state } = useSidebar();
    const isCollapsed = state === "collapsed";

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
                                        tooltip={item.title}
                                        size={"lg"}
                                        // className="[&_.lucide]:h-6 [&_.lucide]:w-6"
                                        className={
                                            isCollapsed
                                                ? "  [&_.lucide]:h-5 [&_.lucide]:w-6" // icon centered
                                                : "justify-start gap-2 [&_.lucide]:h-5 [&_.lucide]:w-6"
                                        }
                                    >
                                        <a
                                            href={item.url}
                                            className="flex items-center gap-2"
                                        >
                                            <item.icon
                                                className={
                                                    isCollapsed
                                                        ? "pl-[5px]"
                                                        : ""
                                                }
                                            />
                                            <span className="text-md">
                                                {item.title}
                                            </span>
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
