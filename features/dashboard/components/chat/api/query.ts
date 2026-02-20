import { QUERY } from "@/constants/tanstank.constants";
import { ApiError, ApiPageResponse } from "@/types/api";
import { InfiniteData, useInfiniteQuery, UseInfiniteQueryOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
    chatListResponse,
    getChatForCandidate,
    getChatForRecruiter,
    getChatListForCandidate,
    getChatListForRecruiter,
} from "./api";

export const useGetChatListForCandidate = (
    role: string,
    // page: number,
    limit: number,
    options?: UseInfiniteQueryOptions<
        ApiPageResponse<chatListResponse[]>,
        AxiosError<ApiError>,
        InfiniteData<ApiPageResponse<chatListResponse[]>>,
        [string, number],
        number
    >,
) => {
    return useInfiniteQuery({
        queryKey: [QUERY.CHAT.getChatListForCandidate, limit],
        queryFn: ({ signal, pageParam }) => getChatListForCandidate({ signal, page: pageParam, limit }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = Number(lastPage.pagination.currentPage);
            const totalPages = Number(lastPage.pagination.totalPages);

            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        enabled: role === "CANDIDATE",
        ...options,
    });
};

export const useGetChatListForRecruiter = (
    role: string,
    // page: number,
    limit: number,
    companyId: number,
    options?: UseInfiniteQueryOptions<
        ApiPageResponse<chatListResponse[]>,
        AxiosError<ApiError>,
        InfiniteData<ApiPageResponse<chatListResponse[]>>,
        [string, { limit: number; companyId: number }],
        number
    >,
) => {
    return useInfiniteQuery({
        queryKey: [QUERY.CHAT.getChatListForRecruiter, { limit, companyId }],
        queryFn: ({ signal, pageParam }) => getChatListForRecruiter({ signal, page: pageParam, limit, companyId }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = Number(lastPage.pagination.currentPage);
            const totalPages = Number(lastPage.pagination.totalPages);

            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        enabled: role === "RECRUITER" && !!companyId,
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
