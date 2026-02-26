import { QUERY } from "@/constants/tanstank.constants";
import { ApiResponse } from "@/types/api";
import { InfiniteData, QueryClient } from "@tanstack/react-query";
import { ChatListResponse, MessageResponse } from "./types";

export function updateChatListWhenMarkAsReadEmit(queryClient: QueryClient, role: string, chatId: number) {
    const chatListQueryKey = [QUERY.CHAT.getChatList];

    queryClient.setQueryData(chatListQueryKey, (oldData: InfiniteData<ApiResponse<ChatListResponse>>) => {
        console.log("update chat list on mark as read");

        if (!oldData) return oldData;

        return {
            ...oldData,
            pages: oldData.pages.map((page) => {
                // guard because data is optional in ApiResponse
                if (!page.data) return page;

                return {
                    ...page,
                    data: {
                        ...page.data,
                        chatList: page.data.chatList.map((chat) => {
                            if (chat.id !== chatId) return chat;
                            return {
                                ...chat,
                                candidateUnreadCount: role === "CANDIDATE" ? 0 : chat.candidateUnreadCount,

                                companyUnreadCount: role === "RECRUITER" ? 0 : chat.companyUnreadCount,
                            };
                        }),
                    },
                };
            }),
        };
    });
}

export function updateIsReadTrueForUnreadLabel(queryClient: QueryClient, chatId: number, userId: number) {
    const markAsReadChatQueryKey = [QUERY.CHAT.getMessages, chatId];

    queryClient.setQueryData(markAsReadChatQueryKey, (oldData: InfiniteData<ApiResponse<MessageResponse>>) => {
        if (!oldData) return oldData;

        console.log("on messages send update the unread label 🏷️🏷️🏷️🏷️🏷️");

        const updatedData = {
            ...oldData,
            pages: oldData.pages.map((page) => {
                if (!page.data) return page;

                return {
                    ...page,
                    data: {
                        ...page.data,
                        messages: page.data.messages.map((msg) =>
                            msg.receiverId === userId && !msg.isRead ? { ...msg, isRead: true } : msg,
                        ),
                    },
                };
            }),
        };

        return updatedData;
    });
}
