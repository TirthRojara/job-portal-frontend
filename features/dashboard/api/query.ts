import { QUERY } from "@/constants/tanstank.constants";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getUserData } from "./api";
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
