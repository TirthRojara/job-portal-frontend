"use client";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Company, ICompanyCreate, ICompanyUpdate } from "./types";
import { ApiError, ApiResponse } from "@/types/api";
import { AxiosError } from "axios";
import { create } from "domain";
import { createCompany, updateCompany } from "./api";
import { useRouter } from "next/navigation";
import { MUTATION, QUERY } from "@/constants/tanstank.constants";

export const useCreateCompany = (options?: UseMutationOptions<ApiResponse<Company>, ApiError, ICompanyCreate>) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["createCompany"],
        mutationFn: (data: ICompanyCreate) => createCompany(data),
        onSuccess: (data: ApiResponse<Company>) => {
            queryClient.invalidateQueries({ queryKey: [QUERY.COMPANY.getMyComanyDetails] });
            router.push("/dashboard/recruiter/company");
            toast.success(data.message || "Company created successfully!");
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(`${error.response?.data.message}` || "Failed to create company. Please try again.");
        },
        ...options,
    });
};

interface UpdateCompanyVariables {
    companyId: number;
    data: ICompanyUpdate;
}

export const useUpdateCompany = (
    // companyId: string,
    options?: UseMutationOptions<ApiResponse<Company>, ApiError, UpdateCompanyVariables>,
) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION.COMPANY.updateCompany],
        mutationFn: ({ companyId, data }: UpdateCompanyVariables) => updateCompany(companyId, data),
        onSuccess: (data: ApiResponse<Company>) => {
            queryClient.invalidateQueries({ queryKey: [QUERY.COMPANY.getMyComanyDetails] });
            router.push("/dashboard/recruiter/company");
            toast.success(data.message || "Company updated successfully!");
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(`${error.response?.data.message}` || "Failed to update company. Please try again.");
            console.error("Update company error details:", error);
        },
        ...options,
    });
};
