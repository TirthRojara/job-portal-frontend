import { StyledString } from "next/dist/build/swc/types";

export type RazorpayKeyIdResponse = {
    keyId: string;
};

export type CreateSubscriptionResponse = {
    id: number;
    razorpaySubscriptionId: string;
    status: string;
    packageId: number;
    razorpayPlanId: string;
    startAt: Date | null;
    endAt: Date | null;
    nextPayment: Date | null;
    totalCount: number | null;
    paidCount: number | null;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
    recruiterId: number;
};

export type SubscriptionResponse = {
    sub: {
        id: number;
        startDate: string;
        endDate: string | null;
        razorpaySubscriptionId: string | null;
        status: string;
        billingCycleCount: number;
        userId: number;
        package: {
            id: number;
            planId: string;
            label: string;
            price: number;
            jobPostLimit: number;
            isActive: boolean;
        };
    };
    chargedAt: {
        nextPayment: string | null;
        status: string | null;
    };
};

export type PaymentHistoryResponse = {
    id: number;
    razorpayPaymentId: string;
    razorpaySubscriptionId: string;
    amount: number;
    currency: string;
    status: string;
    paymentMethod: string;
    failureReason: string | null;
    createdAt: string;
    updatedAt: string;
    plan: string;
};
