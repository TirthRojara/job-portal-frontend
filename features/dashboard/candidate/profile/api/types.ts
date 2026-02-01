import z from "zod";

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER",
}

// CREATE CANDIDATE PROFILE

export const createProfileSchema = z.object({
    fullname: z.string().min(1, "Required"),
    summary: z.string().min(1, "Required"),
    gender: z.enum(["MALE", "FEMALE", "OTHER"], {
        error: "Please select gender",
    }),
    phone: z.string().min(10, "Phone must be 10 digits").max(10, "Phone must be 10 digits"),
    address: z.string().min(1, "Required"),
    openToWork: z.boolean(),
    birthDate: z.date({ error: "Please select dates" }),
});

export type ICreateProfile = z.infer<typeof createProfileSchema>;

export type CreateProfilePayload = {
    fullName: string;
    summary: string;
    gender: Gender;
    phone: string;
    birthDate: string;
    address: string;
    openToWork?: boolean;
};

export type CreateProfileResponse = {
    id: number;
    fullName: string;
    summary: string;
    gender: Gender;
    phone: string;
    cv: null | string;
    birthDate: string;
    address: string;
    openToWork: boolean;
    status: boolean;
    userId: number;
};

// EDIT CANDIDATE PROFILE

export const UpdateProfileSchema = z
    .object({
        fullname: z.string().min(1).optional(),
        gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
        phone: z.string().min(10, "Phone must be 10 digits").max(10, "Phone must be 10 digits").optional(),
        address: z.string().min(1).optional(),
        openToWork: z.boolean().optional(),
        birthDate: z.date().optional(),
        summary: z.string().min(1).optional(),
    })
    .refine((data) => Object.values(data).some((value) => value !== undefined && value !== "" && value !== null), {
        message: "At least one field is required",
        path: ["_form"], // 👈 form-level error
    });

export type UpdateProfileFormData = z.infer<typeof UpdateProfileSchema>;

export type UpdateProfilePayload = {
    fullName?: string;
    summary?: string;
    gender?: Gender;
    phone?: string;
    birthDate?: string;
    address?: string;
    openToWork?: boolean;
};
