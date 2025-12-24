"use client";

import { Button } from "@/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import {
    SidebarInset,
    SidebarProvider,
    SidebarSeparator,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { RecruiterSidebar } from "@/features/dashboard/recruiter/components/recruiter-sidebar";
import { Bell, Moon, Plus, SearchIcon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isDarkTheme, setTheme] = useState(false);

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null; // or a stable placeholder

    return (
        <>
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "19rem",
                    } as React.CSSProperties
                }
            >
                <RecruiterSidebar />
                <SidebarInset className="bg-sidebar">
                    {/* header */}
                    <div className="sticky top-0 z-50 bg-sidebar">
                        <header className=" flex items-center justify-between p-2 gap-2 md:my-[10px] md:mx-2 my-2">
                            {/* LEFT SIDE */}
                            <div className=" flex items-center gap-3 w-full md:w-auto ">
                                <SidebarTrigger className="p-2 " />
                                {/* <div className="flex-1 md:flex-none">
                                <InputGroup className="w-full md:w-[340px]">
                                    <InputGroupInput placeholder="Search jobs..." />
                                    <InputGroupAddon>
                                        <SearchIcon />
                                    </InputGroupAddon>
                                </InputGroup>
                            </div> */}
                                <Button>
                                    <Plus /> New Job
                                </Button>
                            </div>

                            {/* RIGHT SIDE ICONS */}
                            <div className="flex items-center gap-1">
                                <Button
                                    onClick={() =>
                                        mounted && setTheme((prev) => !prev)
                                    }
                                    variant="ghost"
                                    size="icon"
                                >
                                    {/* <Moon className="size-5" /> */}
                                    {isDarkTheme ? (
                                        <Moon className="size-5" />
                                    ) : (
                                        <Sun className="size-5" />
                                    )}
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <Bell className="size-5" />
                                </Button>
                            </div>
                        </header>
                        <SidebarSeparator className="m-0" />
                    </div>

                    <main>
                        <div className=" border-red-500 border-0">
                            {children}
                        </div>
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
