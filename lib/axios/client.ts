import { appActions } from "@/store/app.slice";
import store from "@/store/index.store";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const SERVER_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api: AxiosInstance = axios.create({
    baseURL: SERVER_BASE_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const accessToken = store.getState().app.accessToken;

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (originalRequest.url?.includes("/auth/getAccessToken") && error.response?.status === 401) {
            sessionStorage.setItem("session_expired", "true");

            window.location.href = "/login";

            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Refresh token cookie auto-sent via withCredentials: true
                const { data } = await api.post("/v1/auth/getAccessToken");
                store.dispatch(appActions.setAccessToken(data.data.token));
                console.log("Token refreshed:", data.data.token);

                // Retry original request
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed → No valid refresh token → Login
                sessionStorage.setItem("session_expired", "true");

                window.location.href = "/login";

                // toast.error("Session expired. Please log in again.");
            }
        }

        // const normalizedError = {
        //     status: error.response?.status || 500,
        //     message: error.response?.data?.message || "Unable to reach server",
        // };
        // return Promise.reject(normalizedError);

        return Promise.reject(error);
    },
);

// // 1. Extend Axios Request Config to include our custom retry counter
// interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
//     _retryCount?: number;
// }

// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config as CustomAxiosRequestConfig;

//         // 🛑 CRITICAL FIX: Prevent infinite loop
//         // If the error comes from the 'getAccessToken' endpoint itself,
//         // it means the refresh token is invalid/missing. DO NOT retry.
//         if (originalRequest.url?.includes("/auth/getAccessToken") || originalRequest.url?.includes("/refresh-token")) {
//             // Optional: Redirect to login immediately since refresh failed
//             window.location.href = "/login";
//             return Promise.reject(error);
//         }

//         // Check for 401 and enforce Retry Limit (Max 3 attempts)
//         if (error.response?.status === 401) {
//             // Initialize or increment the retry counter
//             originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

//             if (originalRequest._retryCount <= 3) {
//                 try {
//                     console.log(`Attempting token refresh (Try ${originalRequest._retryCount}/3)`);

//                     // Call the refresh endpoint
//                     const { data } = await api.post("/v1/auth/getAccessToken");

//                     // Update Redux Store
//                     store.dispatch(appActions.setAccessToken(data.data.token));

//                     // Update the failed request with the new token
//                     originalRequest.headers.Authorization = `Bearer ${data.data.token}`;

//                     // Retry the original request
//                     return api(originalRequest);
//                 } catch (refreshError) {
//                     // If the refresh ITSELF fails, we handle it here (or let the interceptor's critical fix handle it)
//                     // Usually, we just let the error propagate so the user is logged out
//                     return Promise.reject(refreshError);
//                 }
//             } else {
//                 // Limit exceeded
//                 toast.error("Session expired. Too many failed attempts.");
//                 window.location.href = "/login";
//             }
//         }

//         return Promise.reject(error);
//     },
// );

export default api;
