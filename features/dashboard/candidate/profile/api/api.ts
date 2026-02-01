//CANDIDATE PROFILE CREATE

import api from "@/lib/axios/client";
import { CreateProfilePayload, CreateProfileResponse, UpdateProfilePayload } from "./types";
import { ApiResponse } from "@/types/api";

//  CANDIDATE PROFILE

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
