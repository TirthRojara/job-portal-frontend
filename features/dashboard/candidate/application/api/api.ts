import api from "@/lib/axios/client";
import { ApiPageResponse } from "@/types/api";
import { ApplicationResponse } from "./types";

export const getAllApplication = async ({
    signal,
    page,
    limit,
}: {
    signal: AbortSignal;
    page: number;
    limit: number;
}): Promise<ApiPageResponse<ApplicationResponse[]>> => {
    const res = await api.get(`v1/apply/me/candidate`, {
        signal,
        params: { page, limit },
    });
    return res.data;
};
