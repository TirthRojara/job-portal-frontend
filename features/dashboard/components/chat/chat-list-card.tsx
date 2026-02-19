"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import React from "react";
import { ActiveChat } from "./chat-page-recruiter";
import { useAppDispatch, useAppSelector } from "@/store/index.store";
import { appActions } from "@/store/app.slice";
import { useRouter } from "next/navigation";
import { getInitials } from "@/lib/utils/utils";

type ChatListCardProps = {
    chatData: ActiveChat;
    // onClickCard: (value: ActiveChat | null) => void;
};

// export default function ChatListCard({ onClickCard, chatData }: ChatListCardProps) {
// export default function ChatListCard() {
export default function ChatListCard({ chatData }: ChatListCardProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleOnClick = () => {
        dispatch(appActions.setActiveChat(chatData));
        router.push(`/dashboard/recruiter/chat/${chatData.chatRoomId}`);
    };

    const lastMessage = chatData.messages.at(-1);

    return (
        <Card
            onClick={handleOnClick}
            className="px-2 py-3 shadow-none border-none hover:bg-muted hover:border hover:shadow-sm rounded-none "
        >
            <div className="flex items-center gap-3   ">
                <Avatar>
                    <AvatarFallback>{getInitials(chatData.candidateProfile.fullName)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                    <p className="font-semibold">{chatData.candidateProfile.fullName}</p>
                    {lastMessage && (
                        <p className="text-muted-foreground truncate line-clamp-1 whitespace-normal">
                            {/* {chatData.messages[chatData.messages.length -1].content} */}
                            {lastMessage?.content}
                        </p>
                    )}
                </div>
            </div>
        </Card>
    );
}
