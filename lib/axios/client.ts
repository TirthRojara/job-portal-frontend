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

    // ## DON'T USE THIS
    // config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    // config.headers['Pragma'] = 'no-cache';
    // config.headers['Expires'] = '0';

    const accessToken = store.getState().app.accessToken;

    if (accessToken && !config.headers.Authorization) {
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
                const { data } = await api.post("/v1/auth/getAccessToken");
                store.dispatch(appActions.setAccessToken(data.data.token));
                store.dispatch(appActions.setRole(data.data.role));

                // Retry original request
                originalRequest.headers.Authorization = `Bearer ${data.data.token}`;
                return api(originalRequest);

            } catch (refreshError) {
                // Refresh failed → No valid refresh token → Login
                sessionStorage.setItem("session_expired", "true");
                window.location.href = "/login";
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

export default api;
