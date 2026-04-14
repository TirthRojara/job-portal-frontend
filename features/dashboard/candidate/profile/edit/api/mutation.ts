import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { GenerateSummaryPayload } from "./types";
import { MUTATION } from "@/constants/tanstank.constants";
import { generateCandidateSummary } from "./api";

interface GenerateCandidateSummaryInput {
    payload: GenerateSummaryPayload;
    onChunk: (chunk: string) => void;
    token: string;
    signal?: AbortSignal;
}

export const useGenerateCandidateSummary = (options?: UseMutationOptions<string, any, GenerateCandidateSummaryInput>) => {
    return useMutation({
        mutationKey: [MUTATION.AI.generateSummary],
        mutationFn: ({ payload, onChunk, token, signal }: GenerateCandidateSummaryInput) =>
            generateCandidateSummary({ payload, onChunk, token, signal }),
        ...options,
    });
};
