import { ApiError } from "@/types/api";
import { changePassword, setPasswordForOauth } from "./api";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { MUTATION } from "@/constants/tanstank.constants";
import { toast } from "sonner";
import { ChangePasswordPayload, SetPasswordPayload } from "./types";
import { AxiosError } from "axios";

export const useChangePassword = (options?: UseMutationOptions<ApiError, ApiError, ChangePasswordPayload>) => {
    // const router = useRouter();

    return useMutation({
        mutationKey: [MUTATION.AUTH.changePassword],
        mutationFn: ({ currentPassword, newPassword }: ChangePasswordPayload) => changePassword({ currentPassword, newPassword }),
        onSuccess: (data: ApiError) => {
            toast.success(data.message || "Password changed successfully!");
            // console.log("Password change successful:", data);
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(`${error.response?.data.message}` || "Failed to change password. Please try again.");
            // console.error("Password change error details:", error);
        },
        ...options,
    });
};

export const useSetPasswordForOauth = (options?: UseMutationOptions<ApiError, ApiError, SetPasswordPayload>) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION.AUTH.setPasswordForOauth],
        mutationFn: ({ password, confirmPassword }: SetPasswordPayload) => setPasswordForOauth({ password, confirmPassword }),
        onSuccess: (data: ApiError) => {
            toast.success(data.message || "Password set successfully!");
            queryClient.invalidateQueries({ queryKey: ["isPasswordSetForOauth"] });
            console.log("Set password successful:", data);
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(`${error.response?.data.message}` || "Failed to set password. Please try again.");
            console.error("Set password error details:", error);
        },
        ...options,
    });
};
