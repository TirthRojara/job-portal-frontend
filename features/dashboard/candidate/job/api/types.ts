import { Status, WorkPlace } from "@/features/dashboard/recruiter/jobpost/api/types";

enum ApplyStatus {
    PENDING = "PENDING",
    VIEWED = "VIEWED",
    SELECTED = "SELECTED",
    NOTSELECT = "NOTSELECT",
    INTOUCH = "INTOUCH",
}

export type applyJobResponse = {
    id: number;
    companyId: number;
    status: ApplyStatus;
    jobId: number;
    applyDate: Date;
    candidateProfileId: number;
};

export type JobResponseCandidate = {
    id: number;
    title: string;
    description: string;
    responsibilities: string;
    requirements: string;
    location: string;
    workplace: WorkPlace | "REMOTE" | "ONSITE" | "HYBRID";
    status: Status | "PENDING" | "ACTIVE" | "EXPIRED" | "REJECTED";
    salaryMin: number;
    salaryMax: number;

    // Dates usually come as strings from APIs
    postedAt: string;
    applicationDeadline: string;
    updateAt: string;

    totalview: number;
    // companyId: number;

    jobRoleId: number;
    jobRoleName: string;

    companyId: number;
    companyName: string;

    isAppliedByUser: boolean;
    isSaved: boolean;
};
