import { SearchParams } from "@/features/dashboard/recruiter/jobpost/api/types";
import { ApiError, ApiPageResponse } from "@/types/api";
import { InfiniteData, useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getAllJobsCandidate } from "./api";
import { JobResponseCandidate } from "./types";

export const useGetAllJobsCandidate = (
    // { page, limit, filter, location, salaryMin, workplace }: SearchParams,
    searchParams: SearchParams,
    options?: UseInfiniteQueryOptions<
        ApiPageResponse<JobResponseCandidate[]>, // 1. TQueryFnData
        AxiosError<ApiError>, // 2. TError
        InfiniteData<ApiPageResponse<JobResponseCandidate[]>>, // 3. TData
        [string, SearchParams], // 4. TQueryKey
        number // 5. TPageParam
    >,
) => {
    return useInfiniteQuery({
        queryKey: ["getAllJobs", searchParams],
        queryFn: ({ signal, pageParam }) => getAllJobsCandidate({ signal, searchParams: { ...searchParams, page: pageParam } }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = Number(lastPage.pagination.currentPage);
            const totalPages = Number(lastPage.pagination.totalPages);

            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        ...options,
    });
};
