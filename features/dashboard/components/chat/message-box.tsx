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

    const { data: user, isPending: isUserPending, isError: isUserError } = useGetUserData();

    const { data, isPending, isSuccess, isError } = useCreateChat(companyId, candidateProfileId);
    // console.log('create chat', data)

    // const activeChatQueryKey = [QUERY.CHAT.getMessages, Number(chatId)];
    // const chatListQueryKey = [QUERY.CHAT.getChatList];

    // --------------------------------------------
    // Set query data when new messages receive
    // --------------------------------------------

    useEffect(() => {
        if (!socket) return;

        // 🔵 Join room
        socket.emit("joinChat", { token, companyId, candidateProfileId });
    }, [socket, companyId, candidateProfileId, chatRoomId]);

    // --------------------------------------------
    // Set query data when receive see messages
    // --------------------------------------------

    // useEffect(() => {
    //     if (!socket) return;

    //     const handleMarkAsRead = (updatedChat: markAsReadResponse) => {
    //         console.log("Received markAsRead event", updatedChat);

    //         const currentUserId = user?.data?.id;

    //         // If user still not loaded → do nothing
    //         if (!currentUserId) {
    //             console.warn("User not ready yet, skipping markAsRead");
    //             return;
    //         }

    //         const markAsReadChatQueryKey = [QUERY.CHAT.getMessages, updatedChat.id];
    //         console.log({ markAsReadChatQueryKey });

            // update react-query cache here
    //         queryClient.setQueryData(chatListQueryKey, (oldData: InfiniteData<ApiResponse<ChatListResponse>>) => {
    //             console.log("update chat list on mark as read");

    //             if (!oldData) return oldData;

    //             return {
    //                 ...oldData,
    //                 pages: oldData.pages.map((page) => {
    //                     // guard because data is optional in ApiResponse
    //                     if (!page.data) return page;

    //                     console.log("on mark as read chat list query update");

    //                     return {
    //                         ...page,
    //                         data: {
    //                             ...page.data,
    //                             chatList: page.data.chatList.map((chat) =>
    //                                 chat.id === updatedChat.id
    //                                     ? {
    //                                           ...chat,
    //                                           companyUnreadCount: updatedChat.companyUnreadCount,
    //                                           candidateUnreadCount: updatedChat.candidateUnreadCount,
    //                                       }
    //                                     : chat,
    //                             ),
    //                         },
    //                     };
    //                 }),
    //             };
    //         });

    //         queryClient.setQueryData(
    //             markAsReadChatQueryKey,
    //             (oldData: InfiniteData<ApiResponse<MessageResponse>> | undefined) => {
    //                 if (!oldData) return oldData;

    //                 console.log("on mark as read chat messagess query update");

    //                 return {
    //                     ...oldData,
    //                     pages: oldData.pages.map((page) => {
    //                         if (!page.data) return page;

    //                         return {
    //                             ...page,
    //                             data: {
    //                                 ...page.data,
    //                                 messages: page.data.messages.map((msg) =>
    //                                     msg.senderId === currentUserId && msg.isRead === false ? { ...msg, isRead: true } : msg,
    //                                 ),
    //                             },
    //                         };
    //                     }),
    //                 };
    //             },
    //         );
    //     };

    //     socket.on("markAsRead", handleMarkAsRead);

    //     return () => {
    //         socket.off("markAsRead", handleMarkAsRead);
    //     };
    // }, [socket, user]);

    const name = role === "CANDIDATE" ? activeChat?.company.name : activeChat?.candidateProfile.fullName;

    if (isPending) return <></>;
    if (isError) return <EmptyState title="Something went wrong!" />;

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
                <TypeBar chatId={data.data?.id!} />
            </div>
        </div>
    );
}
