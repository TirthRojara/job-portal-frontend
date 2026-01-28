import { Status, WorkPlace } from "@/features/dashboard/recruiter/jobpost/api/types";

export interface SavedJobResponse {
    id: number;
    title: string;
    description: string;
    responsibilities: string;
    requirements: string;
    location: string;
    workplace: WorkPlace | "REMOTE" | "HYBRID" | "ONSITE";
    status: Status | "PENDING" | "ACTIVE" | "EXPIRED" | "REJECTED";
    salaryMin: number;
    salaryMax: number;
    postedAt: string;
    applicationDeadline: string;
    updateAt: string;
    jobRoleId: number;
    jobRoleName: string;
    companyId: number;
    companyName: string;
    isAppliedByUser: boolean;
    // savedAt: string;
}
