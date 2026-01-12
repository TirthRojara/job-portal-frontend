"use client";
import React from "react";
import SubscriptionBanner from "./subscription-banner";
import SubscriptionActionCard from "./subscription-action-card";
import { BillingHistory } from "./billing-history";

export default function ManageSubscriptionTab() {
    return (
        <div className="flex flex-col gap-6">
            <SubscriptionBanner />
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-6">
                <SubscriptionActionCard
                    variant="upgrade"
                    onAction={() => console.log("Upgrading...")}
                />

                <SubscriptionActionCard
                    variant="pause"
                    onAction={() => console.log("Pausing...")}
                />

                {/* <SubscriptionActionCard variant="resume" isActive={false} /> */}

                <SubscriptionActionCard
                    variant="cancel"
                    onAction={() => console.log("Cancelling...")}
                />
            </div>
            <BillingHistory />
        </div>
    );
}
