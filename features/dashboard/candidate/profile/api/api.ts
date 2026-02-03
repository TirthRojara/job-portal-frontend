//CANDIDATE PROFILE CREATE

import api from "@/lib/axios/client";
import {
    CandidateEducationPayload,
    CandidateEducationResponse,
    CandidateSkillPayload,
    CandidateSkillResponse,
    createLanguagePayload,
    CreateProfilePayload,
    CreateProfileResponse,
    updateLanguageLevelPayload,
    UpdateProfilePayload,
} from "./types";
import { ApiError, ApiResponse } from "@/types/api";

//   PROFILE

export const createCandidateProfile = async (payload: CreateProfilePayload): Promise<CreateProfileResponse> => {
    const res = await api.post("v1/candidate-profiles", payload);
    return res.data;
};

export const getCandidateProfile = async ({ signal }: { signal?: AbortSignal }): Promise<ApiResponse<CreateProfileResponse>> => {
    const res = await api.get("v1/candidate-profiles/me", {
        signal,
    });
    return res.data;
};

export const updateCandidateProfile = async (payload: UpdateProfilePayload): Promise<ApiResponse<CreateProfileResponse>> => {
    const res = await api.patch("v1/candidate-profiles/update", payload);
    return res.data;
};

//   LANGUAGE

export const createLanguage = async (payload: createLanguagePayload): Promise<ApiResponse<createLanguagePayload>> => {
    const res = await api.post("v1/candidate-language/me", payload);
    return res.data;
};

export const getCandidateLanguage = async ({
    signal,
}: {
    signal?: AbortSignal;
}): Promise<ApiResponse<createLanguagePayload[]>> => {
    const res = await api.get("v1/candidate-language/me", {
        signal,
    });
    return res.data;
};

export const updateLanguageLevel = async (
    languageName: string,
    payload: updateLanguageLevelPayload,
): Promise<ApiResponse<createLanguagePayload>> => {
    const res = await api.patch(`v1/candidate-language/me/${languageName}`, payload);
    return res.data;
};

export const deleteLanguage = async (languageName: string): Promise<ApiError> => {
    const res = await api.delete(`v1/candidate-language/me/${languageName}`);
    return res.data;
};

// SKILL

export const createSkill = async (payload: CandidateSkillPayload): Promise<ApiResponse<CandidateSkillResponse>> => {
    const res = await api.post(`v1/candidate-skill/me`, payload);
    return res.data;
};

export const getCandidateSkill = async ({ signal }: { signal: AbortSignal }): Promise<ApiResponse<CandidateSkillResponse[]>> => {
    const res = await api.get(`v1/candidate-skill/me`);
    return res.data;
};

export const deleteSkill = async (payload: CandidateSkillPayload): Promise<ApiResponse<CandidateSkillResponse>> => {
    const res = await api.delete(`v1/candidate-skill/me`, {
        data: payload,
    });
    return res.data;
};

// EDUCATION

export const getCandidateEducation = async ({
    signal,
}: {
    signal: AbortSignal;
}): Promise<ApiResponse<CandidateEducationResponse[]>> => {
    const res = await api.get(`v1/candidate-education/me`, { signal });
    return res.data;
};

export const createEducation = async (payload: CandidateEducationPayload): Promise<ApiResponse<CandidateEducationResponse>> => {
    const res = await api.post(`v1/candidate-education/me`, payload);
    return res.data;
};

export const editEducation = async (
    candidateEducationId: number,
    payload: Partial<CandidateEducationPayload>,
): Promise<ApiResponse<CandidateEducationResponse>> => {
    const res = await api.patch(`v1/candidate-education/me/${candidateEducationId}`, payload);
    return res.data;
};

export const deleteEducation = async (candidateEducationId: number): Promise<ApiError> => {
    const res = await api.delete(`v1/candidate-education/me/${candidateEducationId}`);
    return res.data;
};
