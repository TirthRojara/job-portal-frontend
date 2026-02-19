import api from "@/lib/axios/client";
import { ApiPageResponse, ApiResponse } from "@/types/api";

export type chatListResponse = {
    candidateProfileId: number;
    companyId: number;
    chatRoomId: string;
    messages: {
        content: string;
        senderId: number;
        createdAt: string;
    }[];
    candidateProfile: {
        fullName: string;
    };
};

export const getChatListForCandidate = async ({
    signal,
    page,
    limit,
}: {
    signal?: AbortSignal;
    page: number;
    limit: number;
}): Promise<ApiPageResponse<chatListResponse[]>> => {
    const res = await api.get("v1/chat/chatListForCandidate", {
        signal,
        params: { page, limit },
    });
    return res.data;
};

export const getChatListForRecruiter = async ({
    signal,
    page,
    limit,
    companyId,
}: {
    signal?: AbortSignal;
    page: number;
    limit: number;
    companyId: number;
}): Promise<ApiPageResponse<chatListResponse[]>> => {
    const res = await api.get(`v1/chat/chatListForRecruiter/${companyId}`, {
        signal,
        params: { page, limit },
    });
    return res.data;
};

export const getChatForCandidate = async ({
    signal,
    chatRoomId,
}: {
    signal?: AbortSignal;
    chatRoomId: string;
}): Promise<ApiPageResponse<any>> => {
    const res = await api.get(`v1/chat/chatForCandidate/${chatRoomId}`, {
        signal,
    });
    return res.data;
};

export const getChatForRecruiter = async ({
    signal,
    companyId,
    chatRoomId,
}: {
    signal?: AbortSignal;
    companyId: number;
    chatRoomId: string;
}): Promise<ApiPageResponse<any>> => {
    const res = await api.get(`v1/chat/chatForRECRUITER/${companyId}/${chatRoomId}`, {
        signal,
    });
    return res.data;
};
