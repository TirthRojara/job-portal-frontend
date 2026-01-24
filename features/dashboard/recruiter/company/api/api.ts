import api from "@/lib/axios/client";
import { ApiPageResponse, ApiResponse } from "@/types/api";
import { CompanyApiResponse, CompanyIndustry, CompanyViewResponse } from "./types";

// Recruiter
export const getMyComanyDetails = async ({
    signal,
}: {
    signal?: AbortSignal;
}): Promise<ApiPageResponse<CompanyApiResponse[]>> => {
    const res = await api.get("v1/company/me", {
        signal: signal,
    });
    // await new Promise((reject) => setTimeout(reject, 2000));
    return res.data;
};

export const getCompanyViews = async ({
    signal,
    companyId,
}: {
    signal?: AbortSignal;
    companyId: number;
}): Promise<ApiResponse<CompanyViewResponse>> => {
    const res = await api.get(`v1/company/${companyId}/view`, {
        signal: signal,
    });
    return res.data;
};

// Candidate
export const getCompanyById = async ({ signal, companyId }: { signal?: AbortSignal; companyId: number }): Promise<any> => {
    const res = await api.get(`/v1/company/${companyId}`, {
        signal: signal,
    });
    return res.data;
};

// Both
export const getCompanyIndustry = async ({
    signal,
    companyId,
}: {
    signal?: AbortSignal;
    companyId: string;
}): Promise<ApiResponse<CompanyIndustry[]>> => {
    const res = await api.get(`v1/company-industry/industry/${companyId}`, {
        signal: signal,
    });
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return res.data;
};
