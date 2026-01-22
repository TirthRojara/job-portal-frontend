import api from "@/lib/axios/client";
import { ApiError } from "@/types/api";

export const logout = async (): Promise<ApiError> => {
    const res = await api.post("v1/auth/logout");
    return res.data;
}