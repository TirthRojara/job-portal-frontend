import { QUERY } from "@/constants/tanstank.constants";
import { keepPreviousData, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getSavedJobForCandidate } from "./api";
import { ApiError, ApiPageResponse } from "@/types/api";
import { SavedJobResponse } from "./types";
import { AxiosError } from "axios";
import { JobResponseCandidate } from "../../job/api/types";

export const useGetSavedJobForCandidate = (
    page: number,
    limit: number,
    options?: UseQueryOptions<ApiPageResponse<JobResponseCandidate[]>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.JOB.getAllSavedJob, page],
        queryFn: ({ signal }) => getSavedJobForCandidate({ signal, page, limit }),
        enabled: true,
        placeholderData: keepPreviousData,
        ...options,
    });
};
