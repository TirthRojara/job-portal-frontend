import { appActions } from "@/store/app.slice";
import store from "@/store/index.store";
import axios, { AxiosInstance } from "axios";
import { useSelector } from "react-redux";

const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

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
                store.dispatch(appActions.setAccessToken(data.token))

                // Retry original request
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed → No valid refresh token → Login
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);
