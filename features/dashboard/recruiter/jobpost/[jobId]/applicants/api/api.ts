import api from "@/lib/axios/client";
import { ApiPageResponse } from "@/types/api";
import { AxiosResponse } from "axios";
import { ApplicantsResponse } from "./types";

export const getApplicants = async ({
    signal,
    page,
    limit,
    jobId,
    companyId,
}: {
    signal: AbortSignal;
    page: number;
    limit: number;
    jobId: number;
    companyId: number;
}): Promise<ApiPageResponse<ApplicantsResponse[]>> => {
    const res = await api.get(`v1/apply/me/recruiter/${jobId}/${companyId}`, {
        signal,
        params: { page, limit },
    });
    return res.data;
};
