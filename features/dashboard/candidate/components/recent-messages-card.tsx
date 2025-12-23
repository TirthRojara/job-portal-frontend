import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { ChatCard } from "../../components/chat-card";
import { ChatCardSkeleton } from "../../components/chat-card-skeleton";
import { EmptyChat } from "../../components/empty-chat";

const chat = {
    name: "Mike Chen",
    company: "StartupXYZ",
    role: "React Developer",
    message: "Thank you for your application. We'll be in touch...",
    timeAgo: "1 day ago",
};

export default function RecentMessagesCard() {
    return (
        <Card className="gap-6">
            <CardHeader className=" flex flex-row items-center justify-between">
                <CardTitle className=" md:text-xl">Recent Messages</CardTitle>
                <Button variant={"ghost"}>View All</Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 px-4">
                {/* <CardContent className="flex-1 gap-4 px-4"> */}

                {/* isEmpty ? 'flex-1' : 'flex flex-col' =>comman:  gap-4 px-4 */}

                <ChatCard chat={chat} />
                <ChatCard chat={chat} />
                <ChatCard chat={chat} />
                <ChatCard chat={chat} />

                {/* <ChatCardSkeleton /> */}
                {/* <ChatCardSkeleton /> */}
                {/* <ChatCardSkeleton /> */}
                {/* <ChatCardSkeleton /> */}

                {/* <EmptyChat /> */}
            </CardContent>
        </Card>
    );
}
