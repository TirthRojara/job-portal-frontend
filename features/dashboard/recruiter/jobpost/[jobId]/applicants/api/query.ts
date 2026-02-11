import { ApiPageResponse } from "@/types/api";
import { InfiniteData, useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { ApplicantsResponse } from "./types";
import { getApplicants } from "./api";

export const useGetApplicants = (
    {
        // page,
        limit,
        jobId,
        companyId,
    }: {
        // page: number;
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
                // page: number;
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

// const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useGetAllJobsCandidate({
//         limit: 10,
//         page: 1,
//         filter: filters.filter,
//         location: filters.location,
//         salaryMin: filters.salaryMin ? filters.salaryMin * 1000 : undefined,
//         workplace: filters.workplace,
//     });
