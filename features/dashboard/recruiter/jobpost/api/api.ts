import api from "@/lib/axios/client";
import { JobResponseRecruiter, SearchParams } from "./types";
import { number } from "zod";
import { ApiPageResponse } from "@/types/api";

export const getAllJobsRecruiter = async ({
    signal,
    searchParams,
}: {
    signal?: AbortSignal;
    searchParams: SearchParams;
}): Promise<ApiPageResponse<JobResponseRecruiter[]>> => {
    // const res = await api.get(`v1/job/readAll`, { signal, params: searchParams });
    const res = await api.get(`v1/job/me`, { signal, params: searchParams });
    return res.data;
};

