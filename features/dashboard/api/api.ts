import api from "@/lib/axios/client";

export const getUserData = async ({ signal }: { signal: AbortSignal }) => {
    const res = await api.get(`v1/users/me`, {
        signal
    });
    return res.data;
};
