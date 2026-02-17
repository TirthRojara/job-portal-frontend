import { ApiError, ApiPageResponse, ApiResponse } from "@/types/api";
import { InfiniteData, useInfiniteQuery, UseInfiniteQueryOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { PaymentHistoryResponse, SubscriptionResponse } from "./types";
import { AxiosError } from "axios";
import { getPaymentHistory, getSubscription } from "./api";
import { QUERY } from "@/constants/tanstank.constants";

export const useGetSubscription = (
    role: string | undefined,
    options?: UseQueryOptions<ApiResponse<SubscriptionResponse>, AxiosError<ApiError>>,
) => {
    // console.log("query key :", [QUERY.PAYMENT.DATA.getSubscription, role]);

    return useQuery({
        queryKey: [QUERY.PAYMENT.DATA.getSubscription, role],
        queryFn: ({ signal }) => getSubscription({ signal }),
        enabled: role === "RECRUITER",
        ...options,
    });
};

export const useGetPaymentHistory = (
    limit: number,
    role: string | undefined,
    options?: UseInfiniteQueryOptions<
        ApiPageResponse<PaymentHistoryResponse[]>,
        AxiosError<ApiError>,
        InfiniteData<ApiPageResponse<PaymentHistoryResponse[]>>,
        [string],
        number
    >,
) => {
    return useInfiniteQuery({
        queryKey: [QUERY.PAYMENT.DATA.getPaymentHistory],
        queryFn: ({ signal, pageParam }) => getPaymentHistory({ signal, page: pageParam, limit }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = Number(lastPage.pagination.currentPage);
            const totalPages = Number(lastPage.pagination.totalPages);

            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        enabled: role === "RECRUITER",
        ...options,
    });
};
