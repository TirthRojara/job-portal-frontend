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
            // queryClient.invalidateQueries({ queryKey: queryKey });
            // console.log("pause Invalidating:", queryKey);

            queryClient.setQueryData<ApiResponse<SubscriptionResponse>>(queryKey, (old) => {
                if (!old || !old.data) return old;

                return {
                    ...old,
                    data: {
                        ...old.data,
                        chargedAt: {
                            ...old.data.chargedAt,
                            status: "PAUSED",
                        },
                        sub: old.data.sub,
                    },
                };
            });

            // queryClient.invalidateQueries({ queryKey: queryKey });
            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey });
            }, 5000);

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

        onError(error, variables, context) {
            toast.error("Something went wrong. Please try again.");
        },

        onSuccess: () => {
            // window.location.reload();
            const queryKey = [QUERY.PAYMENT.DATA.getSubscription, role];

            // console.log("resume Invalidating:", queryKey);

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

            // queryClient.invalidateQueries({ queryKey: queryKey });
            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey });
            }, 5000);

            console.log("on success resume success");
            toast.success("Subscription Resumed.");
        },
        ...options,
    });
};
