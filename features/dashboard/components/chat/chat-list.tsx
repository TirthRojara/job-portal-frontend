"use client";
import React from "react";
import ChatListCard from "./chat-list-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetChatListForRecruiter } from "./api/query";
import { useAppSelector } from "@/store/index.store";
import { useGetUserData } from "../../api/query";
import { Spinner } from "@/components/ui/spinner";
import { ActiveChat } from "./chat-page-recruiter";

// const chatData: ActiveChat = {
//     candidateProfileId: 20,
//     companyId: 26,
//     chatRoomId: "chat_26_20",
//     messages: [{ content: "hi", senderId: 5, createdAt: "2026-01-17T16:40:05.000Z" }],
//     candidateProfile: {
//         fullName: 'Tom holand'
//     }
// };

// type ChatListProps = {
// onSelectChat: (value: ActiveChat | null) => void;
// export default function ChatList({ onSelectChat }: ChatListProps) {

export default function ChatList() {
    const role = useAppSelector((state) => state.app.role);

    const { data: user, isPending, isError } = useGetUserData();

    const {
        data: chatList,
        isPending: isChatListPending,
        isError: isChatListError,
        error: chatListError,
    } = useGetChatListForRecruiter(role, user?.data?.companyId!);

    if (isChatListPending) {
        return (
            <div className="flex-1 ">
                <ScrollArea className="h-full md:h-[calc(100vh-73px)] w-full rounded-md border  scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                    <div className="md:max-w-sm max-w-5xl min-w-sm w-full flex flex-col gap-1 h-[calc(100vh-73px)] justify-center items-center text-xl ">
                        <Spinner className="size-8" />
                    </div>
                </ScrollArea>
            </div>
        );
    }

    if (chatListError?.status === 404) {
        return (
            <div className="flex-1 ">
                <ScrollArea className="h-full md:h-[calc(100vh-73px)] w-full rounded-md border  scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                    {/* <div className="md:max-w-sm max-w-5xl min-w-sm w-full flex flex-col gap-1 h-[calc(100vh-73px)]  "> */}
                    <div className="md:max-w-sm max-w-5xl min-w-sm w-full flex flex-col gap-1 h-[calc(100vh-73px)] justify-center items-center text-xl ">
                        <p>You don't have any chats yet.</p>
                    </div>
                </ScrollArea>
            </div>
        );
    }

    return (
        <div className="flex-1 ">
            <ScrollArea className="h-full md:h-[calc(100vh-73px)] w-full rounded-md border  scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                <div className="md:max-w-sm max-w-5xl min-w-sm w-full flex flex-col gap-1 h-[calc(100vh-73px)]  ">
                    {chatList?.data?.map((chat) => (
                        <ChatListCard key={chat.chatRoomId} chatData={chat} />
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
