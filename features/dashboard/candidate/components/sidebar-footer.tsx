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
import {
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";
import React from "react";
import { useLogout } from "../api/mutation";

const user = {
    name: "Tirth",
    email: "work.tirthrojara@gmail.com",
    avatar: "TR",
};

export default function CandidateSidebarFooter() {
    const { isMobile, state } = useSidebar();
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
                                        <AvatarFallback className="rounded-lg">
                                            TR
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">
                                            {user.name}
                                        </span>
                                        <span className="truncate text-xs">
                                            {user.email}
                                        </span>
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
                                                TR
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">
                                                {user.name}
                                            </span>
                                            <span className="truncate text-xs">
                                                {user.email}
                                            </span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <BadgeCheck />
                                        Account
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <DropdownMenuItem
                                                // prevent dropdown from closing and re‑triggering
                                                onSelect={(e) =>
                                                    e.preventDefault()
                                                }
                                                className=" text-destructive data-[highlighted]:bg-destructive/10 data-[highlighted]:text-destructive data-[state=open]:bg-destructive/10 data-[state=open]:text-destructive focus:bg-destructive/10 focus:text-destructive "
                                            >
                                                <LogOut />
                                                Log out
                                            </DropdownMenuItem>
                                        </DialogTrigger>
                                        {/* <DialogContent className="sm:max-w-[425px]"> */}
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Logout
                                                </DialogTitle>
                                                <DialogDescription>
                                                    {/* Are you sure you want to */}
                                                    {/* logout? */}
                                                    You’ll be signed out from
                                                    your account on this device
                                                    only.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter className="mt-2">
                                                <DialogClose asChild>
                                                    <Button variant="outline">
                                                        Cancel
                                                    </Button>
                                                </DialogClose>
                                                <Button
                                                    disabled={isPending}
                                                    type="button"
                                                    variant={"destructive"}
                                                    onClick={handleLogout}
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
