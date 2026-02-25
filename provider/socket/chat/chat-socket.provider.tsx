"use client";
import { useEffect } from "react";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { useSocket } from "../socket.context";
import { QUERY } from "@/constants/tanstank.constants";
import {
    ChatListResponse,
    CreateNewMessageResponse,
    markAsReadResponse,
    MessageResponse,
} from "@/features/dashboard/components/chat/api/types";
import { ApiResponse } from "@/types/api";

export const ChatSocketLayer = ({ children }: { children: React.ReactNode }) => {
    const socket = useSocket();
    const queryClient = useQueryClient();

    const chatListQueryKey = [QUERY.CHAT.getChatList];

    useEffect(() => {
        console.log("Socket changed:", socket);
    }, [socket]);

    // --------------------------------------------
    // Set query data when new messages receive
    // --------------------------------------------

    useEffect(() => {
        if (!socket) return;

         console.log("🟢 Listener attaching");

        // 🔵 Listen for new message
        const handleNewMessage = (newMessage: CreateNewMessageResponse) => {
            console.log("newMessage from sender \n", newMessage);

            const activeChatQueryKey = [QUERY.CHAT.getMessages, newMessage.newChat.id];

            queryClient.setQueryData(activeChatQueryKey, (oldData: InfiniteData<ApiResponse<MessageResponse>> | undefined) => {
                console.log("update chat key");
                if (!oldData) return oldData;

                const updatedPages = oldData.pages.map((page, index) => {
                    if (!page.data) return page;

                    if (index === 0) {
                        return {
                            ...page,
                            data: {
                                ...page.data,
                                messages: [
                                    ...page.data.messages,
                                    newMessage.newMessage, // 👈 append new message
                                ],
                            },
                        };
                    }

                    console.log("updated chat key end");

                    return page;
                });

                return {
                    ...oldData,
                    pages: updatedPages,
                };
            });

            queryClient.setQueryData(chatListQueryKey, (oldData: InfiniteData<ApiResponse<ChatListResponse>> | undefined) => {
                console.log("update chat list");
                if (!oldData) return oldData;

                const updatedPages = oldData.pages.map((page, index) => {
                    if (!page.data) return page; // 🔥 important

                    if (index !== 0) return page;

                    const chats = page.data.chatList ?? [];

                    const existingIndex = chats.findIndex((chat) => chat.id === newMessage.newChat.id);

                    let updatedChats;

                    if (existingIndex !== -1) {
                        const updatedChat = {
                            ...chats[existingIndex],
                            lastMessage: newMessage.newMessage.content,
                            lastMessageAt: newMessage.newMessage.createdAt,
                        };

                        updatedChats = [updatedChat, ...chats.filter((chat) => chat.id !== newMessage.newChat.id)];
                    } else {
                        updatedChats = [
                            {
                                ...newMessage.newChat,
                                lastMessage: newMessage.newMessage.content,
                                lastMessageAt: newMessage.newMessage.createdAt,
                            },
                            ...chats,
                        ];
                    }

                    console.log("updated chat list end");
                    return {
                        ...page,
                        data: {
                            ...page.data,
                            chatList: updatedChats, // ✅ correct property
                        },
                    };
                });

                return {
                    ...oldData,
                    pages: updatedPages,
                };
            });
        };

        socket.on("newMessage", (newMsg) => {
            console.log("🔥 SOCKET EVENT RECEIVED:", newMsg);
            handleNewMessage(newMsg);
        });

        socket.on("error", (error) => {
            alert("Socket error: " + error);
        });

        return () => {
            // 🔴 Leave room
             console.log("🔴 Listener removed");
            socket.off("newMessage", handleNewMessage);
            socket.off("error", (error) => {
                alert("Socket error: " + error);
            });
        };
    }, [socket, queryClient]);

    // --------------------------------------------
    // Set query data when receive see messages
    // --------------------------------------------

    useEffect(() => {
        if (!socket) return;

        const handleMarkAsRead = (updatedChat: markAsReadResponse) => {
            console.log("Received markAsRead event", updatedChat);

            const markAsReadChatQueryKey = [QUERY.CHAT.getMessages, updatedChat.id];
            console.log({ markAsReadChatQueryKey });

            // update react-query cache here
            queryClient.setQueryData(chatListQueryKey, (oldData: InfiniteData<ApiResponse<ChatListResponse>>) => {
                console.log("update chat list on mark as read");

                if (!oldData) return oldData;

                return {
                    ...oldData,
                    pages: oldData.pages.map((page) => {
                        // guard because data is optional in ApiResponse
                        if (!page.data) return page;

                        console.log("on mark as read chat list query update");

                        return {
                            ...page,
                            data: {
                                ...page.data,
                                chatList: page.data.chatList.map((chat) =>
                                    chat.id === updatedChat.id
                                        ? {
                                              ...chat,
                                              companyUnreadCount: updatedChat.companyUnreadCount,
                                              candidateUnreadCount: updatedChat.candidateUnreadCount,
                                          }
                                        : chat,
                                ),
                            },
                        };
                    }),
                };
            });

            queryClient.setQueryData(
                markAsReadChatQueryKey,
                (oldData: InfiniteData<ApiResponse<MessageResponse>> | undefined) => {
                    if (!oldData) return oldData;

                    console.log("on mark as read chat messagess query update");

                    return {
                        ...oldData,
                        pages: oldData.pages.map((page) => {
                            if (!page.data) return page;

                            return {
                                ...page,
                                data: {
                                    ...page.data,
                                    messages: page.data.messages.map((msg) =>
                                        msg.senderId === updatedChat.senderId && msg.isRead === false
                                            ? { ...msg, isRead: true }
                                            : msg,
                                    ),
                                },
                            };
                        }),
                    };
                },
            );
        };

        socket.on("markAsRead", handleMarkAsRead);

        return () => {
            socket.off("markAsRead", handleMarkAsRead);
        };
    }, [socket, queryClient]);

    return <>{children}</>;
};
