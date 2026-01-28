import api from "@/lib/axios/client";
import { ApiPageResponse } from "@/types/api";
import { SavedJobResponse } from "./types";
import { JobResponseCandidate } from "../../job/api/types";

export const getSavedJobForCandidate = async ({
    signal,
    page,
    limit,
}: {
    signal: AbortSignal;
    page: number;
    limit: number;
}): Promise<ApiPageResponse<JobResponseCandidate[]>> => {
    const res = await api.get(`v1/job/readAll/savedJob`, {
        signal,
        params: { page, limit },
    });
    return res.data;
};
