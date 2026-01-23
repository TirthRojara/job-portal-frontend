import api from "@/lib/axios/client";
import { ApiResponse } from "@/types/api";
import { Company, ICompanyCreate, ICompanyUpdate } from "./types";



export const createCompany = async (companyData: ICompanyCreate): Promise<ApiResponse<Company>> => {
    const res = await api.post("v1/company/me", companyData);
    return res.data;
};

export const updateCompany = async (companyId: number, companyData: ICompanyUpdate): Promise<ApiResponse<Company>> => {
    const res = await api.patch(`v1/company/me/${companyId}`, companyData);
    return res.data;
};
