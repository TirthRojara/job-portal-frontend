import { ApiResponse } from "@/types/api";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { getCandidateProfile } from "./api";
import { QUERY } from "@/constants/tanstank.constants";
import { CreateProfileResponse } from "./types";

export const useGetCandidateProfile = (options?: UseQueryOptions<ApiResponse<CreateProfileResponse>, AxiosError<ApiError>>) => {
    return useQuery({
        queryKey: [QUERY.CANDIDATE_PROFILE.getCandidateProfile],
        queryFn: ({ signal }) => getCandidateProfile({ signal }),
        enabled: true,
        ...options,
    });
};
