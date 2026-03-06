import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { ChatCard } from "./chat-card";
import { ChatCardSkeleton } from "./chat-card-skeleton";
import { EmptyChat } from "./empty-chat";
import { useGetUserData } from "../api/query";
import { useGetChatList } from "./chat/api/query";


export default function RecentMessagesCard() {
    const { data: user, isPending: isUserPending, isError: isUserError } = useGetUserData();

    let chatListParams: any = {
        limit: 20,
    };

    if (user?.data?.role === "RECRUITER") {
        chatListParams.companyId = user.data.companyId;
    }

    const { data, isPending, isError, error } = useGetChatList(chatListParams, {
        enabled: !!user && !isUserPending && !isUserError,
    });

    if (isPending) {
        return (
            <Card className="gap-6">
                <CardHeader className=" flex flex-row items-center justify-between">
                    <CardTitle className=" md:text-xl">Recent Messages</CardTitle>
                    <Button variant={"ghost"}>View All</Button>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 px-4">
                    <ChatCardSkeleton />
                    <ChatCardSkeleton />
                    <ChatCardSkeleton />
                    <ChatCardSkeleton />
                </CardContent>
            </Card>
        );
    }

    if (error?.status === 404 || error?.status === 400) {
        return (
            <Card className="gap-6">
                <CardHeader className=" flex flex-row items-center justify-between">
                    <CardTitle className=" md:text-xl">Recent Messages</CardTitle>
                    <Button variant={"ghost"}>View All</Button>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 px-4">
                    <EmptyChat />
                </CardContent>
            </Card>
        );
    }

    const chatListPage = data?.pages.flatMap((page) => page.data?.chatList) ?? [];

    return (
        <Card className="gap-6">
            <CardHeader className=" flex flex-row items-center justify-between">
                <CardTitle className=" md:text-xl">Recent Messages</CardTitle>
                <Button variant={"ghost"}>View All</Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 px-4">
                {/* <CardContent className="flex-1 gap-4 px-4"> */}

                {/* isEmpty ? 'flex-1' : 'flex flex-col' =>comman:  gap-4 px-4 */}

                {chatListPage.slice(0, 4).map((chat) => (
                    <ChatCard key={chat?.id} chatData={chat!} />
                ))}
            </CardContent>
        </Card>
    );
}
