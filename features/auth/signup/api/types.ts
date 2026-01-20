import z from "zod";

export type OAuthResponse = {
    token: string;
};

enum Role {
    CANDIDATE = "CANDIDATE",
    RECRUITER = "RECRUITER",
}

// export interface SignUpPayload {
//     name: string;
//     email: string;
//     password: string;
//     role: Role;
// }

export const signupSchema = z.object({
    name: z.string(),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters long"),
    role: z.enum(["CANDIDATE", "RECRUITER"], {
        error: "Please select role",
    }),
});

export type SignupFormData = z.infer<typeof signupSchema>;