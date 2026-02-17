"use client";
import React, { useEffect } from "react";
import SubscriptionBanner from "./subscription-banner";
import SubscriptionActionCard from "./subscription-action-card";
import { BillingHistory } from "./billing-history";
import { useAppSelector } from "@/store/index.store";
import { useGetSubscription } from "./api/subscription/query";
import { useRouter } from "next/navigation";
import { useCancelSubscription, usePauseSubscription, useResumeSubscription } from "./api/subscription/mutation";

export default function ManageSubscriptionTab() {
    const router = useRouter();

    const role = useAppSelector((state) => state.app.role);

    const {
        data: subscription,
        isPending: isSubscriptionPending,
        isError: isSubscriptionError,
        isFetching,
        isEnabled,
    } = useGetSubscription(role);
    // console.log("sub tab: ", subscription);

    console.log({ isFetching, isEnabled });

    const { mutate: pauseMutate, isPending: isPausePending } = usePauseSubscription();
    const { mutate: resumeMutate, isPending: isResumePending } = useResumeSubscription();
    const { mutate: cancelMutate, isPending: isCancelPending } = useCancelSubscription();

    const handlePause = () => {
        pauseMutate({ subscriptionId: subscription?.data?.sub.razorpaySubscriptionId! });
    };
    const handleResume = () => {
        resumeMutate({ subscriptionId: subscription?.data?.sub.razorpaySubscriptionId! });
    };
    const handleCancel = () => {
        cancelMutate({ subscriptionId: subscription?.data?.sub.razorpaySubscriptionId! });
    };

    // useEffect(() => {
    console.log({ isResumePending });
    // }, [isResumePending]);

    return (
        <div className="flex flex-col gap-6">
            <SubscriptionBanner />
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-6">
                {subscription?.data?.sub.package.planId !== "Pro" && (
                    <SubscriptionActionCard variant="upgrade" onAction={() => router.push("/dashboard/recruiter/pricing")} />
                )}

                {subscription?.data?.chargedAt.status === "ACTIVE" && subscription.data.sub.package.planId !== "Free" && (
                    <SubscriptionActionCard variant="pause" isActive={isPausePending} onAction={handlePause} />
                )}

                {(subscription?.data?.chargedAt.status === "PAUSED" || isResumePending) &&
                    subscription?.data?.sub.package.planId !== "Free" && (
                        <SubscriptionActionCard variant="resume" isActive={isResumePending} onAction={handleResume} />
                    )}
                {/* <SubscriptionActionCard variant="resume" isActive={true} /> */}

                {subscription?.data?.sub.package.planId !== "Free" && subscription?.data?.chargedAt.status !== "CANCELLED" && (
                    <SubscriptionActionCard variant="cancel" isActive={isCancelPending} onAction={handleCancel} />
                )}
            </div>
            <BillingHistory />
        </div>
    );
}
