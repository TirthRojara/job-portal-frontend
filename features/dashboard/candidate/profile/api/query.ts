"use client";
import { ApiResponse } from "@/types/api";
import { StaleTime, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import {
    getCandidateEducation,
    getCandidateEducationForRecruiter,
    getCandidateExperience,
    getCandidateExperienceForRecruiter,
    getCandidateLanguage,
    getCandidateLanguageForRecruiter,
    getCandidateProfilById,
    getCandidateProfile,
    getCandidateResume,
    getCandidateResumeForRecruiter,
    getCandidateSkill,
    getCandidateSkillById,
} from "./api";
import { QUERY } from "@/constants/tanstank.constants";
import {
    CandidateEducationResponse,
    CandidateExperienceResponse,
    CandidateSkillResponse,
    createLanguagePayload,
    CreateProfileResponse,
} from "./types";

// ---------------------
//  PROFILE
// ---------------------

// candidate
export const useGetCandidateProfile = (
    role: string,
    options?: UseQueryOptions<ApiResponse<CreateProfileResponse>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.CANDIDATE_PROFILE.getCandidateProfile, role],
        queryFn: ({ signal }) => getCandidateProfile({ signal }),
        enabled: !!role && role === "CANDIDATE",
        ...options,
    });
};

// recruiter
export const useGetCandidateProfilById = (
    role: string,
    candidateProfileId: string,
    options?: UseQueryOptions<ApiResponse<CreateProfileResponse>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.CANDIDATE_PROFILE.getCandidateProfile, role, candidateProfileId],
        queryFn: ({ signal }) => getCandidateProfilById({ signal, candidateProfileId }),
        enabled: !!role && role === "RECRUITER",
        ...options,
    });
};

// --------------------
//  LANGUAGE
// --------------------

export const useGetCandidateLanguage = (
    role: string,
    options?: UseQueryOptions<ApiResponse<createLanguagePayload[]>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.CANDIDATE_LANGUAGE.getCandidateLanguage, role],
        queryFn: ({ signal }) => getCandidateLanguage({ signal }),
        enabled: !!role && role === "CANDIDATE",
        ...options,
    });
};
export const useGetCandidateLanguageForRecruiter = (
    role: string,
    jobId: string,
    candidateProfileId: string,
    options?: UseQueryOptions<ApiResponse<createLanguagePayload[]>, AxiosError<ApiError>>,
) => {
    const canFetch = role === "RECRUITER" && Boolean(jobId) && Boolean(candidateProfileId);

    return useQuery({
        queryKey: canFetch
            ? [QUERY.CANDIDATE_LANGUAGE.getCandidateLanguage, role, jobId, candidateProfileId]
            : [QUERY.CANDIDATE_LANGUAGE.getCandidateLanguage, "disabled"],
        queryFn: ({ signal }) => getCandidateLanguageForRecruiter({ signal, jobId, candidateProfileId }),
        enabled: canFetch,
        ...options,
    });
};

// --------------------
// SKILL
// --------------------

// for candidate
export const useGetCandidateSkill = (
    role: string,
    options?: UseQueryOptions<ApiResponse<CandidateSkillResponse[]>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.CANDIDATE_SKILL.getCandidateSkill],
        queryFn: ({ signal }) => getCandidateSkill({ signal }),
        enabled: !!role && role === "CANDIDATE",
        ...options,
    });
};

// for recruiter
export const useGetCandidateSkillById = (
    role: string,
    jobId: string,
    candidateProfileId: string,
    options?: UseQueryOptions<ApiResponse<CandidateSkillResponse[]>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.CANDIDATE_SKILL.getCandidateSkill, role, candidateProfileId],
        queryFn: ({ signal }) => getCandidateSkillById({ signal, jobId, candidateProfileId }),
        enabled: !!role && role === "RECRUITER",
        ...options,
    });
};

// --------------------
// EDUCATION
// --------------------

export const useGetCandidateEducation = (
    role: string,
    options?: UseQueryOptions<ApiResponse<CandidateEducationResponse[]>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.CANDIDATE_EDUCATION.getCandidateEducation, role],
        queryFn: ({ signal }) => getCandidateEducation({ signal }),
        enabled: !!role && role === "CANDIDATE",
        ...options,
    });
};

export const useGetCandidateEducationForRecruiter = (
    role: string,
    jobId: string,
    candidateProfileId: string,
    options?: UseQueryOptions<ApiResponse<CandidateEducationResponse[]>, AxiosError<ApiError>>,
) => {
    const canFetch = role === "RECRUITER" && Boolean(jobId) && Boolean(candidateProfileId);

    return useQuery({
        queryKey: canFetch
            ? [QUERY.CANDIDATE_EDUCATION.getCandidateEducation, role, jobId, candidateProfileId]
            : [QUERY.CANDIDATE_EDUCATION.getCandidateEducation, "disabled"],
        queryFn: ({ signal }) => getCandidateEducationForRecruiter({ signal, jobId, candidateProfileId }),
        enabled: canFetch,
        ...options,
    });
};

// --------------------
//  EXPERIENCE
// --------------------

export const useGetCandidateExperience = (
    role: string,
    options?: UseQueryOptions<ApiResponse<CandidateExperienceResponse[]>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.CANDIDATE_EXPERIENCE.getCandidateExperience, role],
        queryFn: ({ signal }) => getCandidateExperience({ signal }),
        enabled: !!role && role === "CANDIDATE",
        ...options,
    });
};

export const useGetCandidateExperienceForRecruiter = (
    role: string,
    jobId: string,
    candidateProfileId: string,
    options?: UseQueryOptions<ApiResponse<CandidateExperienceResponse[]>, AxiosError<ApiError>>,
) => {
    const canFetch = role === "RECRUITER" && Boolean(jobId) && Boolean(candidateProfileId);

    return useQuery({
        // queryKey: [QUERY.CANDIDATE_EXPERIENCE.getCandidateExperience, role, jobId, candidateProfileId],
        queryKey: canFetch
            ? [QUERY.CANDIDATE_EXPERIENCE.getCandidateExperience, jobId, candidateProfileId]
            : ["candidateExperienceByRecruiter-disabled"],
        queryFn: ({ signal }) => getCandidateExperienceForRecruiter({ signal, jobId, candidateProfileId }),
        // enabled: !!role && role === "RECRUITER" && !!jobId && !!candidateProfileId,
        enabled: canFetch,
        ...options,
    });
};

// --------------------
// RESUME
// --------------------

export const useGetCandidateResume = (options?: UseQueryOptions<AxiosResponse<Blob>, AxiosError<ApiError>>) => {
    return useQuery({
        queryKey: [QUERY.CANDIDATE_RESUME.getCandidateResume],
        queryFn: ({ signal }) => getCandidateResume({ signal }),
        enabled: true,
        ...options,
    });
};

export const useGetCandidateResumeForRecruiter = (
    jobId: string,
    candidateProfileId: string,
    options?: UseQueryOptions<AxiosResponse<Blob>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.CANDIDATE_RESUME.getCandidateResume],
        queryFn: ({ signal }) => getCandidateResumeForRecruiter({ signal, jobId, candidateProfileId }),
        enabled: false,
        ...options,
    });
};
