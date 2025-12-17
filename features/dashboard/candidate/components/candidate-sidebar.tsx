"use client";

import {
    BadgeCheck,
    Bell,
    BriefcaseBusiness,
    ChevronsUpDown,
    CreditCard,
    FileUser,
    GalleryVerticalEnd,
    LayoutDashboard,
    LogOut,
    MessageSquareMore,
    Sparkles,
    User,
    UserRound,
    Zap,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarRail,
    SidebarSeparator,
    useSidebar,
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const items = [
    {
        title: "Dashboard",
        url: "#",
        icon: LayoutDashboard,
    },
    {
        title: "Profile",
        url: "#",
        icon: User,
    },
    {
        title: "Job",
        url: "#",
        icon: BriefcaseBusiness,
    },
    {
        title: "Quick Apply",
        url: "#",
        icon: Zap,
    },
    {
        title: "Application",
        url: "#",
        icon: FileUser,
    },
    {
        title: "Message",
        url: "#",
        icon: MessageSquareMore,
    },
    {
        title: "Notification",
        url: "#",
        icon: Bell,
    },
];

const user = {
    name: "Tirth",
    email: "work.tirthrojara@gmail.com",
    avatar: "TR",
};

export function CandidateSidebar() {
    const { isMobile, state } = useSidebar();
    const isCollapsed = state === "collapsed";

    return (
        <Sidebar collapsible="icon">
            {/* header */}
            <SidebarHeader className="my-1">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
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
            <SidebarSeparator />

            {/* main */}
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
                                                ? " justify-center [&_.lucide]:h-5 [&_.lucide]:w-6" // icon centered
                                                : "justify-start gap-2 [&_.lucide]:h-5 [&_.lucide]:w-6"
                                        }
                                    >
                                        <a href={item.url} className="flex items-center gap-2">
                                            <item.icon className={isCollapsed ? 'pl-[5px]' : ''}/>
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

            {/* footer */}
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
                                    {/* <DropdownMenuItem>
                                        <Sparkles />
                                        Upgrade to Pro
                                    </DropdownMenuItem> */}
                                </DropdownMenuGroup>
                                {/* <DropdownMenuSeparator /> */}
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <BadgeCheck />
                                        Account
                                    </DropdownMenuItem>
                                    {/* <DropdownMenuItem>
                                        <CreditCard />
                                        Billing
                                    </DropdownMenuItem> */}
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger className=" text-destructive data-[highlighted]:bg-destructive/10 data-[highlighted]:text-destructive data-[state=open]:bg-destructive/10 data-[state=open]:text-destructive focus:bg-destructive/10 focus:text-destructive ">
                                        <LogOut />
                                        Log out
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem className=" text-destructive focus:text-destructive-foreground data-[highlighted]:bg-destructive/10 data-[highlighted]:text-destructive ">
                                                Log out on this device
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className=" text-destructive focus:text-destructive-foreground data-[highlighted]:bg-destructive/10 data-[highlighted]:text-destructive ">
                                                Log out everywhere
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            {/* <SidebarRail /> */}
        </Sidebar>
    );
}
