"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

// const userId = '1'
const currentUserId = "candidate_456";
const demoMessages = [
    {
        content:
            "Hey William! Thanks for applying to our Software Engineer position. I've reviewed your profile and would love to discuss further.",
        senderId: "company_123",
        createdAt: "2026-01-14T16:30:00.000Z",
    },
    {
        content:
            "Hi! Thanks for reaching out. I'm excited about this opportunity. When would you like to schedule a call?",
        senderId: "candidate_456",
        createdAt: "2026-01-14T16:32:15.000Z",
    },
    {
        content:
            "Great! Are you available tomorrow at 2 PM IST or 4 PM IST? Also, could you share your experience with Node.js and React?",
        senderId: "company_123",
        createdAt: "2026-01-14T16:33:22.000Z",
    },
    {
        content:
            "Tomorrow at 4 PM works perfectly! I have 3+ years with Node.js/Express and 2 years with React/TypeScript. I've built production job portals with real-time features using Socket.io and Redis.",
        senderId: "candidate_456",
        createdAt: "2026-01-15T16:35:10.000Z",
    },
    {
        content:
            "Perfect! I've added you to my calendar. Here's the Zoom link: https://zoom.us/j/123456789\n\nOne quick question - are you comfortable with microservices architecture?",
        senderId: "company_123",
        createdAt: "2026-01-15T16:36:45.000Z",
    },
    {
        content:
            "Yes, I've worked with Docker containerization and am learning Kubernetes. Also experienced with Prisma/PostgreSQL and payment integrations like Razorpay.",
        senderId: "candidate_456",
        createdAt: "2026-01-16T16:38:02.000Z",
    },
    {
        content:
            "Excellent! Looking forward to our chat tomorrow. I'll review your full profile before then.",
        senderId: "company_123",
        createdAt: "2026-01-16T16:39:18.000Z",
    },
    {
        content: "Thanks! See you tomorrow 😊",
        senderId: "candidate_456",
        createdAt: "2026-01-17T16:40:05.000Z",
    },
];

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

// <div>
// {demoMessages.map((msg) => (
//     <p key={msg.createdAt} className={`${currentUserId === msg.senderId ? 'bg-green-300 justify-end ' : 'bg-amber-50 '} max-w-[80%] w-fit flex border border-red-500 p-1.5`}>{msg.content}</p>
// ))}

// </div>

export default function Messages() {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Group messages by date
    const groupedMessages = React.useMemo(() => {
        const groups: { dateKey: string; messages: typeof demoMessages }[] = [];
        const messagesByDate: Record<string, typeof demoMessages> = {};

        demoMessages.forEach((msg) => {
            const dateKey = new Date(msg.createdAt).toDateString();
            if (!messagesByDate[dateKey]) {
                messagesByDate[dateKey] = [];
            }
            messagesByDate[dateKey].push(msg);
        });

        Object.entries(messagesByDate).forEach(([dateKey, messages]) => {
            groups.push({ dateKey, messages });
        });

        return groups;
    }, []);

    // Auto-scroll to bottom on new message
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [demoMessages]);

    return (
        <div className="flex-1 p-5 space-y-4 ">
            {/* {demoMessages.map((msg) => (
                <div
                    key={msg.createdAt}
                    className={`flex ${
                        currentUserId === msg.senderId
                            ? "justify-end"
                            : "justify-start"
                    }`}
                >
                    <div
                        className={`
        max-w-[70%] px-4 py-2 rounded-2xl shadow-sm border 
        ${
            currentUserId === msg.senderId
                ? "bg-primary text-white rounded-br-sm ml-4"
                : "bg-gray-100 rounded-bl-sm mr-4"
        }
      `}
                    >
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                        <p
                            className={`text-xs mt-1 ${
                                currentUserId === msg.senderId
                                    ? "text-white/80"
                                    : "text-gray-500"
                            }`}
                        >
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                    </div>
                </div>
            ))} */}

            {groupedMessages.map(({ dateKey, messages }) => (
                <div key={dateKey} className="space-y-4">
                    {/* Date Separator */}
                    <div className="flex justify-center my-6">
                        <div className="bg-muted/50 px-4 py-1 rounded-full text-xs text-muted-foreground backdrop-blur-sm">
                            {getMessageDateLabel(dateKey)}
                        </div>
                    </div>

                    {/* Messages for this date */}
                    {messages.map((msg) => (
                        <div
                            key={msg.createdAt}
                            className={cn("flex", {
                                "justify-end": currentUserId === msg.senderId,
                                "justify-start": currentUserId !== msg.senderId,
                            })}
                        >
                            <div
                                className={cn(
                                    "group max-w-[70%] px-4 py-2.5 rounded-2xl shadow-sm border flex flex-col",
                                    {
                                        "bg-primary text-white ml-4 rounded-br-sm":
                                            currentUserId === msg.senderId,
                                        "bg-gray-100 border-gray-200 mr-4 rounded-bl-sm":
                                            currentUserId !== msg.senderId,
                                    }
                                )}
                            >
                                <p className="text-sm leading-relaxed break-words">
                                    {msg.content}
                                </p>
                                <p
                                    className={cn(
                                        "text-xs mt-1 flex items-center gap-1 opacity-75",
                                        {
                                            "text-white/90":
                                                currentUserId === msg.senderId,
                                            "text-gray-500":
                                                currentUserId !== msg.senderId,
                                        }
                                    )}
                                >
                                    {formatTime(msg.createdAt)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <div ref={scrollRef} />
        </div>
    );
}
