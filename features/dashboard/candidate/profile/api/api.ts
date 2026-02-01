//CANDIDATE PROFILE CREATE

import api from "@/lib/axios/client";
import {
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
): Promise<ApiResponse<CreateProfileResponse>> => {
    const res = await api.patch(`v1/candidate-language/me/${languageName}`, payload);
    return res.data;
};

export const deleteLanguage = async (languageName: string): Promise<ApiError> => {
    const res = await api.delete(`v1/candidate-language/me/${languageName}`);
    return res.data;
};
