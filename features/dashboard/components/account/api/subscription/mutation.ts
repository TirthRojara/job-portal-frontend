import { MUTATION } from "@/constants/tanstank.constants";
import { ApiError, ApiResponse } from "@/types/api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { number } from "zod";
import { createSubscripiton, getRazorpayKeyId } from "./api";
import { CreateSubscriptionResponse, RazorpayKeyIdResponse } from "./types";

type BuySubscriptionResponse = {
    keyData: ApiResponse<RazorpayKeyIdResponse>;
    subscriptionData: ApiResponse<CreateSubscriptionResponse>;
};

export const useBuySubscription = (
    // options?: UseMutationOptions<ApiResponse<CreateSubscriptionResponse>, AxiosError<ApiError>, { packageId: number }>,
    options?: UseMutationOptions<BuySubscriptionResponse, AxiosError<ApiError>, { packageId: number }>,
) => {
    return useMutation<BuySubscriptionResponse, AxiosError<ApiError>, { packageId: number }>({
        // return useMutation<ApiResponse<CreateSubscriptionResponse>, AxiosError<ApiError>, { packageId: number }>({
        // return useMutation({
        mutationKey: [MUTATION.PAYMENT.RAZORPAY.buySubscription],
        mutationFn: async ({ packageId }: { packageId: number }) => {
            const keyData = await getRazorpayKeyId();
            const subscriptionData = await createSubscripiton(packageId);

            return {
                keyData,
                subscriptionData,
            };
        },
        ...options,
    });
};
