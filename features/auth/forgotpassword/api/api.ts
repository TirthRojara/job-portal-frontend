import api from "@/lib/axios/client";
import { ApiError, ApiResponse } from "@/types/api";
import { VerifyForgotOTPResponse } from "./mutation";
import store from "@/store/index.store";

export const forgotPassword = async (email: string): Promise<ApiError> => {
    const res = await api.post("v1/auth/forgot-password", { email });
    return res.data;
};

export const verifyForgotOTP = async (otp: string): Promise<ApiResponse<VerifyForgotOTPResponse>> => {
    const res = await api.post("v1/auth/verify-forgot-password", { otp });
    return res.data;
};

export const resendForgotOTP = async (type: string): Promise<ApiError> => {
    const res = await api.post("v1/auth/resend", { type });
    return res.data;
};

// Set New Password after verifying OTP
export const setNewPassword = async (newPassword: string): Promise<ApiError> => {
    const res = await api.post("v1/auth/reset-forgot-password", { newPassword });
    return res.data;
};

