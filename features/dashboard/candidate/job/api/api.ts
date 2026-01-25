import { SearchParams } from "@/features/dashboard/recruiter/jobpost/api/types";
import api from "@/lib/axios/client";

export const getAllJobsCandidate = async ({
    signal,
    searchParams,
}: {
    signal?: AbortSignal;
    searchParams: SearchParams;
}): Promise<any> => {
    const res = await api.get(`v1/job/readAll`, { signal, params: searchParams });
    return res.data;
};