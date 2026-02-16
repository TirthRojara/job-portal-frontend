"use client";
import { MUTATION, QUERY } from "@/constants/tanstank.constants";
import { ApiError, ApiResponse } from "@/types/api";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { number } from "zod";
import { createSubscripiton, getRazorpayKeyId, pauseSubscription, resumeSubscription } from "./api";
import { CreateSubscriptionResponse, RazorpayKeyIdResponse, SubscriptionResponse } from "./types";
import { toast } from "sonner";
import { useAppSelector } from "@/store/index.store";

type BuySubscriptionResponse = {
    keyData: ApiResponse<RazorpayKeyIdResponse>;
    subscriptionData: ApiResponse<CreateSubscriptionResponse>;
};

export const useBuySubscription = (
    options?: UseMutationOptions<BuySubscriptionResponse, AxiosError<ApiError>, { packageId: number }>,
) => {
    return useMutation<BuySubscriptionResponse, AxiosError<ApiError>, { packageId: number }>({
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

type SubscriptionContext = {
    previousData: ApiResponse<SubscriptionResponse> | undefined;
};

export const usePauseSubscription = (
    options?: UseMutationOptions<ApiError, AxiosError<ApiError>, { subscriptionId: string }, SubscriptionContext>,
) => {
    const role = useAppSelector((state) => state.app.role);
    const queryClient = useQueryClient();

    return useMutation<ApiError, AxiosError<ApiError>, { subscriptionId: string }, SubscriptionContext>({
        mutationKey: [MUTATION.PAYMENT.RAZORPAY.pauseSubscription, role],
        mutationFn: ({ subscriptionId }: { subscriptionId: string }) => pauseSubscription(subscriptionId),

        onError(error, variables, context) {
            toast.error("Something went wrong. Please try again.");
        },

        onSuccess: () => {
            // window.location.reload();
            const queryKey = [QUERY.PAYMENT.DATA.getSubscription, role];
            queryClient.invalidateQueries({ queryKey: queryKey });
            console.log("pause Invalidating:", queryKey);
            console.log("on success pause success");
            toast.success("Subscription Paused.");
        },
        ...options,
    });
};

export const useResumeSubscription = (
    options?: UseMutationOptions<ApiError, AxiosError<ApiError>, { subscriptionId: string }, SubscriptionContext>,
) => {
    const role = useAppSelector((state) => state.app.role);
    const queryClient = useQueryClient();

    return useMutation<ApiError, AxiosError<ApiError>, { subscriptionId: string }, SubscriptionContext>({
        mutationKey: [MUTATION.PAYMENT.RAZORPAY.resumeSubscription],
        mutationFn: ({ subscriptionId }: { subscriptionId: string }) => resumeSubscription(subscriptionId),
        // onMutate: async () => {
        //     const queryKey = [QUERY.PAYMENT.DATA.getSubscription, role];
        //     await queryClient.cancelQueries({ queryKey });

        //     const previousData = queryClient.getQueryData<ApiResponse<SubscriptionResponse>>(queryKey);
        //     console.log({ previousData });

        //     queryClient.setQueryData<ApiResponse<SubscriptionResponse>>(queryKey, (oldData) => {
        //         if (!oldData || !oldData.data) return oldData;

        //         return {
        //             ...oldData,
        //             data: {
        //                 ...oldData.data,
        //                 chargedAt: {
        //                     ...oldData.data.chargedAt,
        //                     status: "ACTIVE",
        //                 },
        //             },
        //         };
        //     });

        //     return { previousData };
        // },
        onError(error, variables, context) {
            toast.error("Something went wrong. Please try again.");
            // const queryKey = [QUERY.PAYMENT.DATA.getSubscription, role];
            // if (context?.previousData) {
            //     queryClient.setQueryData(queryKey, context.previousData);
            // }
        },
        // onSettled: () => {
        //     const queryKey = [QUERY.PAYMENT.DATA.getSubscription, role];
        //     queryClient.invalidateQueries({ queryKey: queryKey });
        // },
        onSuccess: () => {
            // window.location.reload();
            const queryKey = [QUERY.PAYMENT.DATA.getSubscription, role];
            queryClient.invalidateQueries({ queryKey: queryKey });
            console.log("resume Invalidating:", queryKey);
            console.log("on success resume success");
            toast.success("Subscription Resumed.");
        },
        ...options,
    });
};
