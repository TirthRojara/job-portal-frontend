"use client";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { forgotPassword, resendForgotOTP, setNewPassword, verifyForgotOTP } from "./api";
import { ApiError, ApiResponse } from "@/types/api";
import { MUTATION } from "@/constants/tanstank.constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { appActions } from "@/store/app.slice";
import { useAppDispatch } from "@/store/index.store";

export type ResendForgotOTPPayload = {
    type: string;
};

export type VerifyForgotOTPResponse = {
    resetToken: string;
};

// Forgot Password => here user enter the email
export const useForgotPassword = (options?: UseMutationOptions<ApiError, ApiError, string>) => {
    const router = useRouter();

    return useMutation({
        mutationKey: [MUTATION.AUTH.forgotPassword],
        mutationFn: (email: string) => forgotPassword(email),
        onSuccess: (data: ApiError) => {
            toast.success(data.message || "Forgot password request successful! Please check your email.");
            router.push(`/forgotpassword/otp`);
            console.log("Forgot password request successful:", data);
        },
        onError: (error: any) => {
            toast.error(`Forgot password request failed: ${error.response.data?.message}`);
            console.error("Forgot password error details:", error);
        },
        ...options,
    });
};

// Verify Forgot Password OTP Mutation Hook
export const useVerifyForgotOTP = (
    options?: UseMutationOptions<ApiResponse<VerifyForgotOTPResponse>, ApiError, { otp: string }>,
) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    return useMutation({
        mutationKey: [MUTATION.AUTH.verifyForgotOTP],
        mutationFn: (payload: { otp: string }) => verifyForgotOTP(payload.otp),
        onSuccess: (data: ApiResponse<VerifyForgotOTPResponse>) => {
            dispatch(appActions.setResetToken(data.data!.resetToken));
            router.push(`/forgotpassword/set`);
            toast.success(data.message || "OTP verified successfully!");
            console.log("OTP verified successfully:", data);
        },
        onError: (error: any) => {
            toast.error(`Verify OTP failed! Please try again later.`);
            console.error("Verify OTP error details:", error);
        },
    });
};

// Resend Forgot Password OTP Mutation Hook
export const useResendForgotOTP = (options?: UseMutationOptions<ApiError, ApiError, ResendForgotOTPPayload>) => {
    return useMutation({
        mutationKey: [MUTATION.AUTH.resendForgotOTP],
        mutationFn: (payload: ResendForgotOTPPayload) => resendForgotOTP(payload.type),
        onSuccess: (data: ApiError) => {
            toast.success(data.message || "OTP resent successfully!");
            console.log("OTP resent successfully:", data);
        },
        onError: (error: any) => {
            if (error.status === 429) {
                toast.error(`${error.response.data?.message || "Too many requests. Please try again later."}`);
                return;
            } else if (error.status === 403) {
                toast.error(
                    `${error.response.data?.message || "You have reached the maximum resend limit. Please try again later."}`,
                );
                return;
            } else {
                toast.error(`Resend OTP failed! Please try again later.`);
                console.error("Resend OTP error details:", error);
            }
        },
    });
};

// Set New Password Mutation Hook
export const useSetNewPassword = (options?: UseMutationOptions<ApiError, ApiError, string>) => {
    const router = useRouter();
    return useMutation({
        mutationKey: [MUTATION.AUTH.setNewPassword],
        mutationFn: (newPassword: string) => setNewPassword(newPassword),
        onSuccess: (data: ApiError) => {
            toast.success(data.message || "Password reset successful! You can now log in with your new password.");
            router.push(`/login`);
            console.log("Password reset successful:", data);
        },
        onError: (error: any) => {
            if(error.response?.status === 400){
                toast.error(`${error.response.data?.message}`);
                return;
            }

            toast.error(`Set new password failed! Please try again later.`);
            console.error("Set new password error details:", error);
        },
    });
}
