import api from "@/lib/axios/client";
import { ApiResponse } from "@/types/api";
import { LoginPayLoad, LoginResponse } from "./types";


export const login = async (
    payload: LoginPayLoad
): Promise<ApiResponse<LoginResponse>> => {
    const res = await api.post("/v1/auth/login", payload);
    return res.data;
};

export const loginWithOAuth = async (role?: string): Promise<any> => {
    const res = await api.post("/v1/auth/getGoogleLoginPage", {
        role: role || undefined,
    });
    window.location.href = res.data.data.url;
};
