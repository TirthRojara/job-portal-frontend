import z from "zod";

export type ApplicantsResponse = {
    id: number;
    applyDate: string;
    status: string;
    companyId: number;
    candidateProfile: {
        id: number;
        fullName: string;
        summary: string;
        address: string;
    };
    job: {
        id: number;
        title: string;
    };
};

export type ApplicationByIdResponse = {
    id: number;
    applyDate: string;
    // status: ApplicationStatuswithPending;
    status: ApplicationStatus;
    companyId: number;
    job: {
        id: number;
        title: string;
    };
};

export enum ApplicationStatus {
    INTOUCH = "INTOUCH",
    NOTSELECT = "NOTSELECT",
    SELECTED = "SELECTED",
    PENDING = "PENDING",
    VIEWED = "VIEWED",
}

// export type EditableApplicationStatus = Exclude<ApplicationStatus, ApplicationStatus.PENDING | ApplicationStatus.VIEWED>;

// const editableStatuses = [ApplicationStatus.INTOUCH, ApplicationStatus.NOTSELECT, ApplicationStatus.SELECTED] as const;

// export enum ApplicationStatuswithPending {
//     INTOUCH = "INTOUCH",
//     NOTSELECT = "NOTSELECT",
//     SELECTED = "SELECTED",
//     PENDING = "PENDING",
//     VIEWED = "VIEWED",
// }

// export enum ApplicationStatus {
//     INTOUCH = "INTOUCH",
//     NOTSELECT = "NOTSELECT",
//     SELECTED = "SELECTED",
// }

export const updateJobStatusSchema = z.object({
    // status: z.enum(["INTOUCH", "REJECTED", "SELECTED"], {
    status: z.enum(ApplicationStatus).optional(),
});

export type UpdateJobStatus = z.infer<typeof updateJobStatusSchema>;

export type UpdateJobStatusPayload = {
    candidateProfileId: number;
    status: ApplicationStatus;
};
