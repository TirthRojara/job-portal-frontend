import { number } from "zod";

export enum ApplyStatus {
    PENDING = "PENDING",
    VIEWED = "VIEWED",
    SELECTED = "SELECTED",
    NOTSELECT = "NOTSELECT",
    INTOUCH = "INTOUCH",
}

export type ApplicationResponse = {
    id: number;
    applyDate: string;
    status: ApplyStatus;
    candidateProfileId: number;
    company: {
        id: number;
        name: string;
    };
    job: {
        id: number;
        title: string;
    };
};
