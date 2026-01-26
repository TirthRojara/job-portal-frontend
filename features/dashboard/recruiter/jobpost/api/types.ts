export enum WorkPlace {
    REMOTE = "REMOTE",
    ONSITE = "ONSITE",
    HYBRID = "HYBRID",
}

export enum Status {
    PENDING = "PENDING",
    ACTIVE = "ACTIVE",
    EXPIRED = "EXPIRED",
    REJECTED = "REJECTED",
}

export type SearchParams = {
    page: number;
    limit: number;
    filter?: string;
    salaryMin?: number;
    location?: string;
    workplace?: WorkPlace;
};



export type JobResponseRecruiter = {
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

    jobRole: {
        id: number;
        name: string;
    }

    company: {
        id: number;
        name: string;
    }

    isAppliedByUser: boolean;
};
