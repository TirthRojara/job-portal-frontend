export enum TeamSizeRange {
    ZERO_TO_ONE = "ZERO_TO_ONE",
    TWO_TO_TEN = "TWO_TO_TEN",
    ELEVEN_TO_FIFTY = "ELEVEN_TO_FIFTY",
    FIFTY_ONE_TO_TWO_HUNDRED = "FIFTY_ONE_TO_TWO_HUNDRED",
    TWO_HUNDRED_ONE_TO_FIVE_HUNDRED = "TWO_HUNDRED_ONE_TO_FIVE_HUNDRED",
    FIVE_HUNDRED_ONE_TO_ONE_THOUSAND = "FIVE_HUNDRED_ONE_TO_ONE_THOUSAND",
    OVER_ONE_THOUSAND = "OVER_ONE_THOUSAND",
}

export interface CompanyApiResponse {
    id: number;
    name: string;
    description: string;
    location: string;
    address: string;
    mapLink: string;
    websiteUrl: string;
    teamSizeLabel: TeamSizeRange;
    totalEmployees: number;
    establishedDate: string;
    isApproved: boolean;
    views: number;
    userId: number;
}

export interface CompanyIndustry {
    id: number;
    industry: {
        name: string;
    };
}
