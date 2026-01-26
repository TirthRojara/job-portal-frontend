import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { applyJobResponse } from "./types";
import { ApiError, ApiResponse } from "@/types/api";
import { AxiosError } from "axios";
import { applyJob, toggleSaveJob } from "./api";
import { MUTATION } from "@/constants/tanstank.constants";
import { toast } from "sonner";

export const useApplyJob = (
    options?: UseMutationOptions<ApiResponse<applyJobResponse>, AxiosError<ApiError>, { jobId: number }>,
) => {
    return useMutation({
        mutationKey: [MUTATION.APPLY.applyJob],
        mutationFn: ({ jobId }: { jobId: number }) => applyJob({ jobId }),
        onError: (error) => {
            console.error("Apply job error details:", error);
            toast.error(`${error.response?.data.message}` || "Failed to apply for job. Please try again.");
        },
        onSuccess: (data) => {
            console.log("Apply job success details:", data);
            toast.success(data.message || "Job applied successfully!");
        },
        ...options,
    });
};

export const useToggleSaveJob = (
    options?: UseMutationOptions<ApiResponse<null>, AxiosError<ApiError>, { jobId: number }>,
) => {
    return useMutation({
        mutationKey: [MUTATION.JOB.toggleSaveJob],
        mutationFn: ({ jobId }: { jobId: number }) => toggleSaveJob({ jobId }),
        onError: (error) => {
            console.error("Toggle save job error details:", error);
            toast.error(`${error.response?.data.message}` || "Failed to save/unsave job. Please try again.");
        },
        onSuccess: (data) => {
            console.log("Toggle save job success details:", data);
            toast.success(data.message || "Job save/unsave action successful!");
        },
        ...options,
    });
}
