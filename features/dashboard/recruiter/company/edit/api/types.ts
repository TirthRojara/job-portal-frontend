import z from "zod";

export enum TeamSizeRange {
    ZERO_TO_ONE = "ZERO_TO_ONE",
    TWO_TO_TEN = "TWO_TO_TEN",
    ELEVEN_TO_FIFTY = "ELEVEN_TO_FIFTY",
    FIFTY_ONE_TO_TWO_HUNDRED = "FIFTY_ONE_TO_TWO_HUNDRED",
    TWO_HUNDRED_ONE_TO_FIVE_HUNDRED = "TWO_HUNDRED_ONE_TO_FIVE_HUNDRED",
    FIVE_HUNDRED_ONE_TO_ONE_THOUSAND = "FIVE_HUNDRED_ONE_TO_ONE_THOUSAND",
    OVER_ONE_THOUSAND = "OVER_ONE_THOUSAND",
}

export type Company = {
    id: number;
    name: string;
    description: string;
    location: string;
    address: string | null;
    mapLink: string | null;
    websiteUrl: string | null;
    teamSizeLabel: TeamSizeRange | null;
    totalEmployees: number;
    establishedDate: string;
    isApproved: boolean;
    views: number | null;
    userId: number;
};

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const CompanyCreateSchema = z.object({
    name: z.string().min(1, "Required"),
    description: z.string().min(1, "Required"),
    location: z.string().min(1, "Required"),
    address: z.string().optional(),
    mapLink: z.string().optional(),
    websiteUrl: z.string().optional(),
    totalEmployees: z.string().min(1, "Required"),
    establishedDate: z.date({ error: "Please select dates" }),
    // establishedDate: z
    //     .string()
    //     .min(1, "Please select a date") // valid if required
    //     .regex(dateRegex, "Date must be in YYYY-MM-DD format")
    //     .refine((date) => !isNaN(Date.parse(date)), "Invalid Date"),
});

export const CompanyUpdateSchema = z.object({
    name: z.string().min(1, "Required").optional(),
    description: z.string().min(1, "Required").optional(),
    location: z.string().min(1, "Required").optional(),
    address: z.string().optional(),
    mapLink: z.string().optional(),
    websiteUrl: z.string().optional(),
    totalEmployees: z.string().min(1, "Required").optional(),
    establishedDate: z.date({ error: "Please select dates" }).optional(),
    // establishedDate: z.string().regex(dateRegex, "Date must be in YYYY-MM-DD format").optional(),
});

export type ICompanyCreate = z.infer<typeof CompanyCreateSchema>;
export type ICompanyUpdate = z.infer<typeof CompanyUpdateSchema>;

export type ICompanyCreatePayload = {
    name: string;
    description: string;
    location: string;
    address: string | null;
    mapLink: string | null;
    websiteUrl: string | null;
    totalEmployees: number;
    establishedDate: string;
};

// export type ICompanyUpdatePayload = {
//     name?: string;
//     description?: string;
//     location?: string;
//     address?: string | null;
//     mapLink?: string | null;
//     websiteUrl?: string | null;
//     totalEmployees?: number;
//     establishedDate?: string;
// };
