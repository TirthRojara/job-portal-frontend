"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/index.store";
import { appActions } from "@/store/app.slice";
import { useParams, useRouter } from "next/navigation";
import { getInitials } from "@/lib/utils/utils";
import { ChatListItem } from "./api/types";
import { cn } from "@/lib/utils";

type ChatListCardProps = {
    chatData: ChatListItem;
    // onClickCard: (value: ActiveChat | null) => void;
};

// export default function ChatListCard({ onClickCard, chatData }: ChatListCardProps) {
// export default function ChatListCard() {
export default function ChatListCard({ chatData }: ChatListCardProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const params = useParams();
    const chatRoomIdUrl = params.chatroomId as string;

    const isActive = chatRoomIdUrl === `${chatData.chatRoomId}_${chatData.id}`;

    console.log({ isActive, chatRoomIdUrl });
    console.log("chat room id:", chatData.chatRoomId);

    const role = useAppSelector((state) => state.app.role);

    const handleOnClick = () => {
        dispatch(appActions.setActiveChat(chatData));
        if (role === "RECRUITER") {
            router.push(`/dashboard/recruiter/chat/${chatData.chatRoomId}_${chatData.id}`);
        }
        if (role === "CANDIDATE") {
            router.push(`/dashboard/candidate/chat/${chatData.chatRoomId}_${chatData.id}`);
        }
    };

    // const lastMessage = chatData.messages.at(-1);
    const lastMessage = chatData.lastMessage;

    return (
        <Card
            onClick={handleOnClick}
            // className=" px-2 py-3 shadow-none border-none hover:bg-muted hover:border hover:shadow-sm rounded-none "
            className={cn("px-2 py-3 shadow-none border-none rounded-none transition-colors", {
                // Active style (same as hover but permanent)
                "bg-muted border shadow-sm": isActive,

                // Normal hover only when NOT active
                "hover:bg-muted hover:border hover:shadow-sm": !isActive,
            })}
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
                            {chatData.lastMessage}
                        </p>
                    )}
                </div>
            </div>
        </Card>
    );
}
