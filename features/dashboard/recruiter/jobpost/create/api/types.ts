import z from "zod";
import { Status, WorkPlace } from "../../api/types";


export type CreateJobResponse = {
    id: number;
    title: string;
    description: string;
    responsibilities: string;
    requirements: string;
    location: string;
    workplace: "REMOTE";
    status: "PENDING";
    salaryMin: number;
    salaryMax: number;
    postedAt: string;
    applicationDeadline: string;
    updateAt: string;
    totalview: number;
    isDeleted: boolean;
    companyId: number;
    postById: number;
    jobRoleId: number;
};

export type EditJobResponse = {
    id: number;
    title: string;
    description: string;
    responsibilities: string;
    requirements: string;
    location: string;
    workplace: WorkPlace;
    status: Status;
    salaryMin: number;
    salaryMax: number;
    postedAt: Date;
    applicationDeadline: Date;
    updateAt: Date | null;
    totalview: number;
    isDeleted: boolean;
    companyId: number;
    postById: number;
    jobRoleId: number;
};

export const CreateJobSchema = z.object({
    title: z.string().min(1, "Required"),
    description: z.string().min(1, "Required"),
    responsibilities: z.string().min(1, "Required"),
    requirements: z.string().min(1, "Required"),
    location: z.string().min(1, "Required"),
    workPlace: z.enum(["ONSITE", "REMOTE", "HYBRID"], {
        error: "Please select degree",
    }),
    // jobRole: z.enum(["Internship", "Fresher", "Junior", "Senior"], {
    //     error: "Please select job role",
    // }),
    jobRole: z.enum(["1", "2", "3", "4"], {
        error: "Please select job role",
    }),
    applicationDeadline: z.date({ error: "Please select dates" }),
    salaryMin: z.string(),
    salaryMax: z.string(),
});

export type CreateJobFormData = z.infer<typeof CreateJobSchema>;

export type CreateJobPayload = {
    title: string;
    description: string;
    responsibilities: string;
    requirements: string;
    location: string;
    workplace: string; // "ONSITE" | "REMOTE" | "HYBRID"
    status: string; // Your jobStatusEnum values
    salaryMin: number;
    salaryMax: number;
    jobRoleId: number;
    applicationDeadline: string;
};

export const EditJobSchema = z
    .object({
        title: z.string().optional(),
        description: z.string().optional(),
        responsibilities: z.string().optional(),
        requirements: z.string().optional(),
        location: z.string().optional(),
        workPlace: z.enum(["ONSITE", "REMOTE", "HYBRID"]).optional(),
        jobRole: z.enum(["1", "2", "3", "4"]).optional(),
        applicationDeadline: z.date().optional(),
        salaryMin: z.string().optional(),
        salaryMax: z.string().optional(),
    })
    .refine(
        (data) => {
            // At least one field must have a value
            return Object.values(data).some((value) => value !== undefined && value !== "");
        },
        {
            message: "At least one field is required",
            path: [], // Applies to entire form
        },
    );

export type EditJobFormData = z.infer<typeof EditJobSchema>;

export type EditJobPayload = {
    title?: string;
    description?: string;
    responsibilities?: string;
    requirements?: string;
    location?: string;
    workplace?: string;
    status?: string;
    salaryMin?: number;
    salaryMax?: number;
    applicationDeadline?: string;
    jobRoleId?: number;
};

// SKILLS

export type addSkillResponse = {
    jobId: 37;
    skill: {
        id: 1;
        name: "JavaScript";
    };
};

// BENEFIT

export type addBenefitResponse = {
    jobId: number;
    benefitName: string[];
};

// UPDATE STATUS

export enum EditJobStatus {
  ACTIVE = "ACTIVE",
//   PENDING = "PENDING",
//   EXPIRED = "EXPIRED",
//   REJECTED = "REJECTED",
}

export type updateStatusPayload = {
    status: EditJobStatus
}
