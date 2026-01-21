"use client";
import { MUTATION } from "@/constants/tanstank.constants";
import { ApiError, ApiResponse } from "@/types/api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { resendSignupOTP, verifySignupOTP } from "./api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import store, { useAppDispatch } from "@/store/index.store";
import { appActions } from "@/store/app.slice";
import { el } from "date-fns/locale";

export type VerifySignupOTPResponse = {
    token: string;
    role: string;
};

export type VerifySignupOTPPayload = {
    otp: string;
};

export type ResendSignupOTPPayload = {
    type: string;
};

export const useVerifySignupOTP = (
    options?: UseMutationOptions<ApiResponse<VerifySignupOTPResponse>, ApiError, VerifySignupOTPPayload>,
) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    return useMutation({
        mutationKey: [MUTATION.AUTH.verifySignupOTP],
        mutationFn: (payload: VerifySignupOTPPayload) => verifySignupOTP(payload),
        onSuccess: (data: ApiResponse<VerifySignupOTPResponse>) => {
            console.log("OTP verified successfully:", data);
            dispatch(appActions.setAccessToken(data.data!.token));
            toast.success("Sign Up successfully!");
            router.push(`/dashboard/${data.data?.role.toLowerCase()}`);
        },
        onError: (error: any) => {
            toast.error(`OTP verification failed: ${error.response.data?.message}`);
            console.error("OTP verification error details:", error);
        },
    });
};

export const useResendSignupOTP = (options?: UseMutationOptions<ApiError, ApiError, ResendSignupOTPPayload>) => {
    return useMutation({
        mutationKey: [MUTATION.AUTH.resendSignupOTP],
        mutationFn: (payload: ResendSignupOTPPayload) => resendSignupOTP(payload.type),
        onSuccess: (data: ApiError) => {
            toast.success(data.message || "OTP resent successfully!");
            console.log("OTP resent successfully:", data);
        },
        onError: (error: any) => {
            if (error.status === 429) {
                toast.error(`${error.response.data?.message || "Too many requests. Please try again later."}`);
                return;
            } else if (error.status === 403) {
                toast.error(`${error.response.data?.message || "You have reached the maximum resend limit. Please try again later."}`);
                return;
            } else {
                toast.error(`Resend OTP failed! Please try again later.`);
                console.error("Resend OTP error details:", error);
            }
        },
    });
}; 
