import { number } from "zod";

export interface ApiResponse<T> {
    message: string;
    data?: T;
}

export interface ApiError {
    message: string;
}

export interface ApiPageResponse extends ApiResponse<any> {
    pagination: {
        totalCount: number;
        currentPage: number;
        totalPages: number;
    };
}
