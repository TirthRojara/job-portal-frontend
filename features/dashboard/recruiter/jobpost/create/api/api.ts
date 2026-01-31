import api from "@/lib/axios/client";
import { ApiError, ApiResponse } from "@/types/api";
import {
    addBenefitResponse,
    addSkillResponse,
    CreateJobPayload,
    CreateJobResponse,
    EditJobPayload,
    EditJobResponse,
    updateStatusPayload,
} from "./types";
import { EXPORT_DETAIL } from "next/dist/shared/lib/constants";
import { Exo } from "next/font/google";

// JOB

export const createJob = async (companyId: number, jobData: CreateJobPayload): Promise<ApiResponse<CreateJobResponse>> => {
    const res = await api.post(`v1/job/${companyId}`, jobData);
    return res.data;
};

export const editJob = async (
    jobId: number,
    companyId: number,
    jobData: EditJobPayload,
): Promise<ApiResponse<EditJobResponse>> => {
    const res = await api.patch(`v1/job/me/${jobId}/${companyId}`, jobData);
    return res.data;
};

export const updateJobStatus = async (jobId: number, companyId: number, payload: updateStatusPayload): Promise<ApiError> => {
    const res = await api.patch(`v1/job/me/status/${jobId}/${companyId}`, payload);
    return res.data;
};

export const deleteJob = async (jobId: number, companyId: number): Promise<ApiError> => {
    const res = await api.delete(`v1/job/me/delete/${jobId}/${companyId}`);
    return res.data;
};

// SKILL

export const addSkill = async (jobId: number, skillId: number): Promise<ApiResponse<addSkillResponse>> => {
    const res = await api.post(`v1/job-skill/me/${jobId}/${skillId}`);
    return res.data;
};

export const removeSkill = async (jobId: number, skillId: number): Promise<ApiError> => {
    const res = await api.delete(`v1/job-skill/me/${jobId}/${skillId}`);
    return res.data;
};

// BENEFIT

export const addBenefit = async (jobId: number, benefitName: string): Promise<ApiResponse<addBenefitResponse>> => {
    const res = await api.post(`v1/job-benefit/me/${jobId}`, { benefitName });
    return res.data;
};

export const removeBenefit = async (jobId: number, benefitName: string): Promise<ApiError> => {
    const res = await api.delete(`v1/job-benefit/me/${jobId}/${encodeURIComponent(benefitName)}`);
    return res.data;
};
