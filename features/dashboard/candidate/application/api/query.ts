import { ApiPageResponse } from "@/types/api";
import { keepPreviousData, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { ApplicationResponse } from "./types";
import { getAllApplication } from "./api";
import { QUERY } from "@/constants/tanstank.constants";

export const useGetAllApplication = (
    page: number,
    limit: number,
    options?: UseQueryOptions<ApiPageResponse<ApplicationResponse[]>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.APPLY.getAllApplication, page],
        queryFn: ({ signal }) => getAllApplication({ signal, page, limit }),
        enabled: true,
        placeholderData: keepPreviousData,
        ...options,
    });
};
