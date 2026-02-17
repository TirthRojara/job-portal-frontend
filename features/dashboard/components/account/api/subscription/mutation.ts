"use client";
import { MUTATION, QUERY } from "@/constants/tanstank.constants";
import { ApiError, ApiResponse } from "@/types/api";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { number } from "zod";
import { cancelSubscription, createSubscripiton, getRazorpayKeyId, pauseSubscription, resumeSubscription } from "./api";
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
            const queryKey = [QUERY.PAYMENT.DATA.getSubscription, role];

            queryClient.setQueryData<ApiResponse<SubscriptionResponse>>(queryKey, (old) => {
                if (!old || !old.data) return old;

                return {
                    ...old,
                    data: {
                        ...old.data,
                        chargedAt: {
                            ...old.data.chargedAt,
                            status: "CANCELLED",
                        },
                        sub: old.data.sub,
                    },
                };
            });

            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey });
            }, 5000);

            toast.success("Subscription canceled.");
            toast.info("Your request is being processed. It may take up to 5 minutes to reflect.");
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

        onError(error, variables, context) {
            toast.error("Something went wrong. Please try again.");
        },

        onSuccess: () => {
            const queryKey = [QUERY.PAYMENT.DATA.getSubscription, role];

            queryClient.setQueryData<ApiResponse<SubscriptionResponse>>(queryKey, (old) => {
                if (!old || !old.data) return old;

                return {
                    ...old,
                    data: {
                        ...old.data,
                        chargedAt: {
                            ...old.data.chargedAt,
                            status: "ACTIVE",
                        },
                        sub: old.data.sub,
                    },
                };
            });

            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey });
            }, 5000);

            console.log("on success resume success");
            toast.success("Subscription Resumed.");
        },
        ...options,
    });
};

export const useCancelSubscription = (
    options?: UseMutationOptions<ApiError, AxiosError<ApiError>, { subscriptionId: string }, SubscriptionContext>,
) => {
    const role = useAppSelector((state) => state.app.role);
    const queryClient = useQueryClient();

    return useMutation<ApiError, AxiosError<ApiError>, { subscriptionId: string }, SubscriptionContext>({
        mutationKey: [MUTATION.PAYMENT.RAZORPAY.resumeSubscription],
        mutationFn: ({ subscriptionId }: { subscriptionId: string }) => cancelSubscription(subscriptionId),

        onError(error, variables, context) {
            toast.error("Something went wrong. Please try again.");
        },

        onSuccess: () => {
            const queryKey = [QUERY.PAYMENT.DATA.getSubscription, role];

            queryClient.setQueryData<ApiResponse<SubscriptionResponse>>(queryKey, (old) => {
                if (!old || !old.data) return old;

                return {
                    ...old,
                    data: {
                        ...old.data,
                        chargedAt: {
                            ...old.data.chargedAt,
                            nextPayment: null,
                            status: "CANCELLED",
                        },
                        sub: old.data.sub,
                    },
                };
            });

            // setTimeout(() => {
            // queryClient.invalidateQueries({ queryKey });
            // }, 5000);
            // window.location.reload();

            toast.success("Subscription canceled.");
        },
        ...options,
    });
};
