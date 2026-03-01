import { QUERY } from "@/constants/tanstank.constants";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { CandidteStates, getCandidateStates, getRecruiterStates, getUserData, RecruiterStates } from "./api";
import { ApiError, ApiResponse } from "@/types/api";
import { AxiosError } from "axios";

export type UserData = {
    id: number;
    email: string;
    name: string;
    role: string;
    authType: string;
    companyId: number | undefined;
    candidateProfileId: number | undefined | null;
};

export const useGetUserData = (options?: UseQueryOptions<ApiResponse<UserData>, AxiosError<ApiError>>) => {
    return useQuery({
        queryKey: [QUERY.USER.getUserData],
        queryFn: ({ signal }) => getUserData({ signal }),
        enabled: true,
        ...options,
    });
};

export const useGetCandidateStates = (
    role: string,
    options?: UseQueryOptions<ApiResponse<CandidteStates>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.USER.getCandidateStates],
        queryFn: ({ signal }) => getCandidateStates({ signal }),
        enabled: role === "CANDIDATE",
        ...options,
    });
};

export const useGetRecruiterStates = (
    role: string,
    companyId: number,
    enabled: boolean,
    options?: UseQueryOptions<ApiResponse<RecruiterStates>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.USER.getRecruiterStates],
        queryFn: ({ signal }) => getRecruiterStates({ signal, companyId }),
        enabled: role === "RECRUITER" && !!companyId && enabled,
        ...options,
    });
};
