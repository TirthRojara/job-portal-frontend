import { QUERY } from "@/constants/tanstank.constants";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getIndustryList } from "./api";
import { ApiError, ApiResponse } from "@/types/api";
import { IIndustryList } from "./types";
import { AxiosError } from "axios";

export const useGetCompanyIndustryList = (options?: UseQueryOptions<ApiResponse<IIndustryList[]>, AxiosError<ApiError>>) => {
    return useQuery({
        queryKey: [QUERY.COMPANY_INDUSTRY.getIndustryList],
        queryFn: ({ signal }) => getIndustryList({ signal }),
        ...options,
    });
};
