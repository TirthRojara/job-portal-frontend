import { MUTATION, QUERY } from "@/constants/tanstank.constants";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { updateApplicationStatus } from "./api";
import { UpdateJobStatusPayload } from "./types";
import { ApiError } from "@/types/api";

export const useUpdateApplicationStatus = (
    options?: UseMutationOptions<
        ApiError,
        AxiosError<ApiError>,
        { jobId: string; companyId: string; payload: UpdateJobStatusPayload }
    >,
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION.APPLY.updateApplicationStatus],
        mutationFn: ({ jobId, companyId, payload }: { jobId: string; companyId: string; payload: UpdateJobStatusPayload }) =>
            updateApplicationStatus(jobId, companyId, payload),
        onError() {
            toast.error("Something went wrong.");
        },
        onSettled: () => {
            const queryKey = [QUERY.APPLY.getApplicationById];
            queryClient.invalidateQueries({ queryKey: queryKey });
        },
        ...options,
    });
};
