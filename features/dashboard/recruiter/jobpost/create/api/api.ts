import api from "@/lib/axios/client";
import { ApiError, ApiResponse } from "@/types/api";
import {
    addBenefitResponse,
    addSkillResponse,
    CreateJobPayload,
    CreateJobResponse,
    EditJobPayload,
    EditJobResponse,
    GenerateJobAIInput,
    updateStatusPayload,
} from "./types";
import { toast } from "sonner";

// JOB

export const createJob = async (companyId: number, jobData: CreateJobPayload): Promise<ApiResponse<CreateJobResponse>> => {
    const res = await api.post(`v1/job/${companyId}`, jobData);
    return res.data;
};

export const editJob = async (
    jobId: number,
    companyId: number,
    jobData: EditJobPayload,
): Promise<ApiResponse<EditJobResponse>> => {
    const res = await api.patch(`v1/job/me/${jobId}/${companyId}`, jobData);
    return res.data;
};

export const updateJobStatus = async (jobId: number, companyId: number, payload: updateStatusPayload): Promise<ApiError> => {
    const res = await api.patch(`v1/job/me/status/${jobId}/${companyId}`, payload);
    return res.data;
};

export const deleteJob = async (jobId: number, companyId: number): Promise<ApiError> => {
    const res = await api.delete(`v1/job/me/delete/${jobId}/${companyId}`);
    return res.data;
};

// SKILL

export const addSkill = async (jobId: number, skillId: number): Promise<ApiResponse<addSkillResponse>> => {
    const res = await api.post(`v1/job-skill/me/${jobId}/${skillId}`);
    return res.data;
};

export const removeSkill = async (jobId: number, skillId: number): Promise<ApiError> => {
    const res = await api.delete(`v1/job-skill/me/${jobId}/${skillId}`);
    return res.data;
};

// BENEFIT

export const addBenefit = async (jobId: number, benefitName: string): Promise<ApiResponse<addBenefitResponse>> => {
    const res = await api.post(`v1/job-benefit/me/${jobId}`, { benefitName });
    return res.data;
};

export const removeBenefit = async (jobId: number, benefitName: string): Promise<ApiError> => {
    const res = await api.delete(`v1/job-benefit/me/${jobId}/${encodeURIComponent(benefitName)}`);
    return res.data;
};

// RECRUITER JOB POST USING AI

export const generateJobAI = async ({ payload, onChunk, token, signal }: GenerateJobAIInput): Promise<void> => {
    async function startStream(accessToken: string): Promise<void> {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/ai/jobpost`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(payload),
            signal,
        });

        if (res.status === 401) throw new Error("UNAUTHORIZED");
        if (res.status === 429) throw new Error("RATE_LIMITED");

        if (!res.ok) {
            throw new Error(await res.text());
        }

        if (!res.body) {
            throw new Error("Streaming not supported");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        let buffer = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            // ✅ handle NDJSON (newline separated JSON)
            const parts = buffer.split("\n");
            buffer = parts.pop() || ""; // keep incomplete chunk

            // for (const part of parts) {
            //     if (!part.trim()) continue;

            //     try {
            //         const parsed = JSON.parse(part);

            //         // 🔥 expected: { field, text }
            //         if (parsed.field && parsed.text) {
            //             onChunk(parsed);
            //             console.log("Received chunk:", parsed);
            //         }
            //     } catch (err) {
            //         console.error("Parse error:", err);
            //     }
            // }

            for (const part of parts) {
                const line = part.trim();

                if (!line.startsWith("data:")) continue;

                const jsonStr = line.replace("data: ", "").trim();

                // ✅ ignore empty
                if (!jsonStr) continue;

                // ✅ handle DONE
                if (jsonStr === "[DONE]") {
                    // console.log("Stream finished");
                    return;
                }

                try {
                    const parsed = JSON.parse(jsonStr);

                    if (parsed.field && parsed.text) {
                        onChunk(parsed);
                        // console.log("Received chunk:", parsed);
                    }

                    // ✅ handle SSE error
                    if (parsed.error) {
                        throw new Error(parsed.message);
                    }
                } catch (err) {
                    // console.error("Parse error:", jsonStr);
                }
            }
        }
    }

    // 🔥 SAME RETRY LOGIC (like your summary)
    try {
        await startStream(token);
    } catch (err: any) {
        // console.error("Error in job AI:", err);

        if (err.message === "UNAUTHORIZED") {
            const newTokenResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/getAccessToken`, {
                method: "POST",
                credentials: "include",
            });

            const newTokenData = await newTokenResponse.json();
            const newToken = newTokenData.data.token;

            return startStream(newToken);
        }

        if (err.message === "RATE_LIMITED") {
            toast.error("AI usage limit reached. Please try again later.");
        }

        throw err;
    }
};
