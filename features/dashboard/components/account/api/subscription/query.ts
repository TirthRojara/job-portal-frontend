import { ApiError, ApiPageResponse, ApiResponse } from "@/types/api";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
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
    role: string | undefined,
    options?: UseQueryOptions<ApiPageResponse<PaymentHistoryResponse[]>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.PAYMENT.DATA.getPaymentHistory, role],
        queryFn: ({ signal }) => getPaymentHistory({ signal }),
        enabled: role === "RECRUITER",
        ...options,
    });
};
