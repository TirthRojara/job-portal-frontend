"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "./api";
import { toast } from "sonner";
import { ApiError } from "@/types/api";
import { AxiosError } from "axios";
import store, { useAppDispatch } from "@/store/index.store";
import { appActions } from "@/store/app.slice";
import { useRouter } from "next/navigation";

export const useLogout = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => logout(),
        onSuccess: (data: ApiError) => {
            dispatch(appActions.setAccessToken(""));
            queryClient.clear();
            toast.success(data.message || "Logged out successfully!");
            router.push("/login");
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(`${error.response?.data.message}` || "Failed to log out. Please try again.");
        },
    });
};
