import { WorkPlace } from "@/features/dashboard/recruiter/jobpost/api/types";
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

// LANGUAGE

export enum Level {
    NATIVE = "NATIVE",
    FLUENT = "FLUENT",
    BASIC = "BASIC",
}

export type createLanguagePayload = {
    languageName: string;
    level: Level;
};

export type updateLanguageLevelPayload = {
    level: Level;
};

// SKILL

export type CandidateSkillResponse = {
    skill: {
        id: number;
        name: string;
    };
};

export type CandidateSkillPayload = {
    skillId: number;
};

// EDUCATION

export enum Degree {
    BACHELOR = "BACHELOR",
    MASTER = "MASTER",
    PHD = "PHD",
}

export type CandidateEducationResponse = {
    id: number;
    major: string;
    degree: string;
    yearStart: number;
    yearEnd: number;
    candidateProfileId: number;
    educationId: number;
    education: {
        id: number;
        name: string;
        map: string;
    };
};

export const CreateEducationSchema = z.object({
    major: z.string({ error: "Required" }).min(1, "Required"),
    degree: z.enum(Degree, {
        error: "Please select degree",
    }),
    yearStart: z.date({ error: "Please select date" }),
    yearEnd: z.date({ error: "Please select date" }),
    educationId: z.string({ error: "Please select University" }),
});

export type CreateEducationForm = z.infer<typeof CreateEducationSchema>;

export const EditEducationSchema = z
    .object({
        major: z.string().optional(),
        degree: z.enum(Degree).optional(),
        yearStart: z.date().optional(),
        yearEnd: z.date().optional(),
        educationId: z.string().optional(),
    })
    .refine((data) => Object.values(data).some((value) => value !== undefined && value !== "" && value !== null), {
        message: "At least one field is required",
        path: ["_form"], // form-level error
    });

export type EditEducationForm = z.infer<typeof EditEducationSchema>;

export type CandidateEducationPayload = {
    educationId: number;
    major: string;
    degree: Degree;
    yearStart: number;
    yearEnd: number;
};

//  EXPERIENCE

export type CandidateExperienceResponse = {
    companyName: string;
    department: string;
    startDate: Date;
    currentlyWorking: boolean;
    endDate: Date | null;
    position: string;
    description: string;
    workPlace: WorkPlace;
    location: string;
    id: number;
    candidateProfileId: number;
};

export type CandidateExperiencePayload = {
    companyName: string;
    department: string;
    startDate: string;
    endDate?: string;
    position: string;
    description: string;
    currentlyWorking: boolean;
    workPlace: WorkPlace;
    location: string;
};

// export const CreateExperienceSchema = z.object({
//     companyName: z.string({ error: "Required" }).min(1, "Required"),
//     department: z.string({ error: "Required" }).min(1, "Required"),
//     position: z.string({ error: "Required" }).min(1, "Required"),
//     description: z.string({ error: "Required" }).min(1, "Required"),
//     workPlace: z.enum(WorkPlace, {
//         error: "Please select degree",
//     }),
//     startDate: z.date({ error: "Please select date" }),
//     endDate: z.date({ error: "Please select date" }).optional(),
//     currentlyWorking: z.boolean().optional(),
//     location: z.string({ error: "Required" }).min(1, "Required"),
// });

// export const CreateExperienceSchema = z
//     .object({
//         companyName: z.string().min(1, "Required"),
//         department: z.string().min(1, "Required"),
//         position: z.string().min(1, "Required"),
//         description: z.string().min(1, "Required"),

//         workPlace: z.nativeEnum(WorkPlace, {
//             error: "Please select workplace",
//         }),

//         startDate: z.date({
//             error: "Please select start date",
//         }),

//         endDate: z.date().optional(),

//         currentlyWorking: z.boolean({
//             error: "Please specify if you are currently working",
//         }),

//         location: z.string().min(1, "Required"),
//     })
//     .refine(
//         (data) => {
//             // backend rule:
//             // if currentlyWorking === false → endDate required
//             if (data.currentlyWorking === false) {
//                 return !!data.endDate;
//             }
//             return true;
//         },
//         {
//             path: ["endDate"],
//             message: "End date is required if not currently working",
//         },
//     );

// export const CreateExperienceSchema = z
//     .object({
//         companyName: z.string().min(1, "Required"),
//         department: z.string().min(1, "Required"),
//         position: z.string().min(1, "Required"),
//         description: z.string().min(1, "Required"),

//         workPlace: z.enum(WorkPlace),

//         startDate: z.date({
//             error: "Please select start date",
//         }),

//         endDate: z.date().optional(),

//         // 👇 FIX HERE
//         currentlyWorking: z.boolean().default(false),

//         location: z.string().min(1, "Required"),
//     })
//     .refine(
//         (data) => {
//             // only require endDate when NOT currently working
//             if (data.currentlyWorking === false) {
//                 return !!data.endDate;
//             }
//             return true;
//         },
//         {
//             path: ["endDate"],
//             message: "End date is required if not currently working",
//         },
//     );

// export const EditExperienceSchema = z.object({
//     companyName: z.string().optional(),
//     department: z.string().optional(),
//     position: z.string().optional(),
//     description: z.string().optional(),
//     workPlace: z.enum(WorkPlace).optional(),
//     startDate: z.date().optional(),
//     endDate: z.date().optional(),
//     currentlyWorking: z.boolean().optional(),
//     location: z.string().optional(),
// });

// export const EditExperienceSchema = z
//     .object({
//         companyName: z.string().optional(),
//         department: z.string().optional(),
//         position: z.string().optional(),
//         description: z.string().optional(),

//         workPlace: z.nativeEnum(WorkPlace).optional(),

//         startDate: z.date().optional(),
//         endDate: z.date().optional(),

//         currentlyWorking: z.boolean().optional(),

//         location: z.string().optional(),
//     })
//     .refine(
//         (data) => {
//             // Only validate when currentlyWorking is provided
//             if (data.currentlyWorking === false) {
//                 return !!data.endDate;
//             }
//             return true;
//         },
//         {
//             path: ["endDate"],
//             message: "End date is required if not currently working",
//         },
//     );

export const CreateExperienceSchema = z
    .object({
        companyName: z.string().min(1),
        department: z.string().min(1),
        position: z.string().min(1),
        description: z.string().min(1),

        workPlace: z.enum(WorkPlace),

        startDate: z.date(),
        endDate: z.date().optional(),

        currentlyWorking: z.boolean().default(false),

        location: z.string().min(1),
    })
    .superRefine((data, ctx) => {
        if (data.currentlyWorking === false && !data.endDate) {
            ctx.addIssue({
                code: "custom",
                path: ["endDate"],
                message: "End date is required if not currently working",
            });
        }
    });

export const EditExperienceSchema = z
    .object({
        companyName: z.string().optional(),
        department: z.string().optional(),
        position: z.string().optional(),
        description: z.string().optional(),

        workPlace: z.enum(WorkPlace).optional(),

        startDate: z.date().optional(),
        endDate: z.date().optional(),

        currentlyWorking: z.boolean().optional(),

        location: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        // Only enforce rule when currentlyWorking is explicitly set to false
        if (data.currentlyWorking === false && !data.endDate) {
            ctx.addIssue({
                code: "custom",
                path: ["endDate"],
                message: "End date is required if not currently working",
            });
        }
    });

export type CreateExperienceForm = z.infer<typeof CreateExperienceSchema>;
export type EditExperienceForm = z.infer<typeof EditExperienceSchema>;
