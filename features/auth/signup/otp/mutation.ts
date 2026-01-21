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

"use client";
import { MUTATION } from "@/constants/tanstank.constants";
import { ApiError, ApiResponse } from "@/types/api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { verifySignupOTP } from "./api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import store, { useAppDispatch } from "@/store/index.store";
import { appActions } from "@/store/app.slice";

export type VerifySignupOTPResponse = {
    token: string;
    role: string;
};

export type VerifySignupOTPPayload = {
    otp: string;
};

export const useVerifySignupOTP = (
    options?: UseMutationOptions<ApiResponse<VerifySignupOTPResponse>, ApiError, VerifySignupOTPPayload>,
) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    return useMutation({
        mutationKey: [MUTATION.AUTH.verifySignupOTP],
        mutationFn: (payload: VerifySignupOTPPayload) => verifySignupOTP(payload),
        onSuccess: (data: ApiResponse<VerifySignupOTPResponse>) => {
            console.log("OTP verified successfully:", data);
            dispatch(appActions.setAccessToken(data.data!.token));
            toast.success("Sign Up successfully!");
            router.push(`/dashboard/${data.data?.role.toLowerCase()}`);
        },
        onError: (error: any) => {
            toast.error(`OTP verification failed: ${error.response.data?.message}`);
            console.error("OTP verification error details:", error);
        },
    });
};
