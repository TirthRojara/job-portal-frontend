import { appActions } from "@/store/app.slice";
import store from "@/store/index.store";
import axios, { AxiosInstance } from "axios";
import { useSelector } from "react-redux";

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

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Refresh token cookie auto-sent via withCredentials: true
                const { data } = await api.post("/auth/refresh");
                store.dispatch(appActions.setAccessToken(data.token));

                // Retry original request
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed → No valid refresh token → Login
                window.location.href = "/login";
            }
        }

        // const normalizedError = {
        //     status: error.response?.status || 500,
        //     message: error.response?.data?.message || "Unable to reach server",
        // };
        // return Promise.reject(normalizedError);

        return Promise.reject(error);
    }
);

export default api;