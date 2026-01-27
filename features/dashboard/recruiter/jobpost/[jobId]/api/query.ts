import { QUERY } from "@/constants/tanstank.constants";
import { ApiError, ApiResponse } from "@/types/api";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getBenefitList, getJobById, getJobIdBenefit, getJobIdSkill, getJobViewById } from "./api";
import { JobBenefitResponse, JobByIdResponse, JobSkillResponse, JobViewByIdResponse} from "./types";

export const useGetJobById = (jobId: string, options?: UseQueryOptions<ApiResponse<JobByIdResponse>, AxiosError<ApiError>>) => {
    return useQuery({
        queryKey: [QUERY.JOB.getJobById, jobId],
        queryFn: ({ signal }) => getJobById({ signal, jobId }),
        // enabled: !!jobId,
        enabled: !!jobId,
        ...options,
    });
};

export const useGetJobViewById = (
    jobId: number,
    options?: UseQueryOptions<ApiResponse<JobViewByIdResponse>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.JOB.getJobById, jobId],
        queryFn: ({ signal }) => getJobViewById({ signal, jobId }),
        // enabled: !!jobId,
        enabled: !!jobId,
        ...options,
    });
};

export const useGetJobIdSkill = (jobId: number, options?: UseQueryOptions<ApiResponse<JobSkillResponse[]>, AxiosError<ApiError>>) => {
    return useQuery({
        queryKey: [QUERY.JOBSKILL.getJobIdSkill, jobId],
        queryFn: ({ signal }) => getJobIdSkill({ signal, jobId }),
        enabled: !!jobId,
        ...options,
    });
};

export const useGetJobIdBenefit = (jobId: number, options?: UseQueryOptions<ApiResponse<JobBenefitResponse>, AxiosError<ApiError>>) => {
    return useQuery({
        queryKey: [QUERY.JOBBENEFIT.getJobIdBenefit, jobId],
        queryFn: ({ signal }) => getJobIdBenefit({ signal, jobId }),
        ...options,
    });
};

export const useGetBenefitList = (options?: UseQueryOptions<ApiResponse<any>, AxiosError<ApiError>>) => {
    return useQuery({
        queryKey: [QUERY.JOBBENEFIT.getJobIdBenefit],
        queryFn: ({ signal }) => getBenefitList({ signal }),
        ...options,
    });
};
