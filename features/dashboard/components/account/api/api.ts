import api from "@/lib/axios/client";
import { ApiError, ApiResponse } from "@/types/api";
import { ChangePasswordPayload, isPasswordSetResponse, SetPasswordPayload } from "./types";
import { promise } from "zod";
import { resolve } from "path";

export const changePassword = async ({ currentPassword, newPassword }: ChangePasswordPayload): Promise<ApiError> => {
    const res = await api.post("v1/auth/change-password", { currentPassword, newPassword });
    return res.data;
};

export const setPasswordForOauth = async ({ password, confirmPassword }: SetPasswordPayload): Promise<ApiError> => {
    const res = await api.post("v1/auth/setPassword", { password, confirmPassword });
    return res.data;
};

export const isPasswordSetForOauth = async ({
    signal,
}: {
    signal?: AbortSignal;
}): Promise<ApiResponse<isPasswordSetResponse>> => {
    const res = await api.get("v1/auth/isPasswordSet", {
        signal: signal,
    });
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return res.data;
};
