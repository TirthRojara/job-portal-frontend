"use client";
import {
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    useSidebar,
} from "@/components/ui/sidebar";
import { GalleryVerticalEnd } from "lucide-react";
import React from "react";

export default function CandidateSidebarHeader() {
    const { isMobile, state } = useSidebar();
    const isCollapsed = state === "collapsed";

    return (
        <>
            {/* <SidebarHeader className="my-1"> */}
            <SidebarHeader className={`  ${isCollapsed ? "my-3" : "my-1"}`}>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="hover:bg-transparent cursor-default"
                        >
                            <a href="#" className="flex gap-3">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <GalleryVerticalEnd className="size-6" />
                                </div>
                                <div className="leading-none">
                                    <span className="font-bold text-xl">
                                        Easy Apply
                                    </span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
        </>
    );
}
