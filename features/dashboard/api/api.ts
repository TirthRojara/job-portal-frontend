import api from "@/lib/axios/client";
import { ApiResponse } from "@/types/api";

export const getUserData = async ({ signal }: { signal: AbortSignal }) => {
    const res = await api.get(`v1/users/me`, {
        signal,
    });
    return res.data;
};

export type CandidteStates = {
    totalApplication: number;
    savedJob: number;
    todayApply: number;
    weeklyApply: number;
};

export const getCandidateStates = async ({ signal }: { signal: AbortSignal }): Promise<ApiResponse<CandidteStates>> => {
    const res = await api.get(`v1/candidate-profiles/candidate/states`, {
        signal,
    });
    return res.data;
};

export type RecruiterStates = {
    activeJobPost: number;
    totalJobPost: number;
    companyView: number;
    todayApplication: number;
};

export const getRecruiterStates = async ({
    signal,
    companyId,
}: {
    signal: AbortSignal;
    companyId: number;
}): Promise<ApiResponse<RecruiterStates>> => {
    const res = await api.get(`v1/company/states/${companyId}`, {
        signal,
    });
    return res.data;
};
