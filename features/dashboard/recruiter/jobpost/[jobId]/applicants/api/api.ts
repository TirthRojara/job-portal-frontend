import api from "@/lib/axios/client";
import { ApiError, ApiPageResponse, ApiResponse } from "@/types/api";
import { AxiosResponse } from "axios";
import { ApplicantsResponse, ApplicationByIdResponse, UpdateJobStatusPayload } from "./types";

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

export const getApplicantById = async ({
    signal,
    jobId,
    candidateProfileId,
}: {
    signal: AbortSignal;
    jobId: string;
    candidateProfileId: string;
}): Promise<ApiResponse<ApplicationByIdResponse>> => {
    const res = await api.get(`v1/apply/me/recruiter/application/${jobId}/${candidateProfileId}`, {
        signal,
    });
    return res.data;
};

export const updateApplicationStatus = async (
    jobId: string,
    companyId: string,
    payload: UpdateJobStatusPayload,
): Promise<ApiError> => {
    const res = await api.patch(`v1/apply/recruiter/status/${jobId}/${companyId}`, payload);
    return res.data;
};
