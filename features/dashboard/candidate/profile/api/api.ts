//CANDIDATE PROFILE CREATE

import api from "@/lib/axios/client";
import {
    CandidateEducationPayload,
    CandidateEducationResponse,
    CandidateExperiencePayload,
    CandidateExperienceResponse,
    CandidateSkillPayload,
    CandidateSkillResponse,
    createLanguagePayload,
    CreateProfilePayload,
    CreateProfileResponse,
    ResumePayload,
    updateLanguageLevelPayload,
    UpdateProfilePayload,
} from "./types";
import { ApiError, ApiResponse } from "@/types/api";
import { AxiosResponse } from "axios";
import { number, string } from "zod";

// ---------------------
//   PROFILE
// ---------------------

export const createCandidateProfile = async (payload: CreateProfilePayload): Promise<CreateProfileResponse> => {
    const res = await api.post("v1/candidate-profiles", payload);
    return res.data;
};

// for candidate
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

// for recruiter
export const getCandidateProfilById = async ({
    signal,
    candidateProfileId,
}: {
    signal?: AbortSignal;
    candidateProfileId: string;
}): Promise<ApiResponse<CreateProfileResponse>> => {
    const res = await api.get(`v1/candidate-profiles/${candidateProfileId}`, {
        signal,
    });
    return res.data;
};

// ---------------------------
//   LANGUAGE
// ---------------------------

export const createLanguage = async (payload: createLanguagePayload): Promise<ApiResponse<createLanguagePayload>> => {
    const res = await api.post("v1/candidate-language/me", payload);
    return res.data;
};

// for candidate
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

// for recruiter
export const getCandidateLanguageForRecruiter = async ({
    signal,
    jobId,
    candidateProfileId,
}: {
    signal?: AbortSignal;
    jobId: string;
    candidateProfileId: string;
}): Promise<ApiResponse<createLanguagePayload[]>> => {
    const res = await api.get(`v1/candidate-language/${jobId}/${candidateProfileId}`, {
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

// -----------------------
// SKILL
// -----------------------

export const createSkill = async (payload: CandidateSkillPayload): Promise<ApiResponse<CandidateSkillResponse>> => {
    const res = await api.post(`v1/candidate-skill/me`, payload);
    return res.data;
};

// for candidate
export const getCandidateSkill = async ({ signal }: { signal: AbortSignal }): Promise<ApiResponse<CandidateSkillResponse[]>> => {
    const res = await api.get(`v1/candidate-skill/me`);
    return res.data;
};

// for recruiter
export const getCandidateSkillById = async ({
    signal,
    jobId,
    candidateProfileId,
}: {
    signal: AbortSignal;
    jobId: string;
    candidateProfileId: string;
}): Promise<ApiResponse<CandidateSkillResponse[]>> => {
    const res = await api.get(`v1/candidate-skill/${jobId}/${candidateProfileId}`, {
        signal,
    });
    return res.data;
};

export const deleteSkill = async (payload: CandidateSkillPayload): Promise<ApiResponse<CandidateSkillResponse>> => {
    const res = await api.delete(`v1/candidate-skill/me`, {
        data: payload,
    });
    return res.data;
};

// --------------------
// EDUCATION
// --------------------

// for candidate
export const getCandidateEducation = async ({
    signal,
}: {
    signal: AbortSignal;
}): Promise<ApiResponse<CandidateEducationResponse[]>> => {
    const res = await api.get(`v1/candidate-education/me`, { signal });
    return res.data;
};

// for recruiter
export const getCandidateEducationForRecruiter = async ({
    signal,
    jobId,
    candidateProfileId,
}: {
    signal: AbortSignal;
    jobId: string;
    candidateProfileId: string;
}): Promise<ApiResponse<CandidateEducationResponse[]>> => {
    const res = await api.get(`v1/candidate-education/${jobId}/${candidateProfileId}`, { signal });
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

// --------------------
//  EXPERIENCE
// --------------------

// for candidate
export const getCandidateExperience = async ({
    signal,
}: {
    signal: AbortSignal;
}): Promise<ApiResponse<CandidateExperienceResponse[]>> => {
    const res = await api.get(`v1/candidate-experience/me`, { signal });
    return res.data;
};

// for recruiter
export const getCandidateExperienceForRecruiter = async ({
    signal,
    jobId,
    candidateProfileId,
}: {
    signal: AbortSignal;
    jobId: string;
    candidateProfileId: string;
}): Promise<ApiResponse<CandidateExperienceResponse[]>> => {
    const res = await api.get(`v1/candidate-experience/${jobId}/${candidateProfileId}`, { signal });
    return res.data;
};

export const createExperience = async (
    payload: CandidateExperiencePayload,
): Promise<ApiResponse<CandidateExperienceResponse>> => {
    const res = await api.post(`v1/candidate-experience/me`, payload);
    return res.data;
};

export const editExperience = async (
    candidateExperienceId: number,
    payload: Partial<CandidateExperiencePayload>,
): Promise<ApiResponse<CandidateExperienceResponse>> => {
    const res = await api.patch(`v1/candidate-experience/me/${candidateExperienceId}`, payload);
    return res.data;
};

export const deleteExperience = async (candidateExperienceId: number): Promise<ApiError> => {
    const res = await api.delete(`v1/candidate-experience/me/${candidateExperienceId}`);
    return res.data;
};

// --------------------
// RESUME
// --------------------

// for candidate
export const getCandidateResume = async ({ signal }: { signal: AbortSignal }): Promise<AxiosResponse<Blob>> => {
    const res = await api.get(`v1/candidate-profiles/resume/candidate`, { responseType: "blob", signal });
    return res;
};

// for recruiter
export const getCandidateResumeForRecruiter = async ({
    signal,
    jobId,
    candidateProfileId,
}: {
    signal: AbortSignal;
    jobId: string;
    candidateProfileId: string;
}): Promise<AxiosResponse<Blob>> => {
    const res = await api.get(`v1/candidate-profiles/resume/recruiter/${jobId}/${candidateProfileId}`, {
        responseType: "blob",
        signal,
    });
    return res;
};

export const uploadResume = async (payload: ResumePayload): Promise<ApiResponse<CreateProfileResponse>> => {
    const res = await api.patch("v1/candidate-profiles/update", payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};
