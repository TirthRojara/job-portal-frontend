"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useRef } from "react";
import { useGetUserData } from "../../api/query";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/empty-state";
import { useGetMessages } from "./api/query";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/store/index.store";
import { CreateChatResponse } from "./api/types";
import { useParams } from "next/navigation";

const userId = "1";
// const currentUserId = "candidate_456";
// const demoMessages = [] as any
// const demoMessages = [
//     {
//         content:
//             "Hey William! Thanks for applying to our Software Engineer position. I've reviewed your profile and would love to discuss further.",
//         senderId: "company_123",
//         createdAt: "2026-01-14T16:30:00.000Z",
//     },
//     {
//         content: "Hi! Thanks for reaching out. I'm excited about this opportunity. When would you like to schedule a call?",
//         senderId: "candidate_456",
//         createdAt: "2026-01-14T16:32:15.000Z",
//     },
//     {
//         content:
//             "Great! Are you available tomorrow at 2 PM IST or 4 PM IST? Also, could you share your experience with Node.js and React?",
//         senderId: "company_123",
//         createdAt: "2026-01-14T16:33:22.000Z",
//     },
//     {
//         content:
//             "Tomorrow at 4 PM works perfectly! I have 3+ years with Node.js/Express and 2 years with React/TypeScript. I've built production job portals with real-time features using Socket.io and Redis.",
//         senderId: "candidate_456",
//         createdAt: "2026-01-15T16:35:10.000Z",
//     },
//     {
//         content:
//             "Perfect! I've added you to my calendar. Here's the Zoom link: https://zoom.us/j/123456789\n\nOne quick question - are you comfortable with microservices architecture?",
//         senderId: "company_123",
//         createdAt: "2026-01-15T16:36:45.000Z",
//     },
//     {
//         content:
//             "Yes, I've worked with Docker containerization and am learning Kubernetes. Also experienced with Prisma/PostgreSQL and payment integrations like Razorpay.",
//         senderId: "candidate_456",
//         createdAt: "2026-01-16T16:38:02.000Z",
//     },
//     {
//         content: "Excellent! Looking forward to our chat tomorrow. I'll review your full profile before then.",
//         senderId: "company_123",
//         createdAt: "2026-01-16T16:39:18.000Z",
//     },
//     {
//         content: "Thanks! See you tomorrow 😊",
//         senderId: "candidate_456",
//         createdAt: "2026-01-17T16:40:05.000Z",
//     },
// ];

// 1. Helper to format time (e.g., "4:30 PM")
const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// 2. Helper to group dates (Today, Yesterday, or Full Date)
const getMessageDateLabel = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if same day as today
    if (date.toDateString() === now.toDateString()) {
        return "Today";
    }
    // Check if same day as yesterday
    if (date.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
    }
    // Otherwise return full date
    return date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

// export default function Messages({ chat }: { chat: ActiveChat }) {
export default function Messages() {
    const params = useParams();
    const chatRoomId = params.chatroomId as string;

    const scrollRef = useRef<HTMLDivElement>(null);

    const [_, companyIdStr, candidateIdStr, chatId] = chatRoomId.split("_");

    // const chatId = useAppSelector((state) => state.app.activeChat?.id);

    const { data: user } = useGetUserData();
    const currentUserId = user?.data?.id;
    // console.log({ currentUserId });

    const { data, isPending, isError, error, isEnabled, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetMessages(
        Number(chatId),
        20,
    );

    // console.log("query data \n", data);

    //=========================================

    // const messages = activeData?.data?.messages ?? [];

    const chatItems = useMemo(() => {
        if (!data?.pages) return [];

        // 🔹 1️⃣ Flatten all pages
        // const allMessages = data.pages.flatMap((page) => page.data?.messages);
        const allMessages = data.pages.flatMap((page) => page.data?.messages ?? []);

        if (!allMessages.length) return [];

        // 🔹 2️⃣ Sort ascending (safety)
        const sortedMessages = [...allMessages].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

        const items: any[] = [];
        let lastDateKey = "";

        // 🔥 Find first unread message from OTHER user
        const firstUnreadIndex = sortedMessages.findIndex((msg) => !msg.isRead && msg.senderId !== currentUserId);

        sortedMessages.forEach((msg, index) => {
            const dateKey = new Date(msg.createdAt).toDateString();

            // Date separator
            if (dateKey !== lastDateKey) {
                items.push({
                    type: "date",
                    dateKey,
                });
                lastDateKey = dateKey;
            }

            // Unread separator
            if (index === firstUnreadIndex) {
                items.push({
                    type: "unread",
                });
            }

            items.push({
                type: "message",
                message: msg,
            });
        });

        return items;
    }, [data, currentUserId]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [data]);

    if (chatId === undefined) {
        return (
            <div className="flex items-center justify-center h-full text-muted-foreground">
                <p className="mt-3"> Start a conversation </p>
            </div>
        );
    }

    if (isPending) {
        return (
            <div className="flex justify-center items-center h-full text-muted-foreground">
                <Spinner className="size-8 mt-50" />
            </div>
        );
    }

    if (isError) {
        return <EmptyState title="Something went wrong!" />;
    }

    const allMessages = data.pages.flatMap((page) => page.data?.messages);

    // console.log("all messages \n", allMessages);

    if (allMessages.length === 0 || chatId === undefined) {
        return (
            <div className="flex items-center justify-center h-full text-muted-foreground">
                <p className="mt-3"> Start a conversation </p>
            </div>
        );
    }

    // Auto-scroll to bottom on new message
    // useEffect(() => {
    //     if (scrollRef.current) {
    //         scrollRef.current.scrollIntoView({ behavior: "smooth" });
    //     }
    // }, [demoMessages]);

    return (
        <div className="flex-1 p-5 space-y-4 ">
            {chatItems.map((item, index) => {
                // 🔹 DATE LABEL (same UI)
                if (item.type === "date") {
                    return (
                        <div key={`date-${index}`} className="space-y-4">
                            <div className="flex justify-center my-6">
                                <div className="bg-muted/50 px-4 py-1 rounded-full text-xs text-muted-foreground backdrop-blur-sm">
                                    {getMessageDateLabel(item.dateKey)}
                                </div>
                            </div>
                        </div>
                    );
                }

                // 🔹 UNREAD LABEL (same structure, small style tweak)
                if (item.type === "unread") {
                    return (
                        <div key="unread-divider" className="flex justify-center my-6">
                            <div className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-xs backdrop-blur-sm">
                                Unread Messages
                            </div>
                        </div>
                    );
                }

                const msg = item.message;

                return (
                    <div
                        key={msg.id}
                        className={cn("flex", {
                            "justify-end": currentUserId === msg.senderId,
                            "justify-start": currentUserId !== msg.senderId,
                        })}
                    >
                        <div
                            className={cn("group max-w-[70%] px-4 py-2.5 rounded-2xl shadow-sm border flex flex-col", {
                                "bg-primary text-white ml-4 rounded-br-sm": currentUserId === msg.senderId,
                                "bg-gray-100 dark:bg-card border-gray-200 dark:border-none mr-4 rounded-bl-sm":
                                    currentUserId !== msg.senderId,
                            })}
                        >
                            <p className="text-sm leading-relaxed break-words">{msg.content}</p>
                            <p
                                className={cn("text-xs mt-1 flex items-center gap-1 opacity-75", {
                                    "text-white/90": currentUserId === msg.senderId,
                                    "text-gray-500 dark:text-white/50": currentUserId !== msg.senderId,
                                })}
                            >
                                {formatTime(msg.createdAt)}
                            </p>
                        </div>
                    </div>
                );
            })}

            <div ref={scrollRef} />
        </div>
    );
}
