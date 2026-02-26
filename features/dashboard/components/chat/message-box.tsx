"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React, { useEffect } from "react";
import Messages from "./messages";
import { ScrollArea } from "@/components/ui/scroll-area";
import TypeBar from "./type-bar";
import { useAppSelector } from "@/store/index.store";
import { useSocket } from "@/provider/socket/socket.context";
import { useParams } from "next/navigation";

import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { getInitials } from "@/lib/utils/utils";
import { ApiResponse } from "@/types/api";
import { Chat, ChatListResponse, CreateNewMessageResponse, markAsReadResponse, MessageResponse } from "./api/types";
import { QUERY } from "@/constants/tanstank.constants";
import { useCreateChat } from "./api/query";
import { EmptyState } from "@/components/empty-state";
import { useGetUserData } from "../../api/query";

// export default function MessageBox({ chat }: { chat: ActiveChat }) {
export default function MessageBox() {
    console.log("MESSAGE BOX ‼️‼️‼️‼️‼️");

    const params = useParams();
    const chatRoomId = params.chatroomId as string;

    const socket = useSocket();
    const queryClient = useQueryClient();

    const role = useAppSelector((state) => state.app.role);
    const token = useAppSelector((state) => state.app.accessToken);
    const activeChat = useAppSelector((state) => state.app.activeChat);

    const [_, companyIdStr, candidateIdStr, chatId] = chatRoomId.split("_");

    const companyId = Number(companyIdStr);
    const candidateProfileId = Number(candidateIdStr);

    // queryClient.invalidateQueries({ queryKey: [QUERY.CHAT.getMessages, Number(chatId)] });

    const { data: user, isPending: isUserPending, isError: isUserError } = useGetUserData();

    const { data, isPending, isSuccess, isError } = useCreateChat(companyId, candidateProfileId);
    // console.log('create chat', data)

    useEffect(() => {
        if (!chatId) return;

        queryClient.invalidateQueries({
            queryKey: [QUERY.CHAT.getMessages, Number(chatId)],
        });
    }, [chatId]);

    useEffect(() => {
        if (!socket) return;

        // 🔵 Join room
        socket.emit("joinChat", { token, companyId, candidateProfileId });
    }, [socket, companyId, candidateProfileId, chatRoomId]);

    const name = role === "CANDIDATE" ? activeChat?.company.name : activeChat?.candidateProfile.fullName;

    if (isPending || isUserPending) return <></>;
    if (isError || isUserError) return <EmptyState title="Something went wrong!" />;

    // console.log('chat id :',data.data?.id)

    return (
        <div className="flex flex-col h-[calc(100vh-73px)] w-full overflow-hidden">
            {/* top-bar */}
            <div className="bg-white dark:bg-card w-full p-3 shadow-2xl flex-none z-10">
                <div className="flex items-center gap-3   ">
                    <Avatar className=" md:size-15 size-12 ">
                        <AvatarFallback className="bg-blue-400 text-white md:text-2xl text-lg font-semibold">
                            {getInitials(name || "")}
                            {/* TR */}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                        <p className="md:text-2xl text-lg  font-semibold">
                            {name}
                            {/* Tirth Rojara */}
                        </p>
                    </div>
                </div>
            </div>

            {/* messages */}
            <div className="flex-1 min-h-0 ">
                <ScrollArea className=" h-full w-full rounded-md border-0  scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                    <Messages />
                </ScrollArea>
            </div>

            {/* typing bar */}
            <div className="flex-none ">
                <TypeBar chatId={data.data?.id!} user={user.data!} />
            </div>
        </div>
    );
}
