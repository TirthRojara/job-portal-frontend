"use client";
import {
    Sidebar,
    SidebarRail,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import RecruiterSidebarHeader from "./sidebar-header";
import RecruiterSidebarMenu from "./sidebar-menu";
import RecruiterSidebarFooter from "./sidebar-footer";

export function RecruiterSidebar() {
    return (
        <Sidebar collapsible="icon">
            <RecruiterSidebarHeader />
            <SidebarSeparator className="m-0" />
            {/* <SidebarSeparator className={isCollapsed ? 'mt-4 ml-0' : 'm-0'} /> */}
            <RecruiterSidebarMenu />
            <RecruiterSidebarFooter/>
            <SidebarRail />
        </Sidebar>
    );
}
