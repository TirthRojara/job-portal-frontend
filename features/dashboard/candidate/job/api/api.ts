import { SearchParams } from "@/features/dashboard/recruiter/jobpost/api/types";
import api from "@/lib/axios/client";
import { ApiPageResponse, ApiResponse } from "@/types/api";
import { applyJobResponse, JobResponseCandidate } from "./types";

export const getAllJobsCandidate = async ({
    signal,
    searchParams,
}: {
    signal?: AbortSignal;
    searchParams: SearchParams;
}): Promise<ApiPageResponse<JobResponseCandidate[]>> => {
    const res = await api.get(`v1/job/readAll`, { signal, params: searchParams });
    return res.data;
};

export const applyJob = async ({ jobId }: { jobId: number }): Promise<ApiResponse<applyJobResponse>> => {
    const res = await api.post(`v1/apply/${jobId}`);
    return res.data;
};

export const toggleSaveJob = async ({ jobId }: { jobId: number }): Promise<ApiResponse<null>> => {
    const res = await api.post(`v1/job/save/${jobId}`);
    return res.data;
}
