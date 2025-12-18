"use client";
import {
    Sidebar,
    SidebarRail,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import CandidateSidebarHeader from "./sidebar-header";
import CandidateSidebarMenu from "./sidebar-menu";
import CandidateSidebarFooter from "./sidebar-footer";

export function CandidateSidebar() {
    return (
        <Sidebar collapsible="icon">
            <CandidateSidebarHeader />
            <SidebarSeparator className="m-0" />
            {/* <SidebarSeparator className={isCollapsed ? 'mt-4 ml-0' : 'm-0'} /> */}
            <CandidateSidebarMenu />
            <CandidateSidebarFooter />
            <SidebarRail />
        </Sidebar>
    );
}
