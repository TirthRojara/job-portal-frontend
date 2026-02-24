import { QUERY } from "@/constants/tanstank.constants";
import { ApiError, ApiPageResponse, ApiResponse } from "@/types/api";
import { InfiniteData, useInfiniteQuery, UseInfiniteQueryOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ChatListCursor, ChatListParams, ChatListResponse, CreateChatResponse, MessageCursor, MessageResponse } from "./types";
import { createChat, getChatList, getMessages } from "./api";

// export const useGetChatListForCandidate = (
//     role: string,
//     // page: number,
//     limit: number,
//     options?: UseInfiniteQueryOptions<
//         ApiPageResponse<chatListResponse[]>,
//         AxiosError<ApiError>,
//         InfiniteData<ApiPageResponse<chatListResponse[]>>,
//         [string, number],
//         number
//     >,
// ) => {
//     return useInfiniteQuery({
//         queryKey: [QUERY.CHAT.getChatListForCandidate, limit],
//         queryFn: ({ signal, pageParam }) => getChatListForCandidate({ signal, page: pageParam, limit }),
//         initialPageParam: 1,
//         getNextPageParam: (lastPage, allPages) => {
//             const currentPage = Number(lastPage.pagination.currentPage);
//             const totalPages = Number(lastPage.pagination.totalPages);

//             return currentPage < totalPages ? currentPage + 1 : undefined;
//         },
//         enabled: role === "CANDIDATE",
//         ...options,
//     });
// };

// export const useGetChatListForRecruiter = (
//     role: string,
//     // page: number,
//     limit: number,
//     companyId: number,
//     options?: UseInfiniteQueryOptions<
//         ApiPageResponse<chatListResponse[]>,
//         AxiosError<ApiError>,
//         InfiniteData<ApiPageResponse<chatListResponse[]>>,
//         [string, { limit: number; companyId: number }],
//         number
//     >,
// ) => {
//     return useInfiniteQuery({
//         queryKey: [QUERY.CHAT.getChatListForRecruiter, { limit, companyId }],
//         queryFn: ({ signal, pageParam }) => getChatListForRecruiter({ signal, page: pageParam, limit, companyId }),
//         initialPageParam: 1,
//         getNextPageParam: (lastPage, allPages) => {
//             const currentPage = Number(lastPage.pagination.currentPage);
//             const totalPages = Number(lastPage.pagination.totalPages);

//             return currentPage < totalPages ? currentPage + 1 : undefined;
//         },
//         enabled: role === "RECRUITER" && !!companyId,
//         ...options,
//     });
// };

// export const useGetChatForCandidate = (
//     role: string,
//     chatRoomId: string,
//     options?: UseQueryOptions<ApiPageResponse<chatListResponse>, AxiosError<ApiError>>,
// ) => {
//     return useQuery({
//         queryKey: [QUERY.CHAT.getChatForCandidate, chatRoomId],
//         queryFn: ({ signal }) => getChatForCandidate({ signal, chatRoomId }),
//         enabled: role === "CANDIDATE",
//         staleTime: Infinity,
//         ...options,
//     });
// };

// export const useGetChatForRecruiter = (
//     role: string,
//     companyId: number,
//     chatRoomId: string,
//     options?: UseQueryOptions<ApiPageResponse<chatListResponse>, AxiosError<ApiError>>,
// ) => {
//     return useQuery({
//         queryKey: [QUERY.CHAT.getChatForRecruiter, chatRoomId, companyId],
//         queryFn: ({ signal }) => getChatForRecruiter({ signal, companyId, chatRoomId }),
//         enabled: role === "RECRUITER",
//         staleTime: Infinity,
//         ...options,
//     });
// };

export const useGetChatList = (
    params: ChatListParams,
    options?: Omit<
        UseInfiniteQueryOptions<
            ApiResponse<ChatListResponse>,
            AxiosError<ApiError>,
            InfiniteData<ApiResponse<ChatListResponse>>,
            [string],
            ChatListCursor | null
        >,
        "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
    >,
) => {
    return useInfiniteQuery({
        queryKey: [QUERY.CHAT.getChatList],
        queryFn: ({ signal, pageParam }) =>
            getChatList({
                signal,
                params: {
                    ...params,
                    lastMessageAt: pageParam?.lastMessageAt,
                    chatId: pageParam?.id,
                },
            }),
        initialPageParam: null,
        getNextPageParam: (lastPage) => {
            return lastPage.data?.nextCursor ?? null;
        },
        staleTime: Infinity,
        ...options,
    });
};

export const useGetMessages = (
    chatId: number,
    limit: number,
    options?: UseInfiniteQueryOptions<
        ApiResponse<MessageResponse>, // response type
        AxiosError<ApiError>, // error type
        InfiniteData<ApiResponse<MessageResponse>>, // selected data
        [string, number], // query key type
        number | null // pageParam type (cursor)
    >,
) => {
    return useInfiniteQuery({
        queryKey: [QUERY.CHAT.getMessages, chatId],
        queryFn: ({ signal, pageParam }) =>
            getMessages({
                signal,
                chatId,
                limit,
                cursor: pageParam ?? undefined,
            }),
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.data?.nextCursor ?? null,
        enabled: !!chatId,
        staleTime: Infinity,
        ...options,
    });
};

export const useCreateChat = (
    companyId: number,
    candidateProfileId: number,
    options?: UseQueryOptions<ApiResponse<CreateChatResponse>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.CHAT.createChat, companyId, candidateProfileId],
        queryFn: ({ signal }) => createChat({ signal, companyId, candidateProfileId }),
        enabled: !!companyId && !!candidateProfileId,
        ...options,
    });
};
