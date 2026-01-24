import api from "@/lib/axios/client";
import { ApiError, ApiResponse } from "@/types/api";
import { Company, IAddIndustryResponse, ICompanyCreate, ICompanyUpdate, IIndustryList, IMyCompanyIndustriesResponse } from "./types";

// COMPANY API CALLS

export const createCompany = async (companyData: ICompanyCreate): Promise<ApiResponse<Company>> => {
    const res = await api.post("v1/company/me", companyData);
    return res.data;
};

export const updateCompany = async (companyId: number, companyData: ICompanyUpdate): Promise<ApiResponse<Company>> => {
    const res = await api.patch(`v1/company/me/${companyId}`, companyData);
    return res.data;
};

// INDUSTRY API CALLS

export const getIndustryList = async ({ signal }: { signal?: AbortSignal }): Promise<ApiResponse<IIndustryList[]>> => {
    const res = await api.get("v1/company-industry/industryList", {
        signal,
    });
    return res.data;
};

// export const getMyComanyIndustries = async ({ signal, companyId }: { signal?: AbortSignal, companyId: number }): Promise<ApiResponse<IMyCompanyIndustriesResponse[]>> => {
//     const res = await api.get(`v1/company-industry/industry/${companyId}`);
//     return res.data;
// }

export const addIndustry = async (companyId: number, industryId: number, industryName: string): Promise<ApiResponse<IAddIndustryResponse>> => {
    const res = await api.post(`v1/company-industry/me/${companyId}/${industryId}`);
    return res.data;
};

export const removeIndustry = async (companyId: number, industryId: number): Promise<ApiError> => {
    const res = await api.delete(`v1/company-industry/me/${companyId}/${industryId}`);
    return res.data;
};
