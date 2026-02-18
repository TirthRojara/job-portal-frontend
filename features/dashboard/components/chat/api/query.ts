import { QUERY } from "@/constants/tanstank.constants";
import { ApiError, ApiPageResponse } from "@/types/api";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getChatForCandidate, getChatForRecruiter, getChatListForCandidate, getChatListForRecruiter } from "./api";

export const useGetChatListForCandidate = (
    role: string,
    options?: UseQueryOptions<ApiPageResponse<any>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.CHAT.getChatListForCandidate],
        queryFn: ({ signal }) => getChatListForCandidate({ signal }),
        enabled: role === "CANDIDATE",
        ...options,
    });
};

export const useGetChatListForRecruiter = (
    role: string,
    companyId: number,
    options?: UseQueryOptions<ApiPageResponse<any>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.CHAT.getChatListForRecruiter],
        queryFn: ({ signal }) => getChatListForRecruiter({ signal, companyId }),
        enabled: role === "RECRUITER",
        ...options,
    });
};

export const useGetChatForCandidate = (
    role: string,
    chatRoomId: string,
    options?: UseQueryOptions<ApiPageResponse<any>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.CHAT.getChatForCandidate],
        queryFn: ({ signal }) => getChatForCandidate({ signal, chatRoomId }),
        enabled: role === "CANDIDATE",
        ...options,
    });
};

export const useGetChatForRecruiter = (
    role: string,
    companyId: number,
    chatRoomId: string,
    options?: UseQueryOptions<ApiPageResponse<any>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.CHAT.getChatForRecruiter],
        queryFn: ({ signal }) => getChatForRecruiter({ signal, companyId, chatRoomId }),
        enabled: role === "RECRUITER",
        ...options,
    });
};
