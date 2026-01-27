import { Status, WorkPlace } from "../../api/types";

export type JobByIdResponse = {
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

    postedAt: string;
    applicationDeadline: string;
    updateAt: string;

    totalview: number;

    jobRole: {
        id: number;
        name: string;
    };

    company: {
        id: number;
        name: string;
    };

    isDeleted?: boolean;
};

export type JobViewByIdResponse = {
    jobId: number;
    totalViews: number;
};

export type JobSkillResponse = {
    id: number;
    name: string;
};

export type JobBenefitResponse = {
    jobId: number;
    benefitNames: string[];
};
