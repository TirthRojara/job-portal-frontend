import api from "@/lib/axios/client";
import { ApiResponse } from "@/types/api";
import { JobBenefitResponse, JobByIdResponse, JobSkillResponse, JobViewByIdResponse } from "./types";

export const getJobById = async ({
    signal,
    jobId,
}: {
    signal?: AbortSignal;
    jobId: string;
}): Promise<ApiResponse<JobByIdResponse>> => {
    const res = await api.get(`v1/job/${jobId}`, {
        signal,
    });
    // await new Promise((reject) => setTimeout(reject, 2000));
    return res.data;
};

export const getJobViewById = async ({
    signal,
    jobId,
}: {
    signal?: AbortSignal;
    jobId: number;
}): Promise<ApiResponse<JobViewByIdResponse>> => {
    const res = await api.get(`v1/job/${jobId}/view`, {
        signal,
    });
    return res.data;
};

export const getJobIdSkill = async ({
    signal,
    jobId,
}: {
    signal?: AbortSignal;
    jobId: number;
}): Promise<ApiResponse<JobSkillResponse[]>> => {
    const res = await api.get(`v1/job-skill/${jobId}`, {
        signal,
    });
    return res.data;
};

export const getJobIdBenefit = async ({ signal, jobId }: { signal?: AbortSignal; jobId: number }): Promise<ApiResponse<JobBenefitResponse>> => {
    const res = await api.get(`v1/job-benefit/${jobId}`, {
        signal,
    });
    return res.data;
};

export const getBenefitList = async ({ signal }: { signal?: AbortSignal }): Promise<ApiResponse<any>> => {
    const res = await api.get(`v1/job-benefit/list`, {
        signal,
    });
    return res.data;
};
