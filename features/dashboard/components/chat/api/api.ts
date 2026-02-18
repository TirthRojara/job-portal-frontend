import api from "@/lib/axios/client";
import { ApiPageResponse, ApiResponse } from "@/types/api";

export const getChatListForCandidate = async ({ signal }: { signal?: AbortSignal }): Promise<ApiPageResponse<any>> => {
    const res = await api.get("v1/chat/chatListForCandidate", {
        signal,
    });
    return res.data;
};

export const getChatListForRecruiter = async ({
    signal,
    companyId,
}: {
    signal?: AbortSignal;
    companyId: number;
}): Promise<ApiPageResponse<any>> => {
    const res = await api.get(`v1/chat/chatListForRecruiter/${companyId}`, {
        signal,
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
