import { MUTATION, QUERY } from "@/constants/tanstank.constants";
import { ApiError, ApiResponse } from "@/types/api";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
    createLanguagePayload,
    CreateProfilePayload,
    CreateProfileResponse,
    updateLanguageLevelPayload,
    UpdateProfilePayload,
} from "./types";
import { toast } from "sonner";
import {
    createCandidateProfile,
    createLanguage,
    deleteLanguage,
    getCandidateProfile,
    updateCandidateProfile,
    updateLanguageLevel,
} from "./api";
import { useRouter } from "next/navigation";

//  PROFILE

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

//    LANGUAGE

export const useCreateLanguage = (
    options?: UseMutationOptions<ApiResponse<createLanguagePayload>, AxiosError<ApiError>, createLanguagePayload>,
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION.CANDIDATE_PROFILE.createCandidateProfile],
        mutationFn: ({ payload }: { payload: createLanguagePayload }) => createLanguage(payload),
        onMutate: async (variables, context) => {
            const queryKey = [QUERY.CANDIDATE_LANGUAGE.getCandidateLanguage];

            await queryClient.cancelQueries({ queryKey: queryKey });

            const previousLanguage = queryClient.getQueryData<ApiResponse<createLanguagePayload[]>>(queryKey);

            queryClient.setQueryData<ApiResponse<createLanguagePayload[]>>(queryKey, (oldData) => {
                if (!oldData || !oldData.data) return oldData;

                const optimisticData: createLanguagePayload = {
                    languageName: variables.payload.languageName,
                    level: variables.payload.level,
                };

                const newData: ApiResponse<createLanguagePayload[]> = {
                    ...oldData,
                    data: [...(oldData.data || []), optimisticData],
                };

                return newData;
            });
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error("Something went wrong.");
            const queryKey = [QUERY.CANDIDATE_LANGUAGE.getCandidateLanguage];
            const previousLanguage = queryClient.getQueryData<ApiResponse<createLanguagePayload[]>>(queryKey);
            queryClient.setQueryData([queryKey], previousLanguage);
        },
        onSettled(data, error, variables, onMutateResult, context) {
            const queryKey = [QUERY.CANDIDATE_LANGUAGE.getCandidateLanguage];
            queryClient.invalidateQueries({ queryKey: queryKey });
        },
        onSuccess: (data) => {
            // toast.success("Crete Profile Successfully.");
            // window.location.reload();
        },
    });
};

export const useUpdateLanguageLevel = (
    options?: UseMutationOptions<
        ApiResponse<createLanguagePayload>,
        AxiosError<ApiError>,
        { languageName: string; payload: updateLanguageLevelPayload }
    >,
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION.CANDIDATE_PROFILE.createCandidateProfile],
        mutationFn: ({ languageName, payload }: { languageName: string; payload: updateLanguageLevelPayload }) =>
            updateLanguageLevel(languageName, payload),
        onMutate: async (variables, context) => {
            const queryKey = [QUERY.CANDIDATE_LANGUAGE.getCandidateLanguage];

            await queryClient.cancelQueries({ queryKey: queryKey });

            const previousLanguage = queryClient.getQueryData<ApiResponse<createLanguagePayload[]>>(queryKey);

            queryClient.setQueryData<ApiResponse<createLanguagePayload[]>>(queryKey, (oldData) => {
                if (!oldData || !oldData.data) return oldData;

                return {
                    ...oldData,
                    data: oldData.data.map((lang) => {
                        // ✅ Check if this is the language we want to update
                        if (lang.languageName === variables.languageName) {
                            return {
                                ...lang,
                                level: variables.payload.level, // Update the level
                            };
                        }
                        // Otherwise return the language as is
                        return lang;
                    }),
                };
            });
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error("Something went wrong.");
            const queryKey = [QUERY.CANDIDATE_LANGUAGE.getCandidateLanguage];
            const previousLanguage = queryClient.getQueryData<ApiResponse<createLanguagePayload[]>>(queryKey);
            queryClient.setQueryData([queryKey], previousLanguage);
        },
        onSettled(data, error, variables, onMutateResult, context) {
            const queryKey = [QUERY.CANDIDATE_LANGUAGE.getCandidateLanguage];
            queryClient.invalidateQueries({ queryKey: queryKey });
        },
        onSuccess: (data) => {
            // toast.success("Crete Profile Successfully.");
            // window.location.reload();
        },
    });
};

export const useDeleteLanguage = (
    options?: UseMutationOptions<ApiResponse<createLanguagePayload>, AxiosError<ApiError>, { languageName: string }>,
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION.CANDIDATE_PROFILE.createCandidateProfile],
        mutationFn: ({ languageName }: { languageName: string }) => deleteLanguage(languageName),
        onMutate: async (variables, context) => {
            const queryKey = [QUERY.CANDIDATE_LANGUAGE.getCandidateLanguage];

            await queryClient.cancelQueries({ queryKey: queryKey });

            const previousLanguage = queryClient.getQueryData<ApiResponse<createLanguagePayload[]>>(queryKey);

            queryClient.setQueryData<ApiResponse<createLanguagePayload[]>>(queryKey, (oldData) => {
                if (!oldData || !oldData.data) return oldData;

                const newData: ApiResponse<createLanguagePayload[]> = {
                    ...oldData,
                    data: oldData.data.filter((item) => item.languageName !== variables.languageName),
                };

                return newData;
            });
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error("Something went wrong.");
            const queryKey = [QUERY.CANDIDATE_LANGUAGE.getCandidateLanguage];
            const previousLanguage = queryClient.getQueryData<ApiResponse<createLanguagePayload[]>>(queryKey);
            queryClient.setQueryData([queryKey], previousLanguage);
        },
        onSettled(data, error, variables, onMutateResult, context) {
            const queryKey = [QUERY.CANDIDATE_LANGUAGE.getCandidateLanguage];
            queryClient.invalidateQueries({ queryKey: queryKey });
        },
        onSuccess: (data) => {
            // toast.success("Crete Profile Successfully.");
            // window.location.reload();
        },
    });
};
