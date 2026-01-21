import api from "@/lib/axios/client";
import { ApiError, ApiResponse } from "@/types/api";
import { VerifySignupOTPPayload, VerifySignupOTPResponse } from "./mutation";

export const verifySignupOTP = async (payload: VerifySignupOTPPayload): Promise<ApiResponse<VerifySignupOTPResponse>> => {
    const res = await api.post("v1/auth/verify", payload);
    return res.data;
};

export const resendSignupOTP = async (type: string): Promise<ApiError> => {
    const res = await api.post("v1/auth/resend", { type });
    return res.data;
}
