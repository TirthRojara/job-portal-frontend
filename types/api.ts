import { number } from "zod";

export interface ApiResponse<T> {
    message: string;
    data?: T;
}

export interface ApiError {
    message: string;
}

export interface ApiPageResponse<T> {
    message: string;
    pagination: {
        totalCount: number;
        currentPage: number;
        totalPages: number;
    };
    data?: T;
}
