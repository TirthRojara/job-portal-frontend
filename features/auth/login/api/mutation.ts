import { ApiError, ApiResponse } from "@/types/api";
import { LoginPayLoad, LoginResponse } from "./types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { login } from "./api";
import { MUTATION } from "@/constants/tanstank.constants";
import { toast } from "sonner";
import store from "@/store/index.store";
import { appActions } from "@/store/app.slice";

export const useLogin = (
    options?: UseMutationOptions<
        ApiResponse<LoginResponse>,
        ApiError,
        LoginPayLoad
    >
) => {
    return useMutation({
        mutationKey: [MUTATION.AUTH.login],
        mutationFn: (payload) => login(payload),
        onSuccess: (data: ApiResponse<LoginResponse>) => {
            toast.success("Login successful!");
            store.dispatch(appActions.setAccessToken(data.data?.token));
        },
        onError: (error: any) => {
            toast.error(`Login failed: ${error.response.data?.message}`);
        },
        ...options,
    });
};
