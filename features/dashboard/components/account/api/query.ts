import { ApiError, ApiResponse } from "@/types/api";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { isPasswordSetResponse } from "./types";
import { isPasswordSetForOauth } from "./api";

export const useIsPasswordSetForOauth = (options?: UseQueryOptions<ApiResponse<isPasswordSetResponse>, ApiError>) => {
    return useQuery({
        queryKey: ["isPasswordSetForOauth"],
        queryFn: ({ signal }) => isPasswordSetForOauth({ signal }),
        ...options,
    });
};
