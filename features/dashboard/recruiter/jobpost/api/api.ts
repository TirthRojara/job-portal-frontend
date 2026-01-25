import api from "@/lib/axios/client";
import { SearchParams } from "./types";

export const getAllJobs = async ({
    signal,
    searchParams,
}: {
    signal?: AbortSignal;
    searchParams: SearchParams;
}): Promise<any> => {
    // const res = await api.get(`v1/job/readAll`, { signal, params: searchParams });
    const res = await api.get(`v1/job/me`, { signal, params: searchParams });
    return res.data;
};
