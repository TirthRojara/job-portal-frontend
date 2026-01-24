// export const useIsPasswordSetForOauth = (options?: UseQueryOptions<ApiResponse<isPasswordSetResponse>, ApiError>) => {
//     return useQuery({
//         queryKey: ["isPasswordSetForOauth"],
//         queryFn: ({ signal }) => isPasswordSetForOauth({ signal }),
//         ...options,
//     });
// };

import { ApiError, ApiPageResponse, ApiResponse } from "@/types/api";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { CompanyApiResponse, CompanyIndustry, CompanyViewResponse } from "./types";
import { getCompanyById, getCompanyIndustry, getCompanyViews, getMyComanyDetails } from "./api";
import { QUERY } from "@/constants/tanstank.constants";
import { AxiosError } from "axios";

export const useGetMyComanyDetails = (options?: UseQueryOptions<ApiPageResponse<CompanyApiResponse[]>, AxiosError<ApiError>>) => {
    return useQuery({
        queryKey: [QUERY.COMPANY.getMyComanyDetails],
        queryFn: ({ signal }) => getMyComanyDetails({ signal }),
        // gcTime: 0,
        ...options,
    });
};

export const useGetCompanyById = (
    companyId: number,
    options?: UseQueryOptions<ApiResponse<CompanyApiResponse>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.COMPANY.getCompanyById, companyId],
        queryFn: ({ signal }) => getCompanyById({ signal, companyId: companyId }),
        enabled: !!companyId,
        ...options,
    });
};

export const useGetCompanyIndustry = (
    companyId: undefined | number,
    options?: UseQueryOptions<ApiResponse<CompanyIndustry[]>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.COMPANY_INDUSTRY.getCompanyIndustry, companyId],
        queryFn: ({ signal }) => getCompanyIndustry({ signal, companyId: String(companyId) }),
        enabled: !!companyId,
        ...options,
    });
};

export const useGetCompanyView = (
    companyId: number,
    options?: UseQueryOptions<ApiResponse<CompanyViewResponse>, AxiosError<ApiError>>,
) => {
    return useQuery({
        queryKey: [QUERY.COMPANY.getCompanyViewById, companyId],
        queryFn: ({ signal }) => getCompanyViews({ signal, companyId: companyId }),
        enabled: !!companyId,
        ...options,
    });
};
