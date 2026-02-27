import api from "@/lib/axios/client";
import { ApiPageResponse, ApiResponse } from "@/types/api";
import { ChatListParams, ChatListResponse, CreateChatResponse, MessageCursor, MessageParams, MessageResponse } from "./types";
import { number, string } from "zod";

// export type chatListResponse = {
//     candidateProfileId: number;
//     companyId: number;
//     chatRoomId: string;
//     messages: {
//         content: string;
//         senderId: number;
//         createdAt: string;
//     }[];
//     candidateProfile: {
//         fullName: string;
//     };
// };

// export const getChatListForCandidate = async ({
//     signal,
//     page,
//     limit,
// }: {
//     signal?: AbortSignal;
//     page: number;
//     limit: number;
// }): Promise<ApiPageResponse<chatListResponse[]>> => {
//     const res = await api.get("v1/chat/chatListForCandidate", {
//         signal,
//         params: { page, limit },
//     });
//     return res.data;
// };

// export const getChatListForRecruiter = async ({
//     signal,
//     page,
//     limit,
//     companyId,
// }: {
//     signal?: AbortSignal;
//     page: number;
//     limit: number;
//     companyId: number;
// }): Promise<ApiPageResponse<chatListResponse[]>> => {
//     const res = await api.get(`v1/chat/chatListForRecruiter/${companyId}`, {
//         signal,
//         params: { page, limit },
//     });
//     return res.data;
// };

// export const getChatForCandidate = async ({
//     signal,
//     chatRoomId,
// }: {
//     signal?: AbortSignal;
//     chatRoomId: string;
// }): Promise<ApiPageResponse<chatListResponse>> => {
//     const res = await api.get(`v1/chat/chatForCandidate/${chatRoomId}`, {
//         signal,
//     });
//     return res.data;
// };

// export const getChatForRecruiter = async ({
//     signal,
//     companyId,
//     chatRoomId,
// }: {
//     signal?: AbortSignal;
//     companyId: number;
//     chatRoomId: string;
// }): Promise<ApiPageResponse<chatListResponse>> => {
//     const res = await api.get(`v1/chat/chatForRECRUITER/${companyId}/${chatRoomId}`, {
//         signal,
//     });
//     return res.data;
// };

export const getChatList = async ({
    signal,
    params,
}: {
    signal?: AbortSignal;
    params: ChatListParams;
}): Promise<ApiResponse<ChatListResponse>> => {
    const res = await api.get("v1/chat/chatList", {
        signal,
        params,
    });
    return res.data;
};

export const getMessages = async ({
    signal,
    chatId,
    limit,
    cursor,
}: {
    signal?: AbortSignal;
    chatId: number;
    limit: number;
    cursor?: MessageCursor | null;
}): Promise<ApiResponse<MessageResponse>> => {
    const res = await api.get(`v1/chat/message/${chatId}`, {
        signal,
        // params: { limit, cursor },
        params: {
            limit,
            ...(cursor && {
                messageId: cursor.id,
                messageCreatedAt: cursor.createdAt,
            }),
        },
    });
    return res.data;
};

export const createChat = async ({
    signal,
    companyId,
    candidateProfileId,
}: {
    signal?: AbortSignal;
    companyId: number;
    candidateProfileId: number;
}): Promise<ApiResponse<CreateChatResponse>> => {
    const res = await api.get(`v1/chat/createChat/${companyId}/${candidateProfileId}`, {
        signal,
    });
    return res.data;
};
