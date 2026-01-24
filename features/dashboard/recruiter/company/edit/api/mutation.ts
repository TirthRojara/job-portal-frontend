"use client";
import { MutationFunctionContext, useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    AddIndustryVariables,
    Company,
    IAddIndustryResponse,
    ICompanyCreate,
    ICompanyUpdate,
    RemoveIndustryVariables,
} from "./types";
import { ApiError, ApiResponse } from "@/types/api";
import { AxiosError } from "axios";
import { create } from "domain";
import { addIndustry, createCompany, removeIndustry, updateCompany } from "./api";
import { useRouter } from "next/navigation";
import { MUTATION, QUERY } from "@/constants/tanstank.constants";
import { error } from "console";

// COMPANY MUTATIONS

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

export const useUpdateCompany = (options?: UseMutationOptions<ApiResponse<Company>, ApiError, UpdateCompanyVariables>) => {
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

// INDUSTRY MUTATIONS

export const useAddIndustry = (
    options?: UseMutationOptions<ApiResponse<IAddIndustryResponse>, ApiError, AddIndustryVariables>,
) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationKey: [MUTATION.COMPANY_INDUSTRY.addIndustry],
        mutationFn: ({ companyId, industryId, industryName }) => addIndustry(companyId, industryId, industryName),
        onMutate: async ({ companyId, industryId, industryName }) => {
            const queryKey = [QUERY.COMPANY_INDUSTRY.getCompanyIndustry, companyId];

            await queryClient.cancelQueries({ queryKey: queryKey });

            const previousIndustries = queryClient.getQueryData<ApiResponse<IAddIndustryResponse[]>>(queryKey);

            queryClient.setQueryData<ApiResponse<IAddIndustryResponse[]>>(queryKey, (oldData) => {
                if (!oldData || !oldData.data) return oldData;

                const exists = oldData.data.some((item) => item.industry.name.toLowerCase() === industryName.toLowerCase());

                if (exists) {
                    console.log("Industry already exists in list, skipping optimistic add.");
                    return oldData;
                }

                const optimisticIndustry: IAddIndustryResponse = {
                    id: Math.floor(Math.random() * 1000000), // Temporary ID
                    industry: {
                        name: industryName,
                    },
                };

                return {
                    ...oldData,
                    data: [...(oldData.data || []), optimisticIndustry],
                };
            });

            return previousIndustries;
        },
        onError: (error: AxiosError<ApiError>) => {
            // toast.error("Failed to add industry. Please try again.");
        },
        onSettled: (data, error, variables) => {
            const queryKey = [QUERY.COMPANY_INDUSTRY.getCompanyIndustry, variables?.companyId];
            queryClient.invalidateQueries({ queryKey: queryKey });
        },

        onSuccess: (data: ApiResponse<IAddIndustryResponse>) => {
            // console.log("Add industry success", data);
        },

        ...options,
    });
};

export const useRemoveIndustry = (
    options?: UseMutationOptions<ApiResponse<IAddIndustryResponse>, ApiError, RemoveIndustryVariables>,
) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationKey: [MUTATION.COMPANY_INDUSTRY.remove],
        mutationFn: ({ companyId, industryId }) => removeIndustry(companyId, industryId),
        onMutate: async ({ companyId, industryId }) => {
            const queryKey = [QUERY.COMPANY_INDUSTRY.getCompanyIndustry, companyId];

            await queryClient.cancelQueries({ queryKey: queryKey });

            const previousIndustries = queryClient.getQueryData<ApiResponse<IAddIndustryResponse[]>>(queryKey);

            queryClient.setQueryData<ApiResponse<IAddIndustryResponse[]>>(queryKey, (oldData) => {
                if (!oldData || !oldData.data) return oldData;

                return {
                    ...oldData,
                    data: oldData.data.filter((item) => item.id !== industryId),
                };
            });

            return previousIndustries;
        },
        onError: (error: AxiosError<ApiError>) => {
            console.log("Remove Industry Error", error);
        },
        onSuccess: (data: ApiResponse<IAddIndustryResponse>) => {
            console.log("Remove industry success", data);
        },
        ...options,
    });
};
