import api from "@/lib/axios/client";
import { ApiPageResponse, ApiResponse } from "@/types/api";
import { CompanyApiResponse, CompanyIndustry } from "./types";

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
