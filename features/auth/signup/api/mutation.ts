import { ApiError, ApiResponse } from "@/types/api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import { SignupFormData } from "./types";
import { signUp } from "./api";

// export const useSetRole = (
//     options?: UseMutationOptions<ApiResponse<ISetRole>, ApiError, string>
// ) => {
//     return useMutation({
//         mutationKey: [],
//         mutationFn: (payload) => setRole(payload),
//         onSuccess: (data: ApiResponse<ISetRole>) => {
//             console.log("Role set successfully:", data);
//         },
//         // onError: (error: any) => {
//         //     toast.error(`Role set failed: ${error.response.data?.message}`);
//         // },
//         ...options,
//     });
// };

export const useSignup = (
    options?: UseMutationOptions<
        ApiError,
        ApiError,
        SignupFormData
    >
) => {
    return useMutation({
        mutationKey: [],
        mutationFn: (payload: SignupFormData) => signUp(payload),
    });
};
