import store from "@/store/index.store";
import { GenerateSummaryPayload } from "./types";
import { toast } from "sonner";

// export const generateCandidateSummary = async ({
//     payload,
//     onChunk,
//     token,
//     signal,
// }: {
//     payload: GenerateSummaryPayload;
//     onChunk: (chunk: string) => void;
//     token: string;
//     signal?: AbortSignal;
// }) => {
//     const res = await fetch("http://localhost:5000/api/v1/ai", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//         signal,
//     });

//     if (res.status === 401) {
//         throw new Error("UNAUTHORIZED");
//     }

//     if (!res.body) {
//         throw new Error("Streaming not supported");
//     }

//     const reader = res.body.getReader();
//     const decoder = new TextDecoder();

//     let fullText = "";

//     while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;

//         const chunk = decoder.decode(value);
//         fullText += chunk;

//         console.log("Received chunk:", chunk);
//         onChunk(chunk); // 🔥 LIVE UPDATE
//     }

//     return fullText;
// };



// export const generateCandidateSummary = async ({
//     payload,
//     onChunk,
//     token,
//     signal,
// }: GenerateCandidateSummaryInput): Promise<string> => {
//     async function startStream(accessToken: string): Promise<string> {
//         const res = await fetch("http://localhost:5000/api/v1/ai", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${accessToken}`,
//             },
//             body: JSON.stringify(payload),
//             signal,
//         });

//         if (res.status === 401) throw new Error("UNAUTHORIZED");
//         if (res.status === 429) throw new Error("RATE_LIMITED");

//         if (!res.ok) {
//             throw new Error(await res.text());
//         }

//         if (!res.body) {
//             throw new Error("Streaming not supported");
//         }

//         const reader = res.body.getReader();
//         const decoder = new TextDecoder();

//         let fullText = "";

//         while (true) {
//             const { done, value } = await reader.read();
//             if (done) break;

//             const chunk = decoder.decode(value);
//             fullText += chunk;
//             onChunk(chunk);
//         }

//         return fullText;
//     }

//     try {
//         return await startStream(token);
//     } catch (err: any) {

//         console.error("Error in api:", err);

//         if (err.message === "UNAUTHORIZED") {
//             //   const newToken = await refreshAccessToken();
//             // const newToken = store.getState().app.accessToken;

//             const newTokenResponse = await fetch("http://localhost:5000/api/v1/auth/getAccessToken", {
//                 method: "POST",
//                 credentials: "include"
//             });

//             const newTokenData = await newTokenResponse.json();
//             const newToken = newTokenData.data.token;

//             return startStream(newToken);
//         }
//         if (err.message === "RATE_LIMITED") {
//             throw new Error("RATE_LIMITED");
//         }

//         throw err; // 🔥 critical
//     }
// };

interface GenerateCandidateSummaryInput {
    payload: GenerateSummaryPayload;
    onChunk: (chunk: string) => void;
    token: string;
    signal?: AbortSignal;
}

export const generateCandidateSummary = async ({
    payload,
    onChunk,
    token,
    signal,
}: GenerateCandidateSummaryInput): Promise<string> => {
    async function startStream(accessToken: string): Promise<string> {
        // const res = await fetch("http://localhost:5000/api/v1/ai", {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/ai`, {
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

        let fullText = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);

            const lines = chunk.split("\n");

            for (const line of lines) {
                if (line.startsWith("data: ")) {
                    const data = line.replace("data: ", "").trim();

                    console.log("Received chunk:", data);

                    if (data === "[DONE]") {
                        return fullText;
                    }

                    if (data.startsWith("ERROR:")) {
                        throw new Error(data.replace("ERROR:", "").trim());
                    }

                    fullText += data;
                    onChunk(data);
                }
            }
        }

        return fullText;
    }

    // ✅ 🔥 THIS WAS MISSING
    try {
        return await startStream(token);
    } catch (err: any) {
        console.error("Error in api:", err);

        if (err.message === "UNAUTHORIZED") {
            const newTokenResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/getAccessToken`, {
            // const newTokenResponse = await fetch("http://localhost:5000/api/v1/auth/getAccessToken", {
                method: "POST",
                credentials: "include",
            });

            const newTokenData = await newTokenResponse.json();
            const newToken = newTokenData.data.token;

            return startStream(newToken);
        }

        if (err.message === "RATE_LIMITED") {
            toast.error('AI usage limit reached. Please try again later.')
        }

        throw err;
    }
};
