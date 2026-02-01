import { ApiResponse } from "@/types/api";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { getCandidateLanguage, getCandidateProfile } from "./api";
import { QUERY } from "@/constants/tanstank.constants";
import { createLanguagePayload, CreateProfileResponse } from "./types";

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
