import { ApiPageResponse, ApiResponse } from "@/types/api";
import { InfiniteData, useInfiniteQuery, UseInfiniteQueryOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { ApplicantsResponse, ApplicationByIdResponse } from "./types";
import { getApplicantById, getApplicants } from "./api";
import { QUERY } from "@/constants/tanstank.constants";

export const useGetApplicants = (
    {
        limit,
        jobId,
        companyId,
    }: {
        limit: number;
        jobId: number;
        companyId: number;
    },
    options?: UseInfiniteQueryOptions<
        ApiPageResponse<ApplicantsResponse[]>, // 1. TQueryFnData
        AxiosError<ApiError>, // 2. TError
        InfiniteData<ApiPageResponse<ApplicantsResponse[]>>, // 3. TData
        [
            string,
            {
                limit: number;
                jobId: number;
                companyId: number;
            },
        ], // 4. TQueryKey
        number // 5. TPageParam
    >,
) => {
    return useInfiniteQuery({
        queryKey: ["getApplicants", { limit, jobId, companyId }],
        queryFn: ({ signal, pageParam }) => getApplicants({ signal, page: pageParam, limit, jobId, companyId }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = Number(lastPage.pagination.currentPage);
            const totalPages = Number(lastPage.pagination.totalPages);

            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        enabled: !!companyId && !!jobId,
        ...options,
    });
};

export const useGetApplicantById = (
    jobId: string,
    candidateProfileId: string,
    options?: UseQueryOptions<ApiResponse<ApplicationByIdResponse>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.APPLY.getApplicationById, jobId, candidateProfileId],
        queryFn: ({ signal }) => getApplicantById({ signal, jobId, candidateProfileId }),
        enabled: true,
        ...options,
    });
};
