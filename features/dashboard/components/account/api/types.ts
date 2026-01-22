import z from "zod";

export const ChangePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Required"),
    newPassword: z.string().min(1, "Required"),
});

export const SetPasswordSchema = z
    .object({
        password: z.string().min(1, "Required"),
        confirmPassword: z.string().min(1, "Required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Confirm Password must match Password",
        path: ["confirmPassword"], // 👈 Critical: Attach error to this field
    });

export const ForgotPasswordSchema = z.object({
    newPassword: z.string().min(1, "Required"),
});

export type ForgotPasswordPayload = z.infer<typeof ForgotPasswordSchema>;
export type ChangePasswordPayload = z.infer<typeof ChangePasswordSchema>;
export type SetPasswordPayload = z.infer<typeof SetPasswordSchema>;

export type isPasswordSetResponse = {
    isPasswordSet: boolean;
};
