"use client";
import { ApiError, ApiResponse } from "@/types/api";
import { QueryClient, useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import {
    addBenefitResponse,
    addSkillResponse,
    CreateJobPayload,
    CreateJobResponse,
    EditJobPayload,
    EditJobResponse,
    updateStatusPayload,
} from "./types";
import { AxiosError } from "axios";
import { MUTATION, QUERY } from "@/constants/tanstank.constants";
import { addBenefit, addSkill, createJob, deleteJob, editJob, removeBenefit, removeSkill, updateJobStatus } from "./api";
import { error } from "console";
import { number } from "zod";
import { JobBenefitResponse } from "../../[jobId]/api/types";
import { toast } from "sonner";

// JOB

export const useCreateJob = (
    options?: UseMutationOptions<ApiResponse<CreateJobResponse>, AxiosError<ApiError>, CreateJobPayload>,
) => {
    return useMutation({
        mutationKey: [MUTATION.JOB.createJob],
        mutationFn: ({ companyId, data }: { companyId: number; data: CreateJobPayload }) => createJob(companyId, data),
        // onSuccess: (data) => {
        //     toast.success("Crete Job Successfully.");
        // },
        onError: (error: AxiosError<ApiError>) => {
            toast.success("Something went wrong.");
        },
    });
};

export const useEditJob = (
    options?: UseMutationOptions<
        ApiResponse<EditJobResponse>,
        AxiosError<ApiError>,
        { jobId: number; companyId: number; data: EditJobPayload }
    >,
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION.JOB.editJob],
        mutationFn: ({ jobId, companyId, data }: { jobId: number; companyId: number; data: EditJobPayload }) =>
            editJob(jobId, companyId, data),
        onSuccess(data, variables, onMutateResult, context) {
            toast.success("Edit job successfully.");
            queryClient.invalidateQueries({ queryKey: [QUERY.JOB.getJobById, variables.jobId] });
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.success("Something went wrong.");
        },
    });
};

export const useUpdateJobStatus = (
    options?: UseMutationOptions<
        ApiError,
        AxiosError<ApiError>,
        { jobId: number; companyId: number; payload: updateStatusPayload }
    >,
) => {
    return useMutation({
        mutationKey: [MUTATION.JOB.updateJobStatus],
        mutationFn: ({ jobId, companyId, payload }: { jobId: number; companyId: number; payload: updateStatusPayload }) =>
            updateJobStatus(jobId, companyId, payload),
        ...options,
    });
};

export const useDeleteJOb = (
    options?: UseMutationOptions<ApiError, AxiosError<ApiError>, { jobId: number; companyId: number }>,
) => {
    return useMutation({
        mutationKey: [MUTATION.JOB.deleteJob],
        mutationFn: ({ jobId, companyId }: { jobId: number; companyId: number }) => deleteJob(jobId, companyId),
        ...options,
    });
};

// SKILL

export const useAddSkillInJob = (
    options?: UseMutationOptions<
        ApiResponse<addSkillResponse>,
        AxiosError<ApiError>,
        { jobId: number; skillId: number; name?: string }
    >,
) => {
    return useMutation({
        mutationKey: [MUTATION.JOBSKILL.addSkill],
        mutationFn: ({ jobId, skillId, name }: { jobId: number; skillId: number; name?: string }) => addSkill(jobId, skillId),
        ...options,
    });
};

export const useRemoveSkillInJob = (
    options?: UseMutationOptions<ApiError, AxiosError<ApiError>, { jobId: number; skillId: number }>,
) => {
    return useMutation({
        mutationKey: [MUTATION.JOBSKILL.removeSkill],
        mutationFn: ({ jobId, skillId }: { jobId: number; skillId: number }) => removeSkill(jobId, skillId),
        onSuccess: (data) => {
            console.log("Remove job skill on success \n", data);
        },
        onError: (error: AxiosError<ApiError>) => {
            console.log("Remove job skill error \n", error);
        },
        ...options,
    });
};

// BENEFIT

type BenefitContext = {
    previousBenefit: ApiResponse<JobBenefitResponse> | undefined;
};

export const useAddBenefit = (
    options?: UseMutationOptions<
        ApiResponse<addBenefitResponse>,
        AxiosError<ApiError>,
        { jobId: number; benefitName: string },
        BenefitContext
    >,
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION.JOB_BENEFIT.addBenefit],
        mutationFn: ({ jobId, benefitName }: { jobId: number; benefitName: string }) => addBenefit(jobId, benefitName),
        onMutate: async (variables) => {
            const queryKey = [QUERY.JOBBENEFIT.getJobIdBenefit, variables.jobId];

            await queryClient.cancelQueries({ queryKey });

            const previousBenefit = queryClient.getQueryData<ApiResponse<JobBenefitResponse>>(queryKey);

            queryClient.setQueryData<ApiResponse<JobBenefitResponse>>(queryKey, (oldData) => {
                if (!oldData || !oldData.data) return oldData;

                return {
                    ...oldData,
                    data: {
                        ...oldData.data,
                        benefitNames: [
                            ...(oldData.data.benefitNames || []),
                            variables.benefitName, // Add the new string directly
                        ],
                    },
                };
            });

            return { previousBenefit };
        },
        onError: (error, variables, onMutateResult, context) => {
            const queryKey = [QUERY.JOBBENEFIT.getJobIdBenefit, variables.jobId];
            const previousJobskill = queryClient.getQueryData<ApiResponse<JobBenefitResponse>>(queryKey);
            queryClient.setQueryData([queryKey], previousJobskill);
        },
        onSettled(data, error, variables, onMutateResult, context) {
            const queryKey = [QUERY.JOBBENEFIT.getJobIdBenefit, variables.jobId];
            queryClient.invalidateQueries({ queryKey: queryKey });
        },
        ...options,
    });
};

export const useRemoveBenefit = (
    options?: UseMutationOptions<ApiError, AxiosError<ApiError>, { jobId: number; benefitName: string }, BenefitContext>,
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION.JOB_BENEFIT.addBenefit],
        mutationFn: ({ jobId, benefitName }: { jobId: number; benefitName: string }) => removeBenefit(jobId, benefitName),
        onMutate: async (variables) => {
            const queryKey = [QUERY.JOBBENEFIT.getJobIdBenefit, variables.jobId];

            await queryClient.cancelQueries({ queryKey });

            const previousBenefit = queryClient.getQueryData<ApiResponse<JobBenefitResponse>>(queryKey);

            queryClient.setQueryData<ApiResponse<JobBenefitResponse>>(queryKey, (oldData) => {
                if (!oldData || !oldData.data) return oldData;

                return {
                    ...oldData,
                    data: {
                        ...oldData.data,
                        // ✅ FILTER OUT the item that matches variables.benefitName
                        benefitNames: (oldData.data.benefitNames || []).filter((name) => name !== variables.benefitName),
                    },
                };
            });

            return { previousBenefit };
        },
        onError: (error, variables, onMutateResult, context) => {
            const queryKey = [QUERY.JOBBENEFIT.getJobIdBenefit, variables.jobId];
            const previousJobskill = queryClient.getQueryData<ApiResponse<JobBenefitResponse>>(queryKey);
            queryClient.setQueryData([queryKey], previousJobskill);
        },
        onSettled(data, error, variables, onMutateResult, context) {
            const queryKey = [QUERY.JOBBENEFIT.getJobIdBenefit, variables.jobId];
            queryClient.invalidateQueries({ queryKey: queryKey });
        },
        ...options,
    });
};
