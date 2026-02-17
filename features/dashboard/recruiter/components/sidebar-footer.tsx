"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { BadgeCheck, ChevronsUpDown, CreditCard, LogOut, Sparkles } from "lucide-react";
import React from "react";
import { useLogout } from "../../candidate/api/mutation";
import { useGetUserData } from "../../api/query";
import { getInitials } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";

export default function RecruiterSidebarFooter() {
    const { isMobile, state } = useSidebar();

    const router = useRouter();

    const { data, isError, error, isLoading } = useGetUserData();
    const { mutate: logoutMutation, isPending } = useLogout();

    function handleLogout() {
        logoutMutation();
    }

    return (
        <>
            <SidebarFooter>
                {/* drop down menu */}
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className=" cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarFallback className="rounded-lg">{getInitials(data?.data?.name!)}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">{data?.data?.name}</span>
                                        <span className="truncate text-xs">{data?.data?.email}</span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                side={isMobile ? "bottom" : "right"}
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarFallback className="rounded-lg">
                                                {getInitials(data?.data?.name!)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">{data?.data?.name}</span>
                                            <span className="truncate text-xs">{data?.data?.email}</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                {/* <DropdownMenuSeparator /> */}
                                {/* <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Sparkles />
                                        Upgrade to Pro
                                    </DropdownMenuItem>
                                </DropdownMenuGroup> */}
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={() => router.push("/dashboard/recruiter/account?tab=account")}>
                                        <BadgeCheck />
                                        Account
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <DropdownMenuItem
                                                // prevent dropdown from closing and re‑triggering
                                                onSelect={(e) => e.preventDefault()}
                                                className=" text-destructive data-[highlighted]:bg-destructive/10 data-[highlighted]:text-destructive data-[state=open]:bg-destructive/10 data-[state=open]:text-destructive focus:bg-destructive/10 focus:text-destructive "
                                            >
                                                <LogOut />
                                                Log out
                                            </DropdownMenuItem>
                                        </DialogTrigger>
                                        {/* <DialogContent className="sm:max-w-[425px]"> */}
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Logout</DialogTitle>
                                                <DialogDescription>
                                                    You’ll be signed out from your account on this device only.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter className="mt-2">
                                                <DialogClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DialogClose>
                                                <Button
                                                    disabled={isPending}
                                                    onClick={handleLogout}
                                                    type="button"
                                                    variant={"destructive"}
                                                >
                                                    Log out
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </>
    );
}
