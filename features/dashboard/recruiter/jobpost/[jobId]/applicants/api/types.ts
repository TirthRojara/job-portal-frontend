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
