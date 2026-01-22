"use client";
import { useMutation } from "@tanstack/react-query";
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

    return useMutation({
        mutationFn: () => logout(),
        onSuccess: (data: ApiError) => {
            toast.success(data.message || "Logged out successfully!");
            dispatch(appActions.setAccessToken(''));
            router.push("/login");
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(`${error.response?.data.message}` || "Failed to log out. Please try again.");
        },
    });
};
