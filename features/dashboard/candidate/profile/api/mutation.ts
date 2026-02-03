import { MUTATION, QUERY } from "@/constants/tanstank.constants";
import { ApiError, ApiResponse } from "@/types/api";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
    CandidateEducationPayload,
    CandidateEducationResponse,
    CandidateExperiencePayload,
    CandidateExperienceResponse,
    CandidateSkillPayload,
    CandidateSkillResponse,
    createLanguagePayload,
    CreateProfilePayload,
    CreateProfileResponse,
    updateLanguageLevelPayload,
    UpdateProfilePayload,
} from "./types";
import { toast } from "sonner";
import {
    createCandidateProfile,
    createEducation,
    createExperience,
    createLanguage,
    createSkill,
    deleteEducation,
    deleteExperience,
    deleteLanguage,
    deleteSkill,
    editEducation,
    editExperience,
    getCandidateProfile,
    updateCandidateProfile,
    updateLanguageLevel,
} from "./api";
import { useRouter } from "next/navigation";
import { sk } from "date-fns/locale";
import { string } from "zod";

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

// SKILL

type SkillContext = {
    previousSkill: ApiResponse<CandidateSkillResponse[]> | undefined;
};

export const useCreateSkill = (
    options?: UseMutationOptions<
        ApiResponse<CandidateSkillResponse>,
        AxiosError<ApiError>,
        { payload: CandidateSkillPayload; skillName: string },
        SkillContext
    >,
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION.CANDIDATE_PROFILE.updateCandidateProfile],
        mutationFn: ({ payload }: { payload: CandidateSkillPayload }) => createSkill(payload),
        onMutate: async (variables) => {
            const queryKey = [QUERY.CANDIDATE_SKILL.getCandidateSkill];

            await queryClient.cancelQueries({ queryKey });

            const previousSkill = queryClient.getQueryData<ApiResponse<CandidateSkillResponse[]>>(queryKey);

            queryClient.setQueryData<ApiResponse<CandidateSkillResponse[]>>(queryKey, (oldData) => {
                if (!oldData) return oldData;

                const optimisticNewSkill: CandidateSkillResponse = {
                    skill: {
                        id: variables.payload.skillId,
                        name: variables.skillName,
                    },
                };

                return {
                    ...oldData,
                    data: [...(oldData.data || []), optimisticNewSkill],
                };
            });

            return { previousSkill };
        },
        onError(error, variables, context) {
            toast.error("Something went wrong.");
            const queryKey = [QUERY.CANDIDATE_SKILL.getCandidateSkill];
            if (context?.previousSkill) {
                queryClient.setQueryData(queryKey, context.previousSkill);
            }
        },
        onSettled: () => {
            const queryKey = [QUERY.CANDIDATE_SKILL.getCandidateSkill];
            queryClient.invalidateQueries({ queryKey: queryKey });
        },

        ...options,
    });
};

export const useDeleteSkill = (
    options?: UseMutationOptions<
        ApiResponse<CandidateSkillResponse>,
        AxiosError<ApiError>,
        { payload: CandidateSkillPayload },
        SkillContext
    >,
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION.CANDIDATE_PROFILE.updateCandidateProfile],
        mutationFn: ({ payload }: { payload: CandidateSkillPayload }) => deleteSkill(payload),
        onMutate: async (variables) => {
            const queryKey = [QUERY.CANDIDATE_SKILL.getCandidateSkill];

            await queryClient.cancelQueries({ queryKey });

            const previousSkill = queryClient.getQueryData<ApiResponse<CandidateSkillResponse[]>>(queryKey);

            queryClient.setQueryData<ApiResponse<CandidateSkillResponse[]>>(queryKey, (oldData) => {
                if (!oldData || !oldData.data) return oldData;

                return {
                    ...oldData,
                    // ✅ Filter OUT the skill that matches the ID
                    data: oldData.data.filter((item) => item.skill.id !== variables.payload.skillId),
                };
            });

            return { previousSkill };
        },
        onError(error, variables, context) {
            toast.error("Something went wrong.");
            const queryKey = [QUERY.CANDIDATE_SKILL.getCandidateSkill];
            if (context?.previousSkill) {
                queryClient.setQueryData(queryKey, context.previousSkill);
            }
        },
        onSettled: () => {
            const queryKey = [QUERY.CANDIDATE_SKILL.getCandidateSkill];
            queryClient.invalidateQueries({ queryKey: queryKey });
        },

        ...options,
    });
};

// EDUCATION

type EducationContext = {
    previousEducation: ApiResponse<CandidateEducationResponse[]> | undefined;
};

export const useCreateEducation = (
    options?: UseMutationOptions<
        ApiResponse<CandidateEducationResponse>,
        AxiosError<ApiError>,
        // { payload: CandidateEducationPayload; educationName: string },
        { payload: CandidateEducationPayload },
        EducationContext
    >,
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION.CANDIDATE_EDUCATION.createEducation],
        mutationFn: ({ payload }: { payload: CandidateEducationPayload }) => createEducation(payload),
        // onMutate: async (variables) => {
        //     const queryKey = [QUERY.CANDIDATE_EDUCATION.getCandidateEducation];

        //     await queryClient.cancelQueries({ queryKey });

        //     const previousEducation = queryClient.getQueryData<ApiResponse<CandidateEducationResponse[]>>(queryKey);

        //     queryClient.setQueryData<ApiResponse<CandidateEducationResponse[]>>(queryKey, (oldData) => {
        //         if (!oldData) return oldData;

        //         const optimisticNewEducation: CandidateEducationResponse = {
        //             id: Number(-Date.now()),
        //             degree: variables.payload.degree,
        //             candidateProfileId: Number(-Date.now()),
        //             major: variables.payload.major,
        //             yearEnd: variables.payload.yearEnd,
        //             yearStart: variables.payload.yearStart,
        //             educationId: variables.payload.educationId,
        //             education: {
        //                 id: variables.payload.educationId,
        //                 map: '',
        //                 name: variables.educationName
        //             }
        //         };

        //         return {
        //             ...oldData,
        //             data: [...(oldData.data || []), optimisticNewEducation],
        //         };
        //     });

        //     return { previousEducation };
        // },
        onError(error, variables, context) {
            toast.error("Something went wrong.");
            // const queryKey = [QUERY.CANDIDATE_EDUCATION.getCandidateEducation];
            // if (context?.previousEducation) {
            //     queryClient.setQueryData(queryKey, context.previousEducation);
            // }
        },
        onSettled: () => {
            const queryKey = [QUERY.CANDIDATE_EDUCATION.getCandidateEducation];
            queryClient.invalidateQueries({ queryKey: queryKey });
        },

        ...options,
    });
};

export const useEditEducation = (
    options?: UseMutationOptions<
        ApiResponse<CandidateEducationResponse>,
        AxiosError<ApiError>,
        { candidateEducationId: number; payload: Partial<CandidateEducationPayload> }
        // EducationContext
    >,
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION.CANDIDATE_EDUCATION.createEducation],
        mutationFn: ({
            candidateEducationId,
            payload,
        }: {
            candidateEducationId: number;
            payload: Partial<CandidateEducationPayload>;
        }) => editEducation(candidateEducationId, payload),
        onError(error, variables, context) {
            toast.error("Something went wrong.");
        },
        onSettled: () => {
            const queryKey = [QUERY.CANDIDATE_EDUCATION.getCandidateEducation];
            queryClient.invalidateQueries({ queryKey: queryKey });
        },

        ...options,
    });
};

export const useDeleteEducation = (
    options?: UseMutationOptions<ApiError, AxiosError<ApiError>, { candidateEducationId: number }, EducationContext>,
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION.CANDIDATE_EDUCATION.createEducation],
        mutationFn: ({ candidateEducationId }: { candidateEducationId: number }) => deleteEducation(candidateEducationId),
        onError(error, variables, context) {
            toast.error("Something went wrong.");
        },
        onSettled: () => {
            const queryKey = [QUERY.CANDIDATE_EDUCATION.getCandidateEducation];
            queryClient.invalidateQueries({ queryKey: queryKey });
        },
        ...options,
    });
};

//  EXPERIENCT

export const useCreateExperience = (
    options?: UseMutationOptions<
        ApiResponse<CandidateExperienceResponse>,
        AxiosError<ApiError>,
        { payload: CandidateExperiencePayload }
    >,
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION.CANDIDATE_EXPERIENCE.createExperience],
        mutationFn: ({ payload }: { payload: CandidateExperiencePayload }) => createExperience(payload),
        onError() {
            toast.error("Something went wrong.");
        },
        onSettled: () => {
            const queryKey = [QUERY.CANDIDATE_EXPERIENCE.getCandidateExperience];
            queryClient.invalidateQueries({ queryKey: queryKey });
        },
        ...options,
    });
};

export const useEditExperience = (
    options?: UseMutationOptions<
        ApiResponse<CandidateExperienceResponse>,
        AxiosError<ApiError>,
        { candidateExperienceId: number; payload: Partial<CandidateExperiencePayload> }
    >,
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION.CANDIDATE_EXPERIENCE.editExperience],
        mutationFn: ({
            candidateExperienceId,
            payload,
        }: {
            candidateExperienceId: number;
            payload: Partial<CandidateExperiencePayload>;
        }) => editExperience(candidateExperienceId, payload),
        onError() {
            toast.error("Something went wrong.");
        },
        onSettled: () => {
            const queryKey = [QUERY.CANDIDATE_EXPERIENCE.getCandidateExperience];
            queryClient.invalidateQueries({ queryKey: queryKey });
        },

        ...options,
    });
};

export const useDeleteExperience = (
    options?: UseMutationOptions<ApiError, AxiosError<ApiError>, { candidateExperienceId: number }>,
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION.CANDIDATE_EXPERIENCE.editExperience],
        mutationFn: ({ candidateExperienceId }: { candidateExperienceId: number }) => deleteExperience(candidateExperienceId),
        onError() {
            toast.error("Something went wrong.");
        },
        onSettled: () => {
            const queryKey = [QUERY.CANDIDATE_EXPERIENCE.getCandidateExperience];
            queryClient.invalidateQueries({ queryKey: queryKey });
        },
        ...options,
    });
};
