'use client';
import { ApiResponse } from "@/types/api";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import {
    getCandidateEducation,
    getCandidateExperience,
    getCandidateLanguage,
    getCandidateProfile,
    getCandidateResume,
    getCandidateSkill,
} from "./api";
import { QUERY } from "@/constants/tanstank.constants";
import {
    CandidateEducationResponse,
    CandidateExperienceResponse,
    CandidateSkillResponse,
    createLanguagePayload,
    CreateProfileResponse,
} from "./types";

//  PROFILE

export const useGetCandidateProfile = (options?: UseQueryOptions<ApiResponse<CreateProfileResponse>, AxiosError<ApiError>>) => {
    return useQuery({
        queryKey: [QUERY.CANDIDATE_PROFILE.getCandidateProfile],
        queryFn: ({ signal }) => getCandidateProfile({ signal }),
        enabled: true,
        ...options,
    });
};

//  LANGUAGE

export const useGetCandidateLanguage = (
    options?: UseQueryOptions<ApiResponse<createLanguagePayload[]>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.CANDIDATE_LANGUAGE.getCandidateLanguage],
        queryFn: ({ signal }) => getCandidateLanguage({ signal }),
        enabled: true,
        ...options,
    });
};

// SKILL

export const useGetCandidateSkill = (options?: UseQueryOptions<ApiResponse<CandidateSkillResponse[]>, AxiosError<ApiError>>) => {
    return useQuery({
        queryKey: [QUERY.CANDIDATE_SKILL.getCandidateSkill],
        queryFn: ({ signal }) => getCandidateSkill({ signal }),
        enabled: true,
        ...options,
    });
};

// EDUCATION

export const useGetCandidateEducation = (
    options?: UseQueryOptions<ApiResponse<CandidateEducationResponse[]>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.CANDIDATE_EDUCATION.getCandidateEducation],
        queryFn: ({ signal }) => getCandidateEducation({ signal }),
        enabled: true,
        ...options,
    });
};

//  EXPERIENCE

export const useGetCandidateExperience = (
    options?: UseQueryOptions<ApiResponse<CandidateExperienceResponse[]>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.CANDIDATE_EXPERIENCE.getCandidateExperience],
        queryFn: ({ signal }) => getCandidateExperience({ signal }),
        enabled: true,
        ...options,
    });
};

// RESUME

export const useGetCandidateResume = (options?: UseQueryOptions<AxiosResponse<Blob>, AxiosError<ApiError>>) => {
    return useQuery({
        queryKey: [QUERY.CANDIDATE_RESUME.getCandidateResume],
        queryFn: ({ signal }) => getCandidateResume({ signal }),
        enabled: true,
        ...options,
    });
};
