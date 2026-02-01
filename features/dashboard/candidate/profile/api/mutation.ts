import { MUTATION, QUERY } from "@/constants/tanstank.constants";
import { ApiError, ApiResponse } from "@/types/api";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CreateProfilePayload, CreateProfileResponse, UpdateProfilePayload } from "./types";
import { toast } from "sonner";
import { createCandidateProfile, getCandidateProfile, updateCandidateProfile } from "./api";
import { useRouter } from "next/navigation";

export const useCreateJob = (
    options?: UseMutationOptions<ApiResponse<CreateProfileResponse>, AxiosError<ApiError>, CreateProfilePayload>,
) => {
    return useMutation({
        mutationKey: [MUTATION.CANDIDATE_PROFILE.createCandidateProfile],
        mutationFn: ({ payload }: { payload: CreateProfilePayload }) => createCandidateProfile(payload),
        onSuccess: (data) => {
            toast.success("Crete Profile Successfully.");
            window.location.reload();
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error("Something went wrong.");
        },
    });
};

type ProfileContext = {
    previousProfile: ApiResponse<CreateProfileResponse> | undefined;
};

export const useUpdateCandidateProfile = (
    options?: UseMutationOptions<
        ApiResponse<CreateProfileResponse>,
        AxiosError<ApiError>,
        { payload: UpdateProfilePayload },
        ProfileContext
    >,
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION.CANDIDATE_PROFILE.updateCandidateProfile],
        mutationFn: ({ payload }: { payload: UpdateProfilePayload }) => updateCandidateProfile(payload),
        onMutate: async (variables) => {
            const queryKey = [QUERY.CANDIDATE_PROFILE.getCandidateProfile];

            await queryClient.cancelQueries({ queryKey });

            const previousProfile = queryClient.getQueryData<ApiResponse<CreateProfileResponse>>(queryKey);

            queryClient.setQueryData<ApiResponse<CreateProfileResponse>>(queryKey, (oldData) => {
                if (!oldData) return oldData;

                return {
                    ...oldData,
                    data: {
                        ...oldData.data,
                        ...variables.payload,
                    } as CreateProfileResponse,
                };
            });

            return { previousProfile };
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error("Something went wrong.");
            const queryKey = [QUERY.CANDIDATE_PROFILE.getCandidateProfile];
            const previousProfile = queryClient.getQueryData<ApiResponse<CreateProfileResponse>>(queryKey);
            queryClient.setQueryData([queryKey], previousProfile);
        },
        onSettled: (data, error, variables, onMutateResult, context) => {
            const queryKey = [QUERY.CANDIDATE_PROFILE.getCandidateProfile];
            queryClient.invalidateQueries({ queryKey: queryKey });
        },
        onSuccess: (data) => {
            toast.success("Update Profile Successfully.");
        },

        ...options,
    });
};
