import api from "@/lib/axios/client";
import { ApiResponse } from "@/types/api";
import { CreateSubscriptionResponse, RazorpayKeyIdResponse, SubscriptionResponse } from "./types";

// export const getRazorpayKeyId = async ({ signal }: { signal?: AbortSignal }): Promise<ApiResponse<RazorpayKeyIdResponse>> => {
//     const res = await api.get("v1/candidate-profiles/me", {
//         signal,
//     });
//     return res.data;
// };

export const getRazorpayKeyId = async (): Promise<ApiResponse<RazorpayKeyIdResponse>> => {
    const res = await api.get("v1/razorpay/key");
    return res.data;
};

// export const createSubscripiton = async ({ packageId }: { packageId: number }) => {
export const createSubscripiton = async (packageId: number): Promise<ApiResponse<CreateSubscriptionResponse>> => {
    const res = await api.post(`v1/razorpay/subscription/create/${packageId}`);
    return res.data;
};

export const getSubscription = async ({ signal }: { signal: AbortSignal }): Promise<ApiResponse<SubscriptionResponse>> => {
    const res = await api.get("v1/payment/subscription", { signal });
    return res.data;
};
