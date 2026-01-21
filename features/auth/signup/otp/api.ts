import api from "@/lib/axios/client";
import { ApiResponse } from "@/types/api";
import { VerifySignupOTPPayload, VerifySignupOTPResponse } from "./mutation";

export const verifySignupOTP = async (payload: VerifySignupOTPPayload): Promise<ApiResponse<VerifySignupOTPResponse>> => {
    const res = await api.post("v1/auth/verify", payload);
    return res.data;
};
