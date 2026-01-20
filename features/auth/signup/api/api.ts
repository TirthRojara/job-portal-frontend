import api from "@/lib/axios/client";
import { SignupFormData } from "./types";
import { ApiError } from "@/types/api";
import { string } from "zod";

export const loginWithOAuth = async (role: string): Promise<any> => {
    const res = await api.post("/v1/auth/getGoogleLoginPage", { role: role });
    window.location.href = res.data.data.url;
};

export const signUp = async (payload: SignupFormData): Promise<ApiError> => {
    const res = await api.post("v1/auth/signup", payload);
    return res.data;
};
