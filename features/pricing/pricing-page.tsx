"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBuySubscription } from "../dashboard/components/account/api/subscription/mutation";
import { Spinner } from "@/components/ui/spinner";
import { useGetUserData } from "../dashboard/api/query";
import { useGetSubscription } from "../dashboard/components/account/api/subscription/query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "@/types/api";
import { useRouter } from "next/navigation";

// --- Types & Data ---

type PricingPlan = {
    id: number;
    name: string;
    price: string;
    description: string;
    jobLimit: number;
    features: { name: string; included: boolean }[];
    isPopular?: boolean;
    buttonText: string;
    buttonVariant: "default" | "outline" | "secondary";
};

const pricingPlans: PricingPlan[] = [
    {
        id: 4,
        name: "Free",
        price: "₹0",
        description: "Perfect for getting started and testing the platform.",
        jobLimit: 3,
        features: [
            { name: "3 Job Posts / Month", included: true },
            { name: "Basic Applicant Dashboard", included: true },
            { name: "Email Support", included: false },
            { name: "Featured Listings", included: false },
            { name: "Company Branding", included: false },
        ],
        buttonText: "Current Plan",
        buttonVariant: "outline",
    },
    {
        id: 1,
        name: "Basic",
        price: "₹399",
        description: "Great for small businesses hiring occasionally.",
        jobLimit: 10,
        features: [
            { name: "10 Job Posts / Month", included: true },
            { name: "Advanced Applicant Dashboard", included: true },
            { name: "Email Support", included: true },
            { name: "Featured Listings", included: false },
            { name: "Company Branding", included: false },
        ],
        isPopular: true,
        buttonText: "Upgrade to Basic",
        buttonVariant: "default",
    },
    {
        id: 2,
        name: "Pro",
        price: "₹699",
        description: "For power users and growing teams with high volume.",
        jobLimit: 25,
        features: [
            { name: "25 Job Posts / Month", included: true },
            { name: "Advanced Applicant Dashboard", included: true },
            { name: "Priority Email & Chat Support", included: true },
            { name: "Featured Listings", included: true },
            { name: "Company Branding", included: true },
        ],
        buttonText: "Upgrade to Pro",
        buttonVariant: "default",
    },
];

// --- Main Component ---

export default function PricingPage() {
    const [pendingPlanId, setPendingPlanId] = useState<number | null>(null);

    const router = useRouter();

    const { data: user, isPending: isUserPending, isError: isUserError } = useGetUserData();
    const {
        data: subscription,
        isPending: isSubscriptionPending,
        isError: isSubscriptionError,
    } = useGetSubscription(user?.data?.role);

    console.log({ subscription });

    const { mutateAsync, isPending: isRazorPayPopUpPending } = useBuySubscription();

    // 4 => free, 1 => basic, 2 => pro

    // const currentPlanId = 4;

    const handleUpgrade = async (planId: number) => {
        console.log(`Redirecting to payment provider for plan: ${planId}`);

        setPendingPlanId(planId);

        try {
            const data = await mutateAsync(
                { packageId: planId },
                {
                    onError: (error) => {
                        setPendingPlanId(null);
                        toast.error(error.response?.data.message || "Something went wrong.");
                    },
                    onSettled: () => {
                        setPendingPlanId(null);
                    },
                },
            );

            const options = {
                key: data.keyData.data?.keyId,
                subscription_id: data.subscriptionData.data?.razorpaySubscriptionId,
                name: "Easy Apply TR limited",
                description: "Subscription Payment method descripiton",
                image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWdhbGxlcnktdmVydGljYWwtZW5kLWljb24gbHVjaWRlLWdhbGxlcnktdmVydGljYWwtZW5kIj48cGF0aCBkPSJNNyAyaDEwIi8+PHBhdGggZD0iTTUgNmgxNCIvPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxMiIgeD0iMyIgeT0iMTAiIHJ4PSIyIi8+PC9zdmc+",
                callback_url: "http://localhost:3000/dashboard/recruiter/account?tab=subscription&success=true",
                prefill: {
                    name: `${user?.data?.name}`,
                    email: `${user?.data?.email}`,
                },
                notes: {
                    packageId: planId,
                    razorpaySubscriptionId: data.subscriptionData.data?.razorpaySubscriptionId,
                },
                theme: {
                    color: "#3e7ee7",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.log("handleUpgrade", error);
        }
    };

    if (isUserError || isUserPending || isSubscriptionPending || isSubscriptionError) return <></>;

    return (
        <div className="container mx-auto py-16 px-4">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Simple, Transparent Pricing</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Choose the plan that fits your hiring needs. All plans include access to our candidate pool. Change or cancel
                    anytime.
                </p>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {pricingPlans.map((plan) => {
                    // const isCurrent = currentPlanId === plan.id;
                    const isCurrent = subscription.data?.sub.package.planId == plan.name;

                    // Check if THIS specific plan is the one pending
                    const isLoadingThisPlan = pendingPlanId === plan.id;

                    // Check if ANY plan is pending (to disable all buttons so user can't click twice)
                    const isAnyPlanPending = pendingPlanId !== null;

                    return (
                        <Card
                            key={plan.id}
                            className={cn(
                                "flex flex-col relative overflow-hidden transition-all duration-200 hover:shadow-md",
                                // Highlight the popular plan with a border and slight shadow
                                plan.isPopular ? "border-primary shadow-sm scale-[1.02] md:-mt-4 md:mb-4 z-10" : "border-border",
                            )}
                        >
                            {plan.isPopular && (
                                <div className="absolute top-0 right-0">
                                    <Badge
                                        variant="default"
                                        className="rounded-tl-none rounded-br-none px-4 py-1 uppercase text-xs font-bold"
                                    >
                                        Most Popular
                                    </Badge>
                                </div>
                            )}

                            <CardHeader className="pb-8 pt-12">
                                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                                <CardDescription className="mt-2">{plan.description}</CardDescription>
                            </CardHeader>

                            <CardContent className="flex-1">
                                <div className="mb-8">
                                    <span className="text-4xl font-extrabold">{plan.price}</span>
                                    {plan.price !== "₹0" && <span className="text-muted-foreground ml-2">/ month</span>}
                                </div>

                                <Separator className="mb-6" />

                                {/* Feature List */}
                                <ul className="space-y-4 text-sm leading-6 -mb-8">
                                    {plan.features.map((feature, index) => (
                                        <li
                                            key={index}
                                            className={cn(
                                                "flex items-center gap-x-3",
                                                feature.included ? "text-foreground" : "text-muted-foreground/60",
                                            )}
                                        >
                                            {feature.included ? (
                                                <CheckCircle2 className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                                            ) : (
                                                <XCircle className="h-5 w-5 flex-none" aria-hidden="true" />
                                            )}
                                            {feature.name}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter className="pt-8 pb-8">
                                {plan.name !== "Free" && (
                                    <Button
                                        disabled={isCurrent || isAnyPlanPending || isRazorPayPopUpPending}
                                        variant={isCurrent ? "secondary" : plan.buttonVariant}
                                        className="w-full text-base font-semibold py-6"
                                        onClick={() => !isCurrent && handleUpgrade(plan.id)}
                                    >
                                        {/* {isCurrent ? "Your Current Plan" : plan.buttonText} */}
                                        {/* {isLoadingThisPlan ? <Spinner /> : `${plan.buttonText}`} */}
                                        {isLoadingThisPlan && isRazorPayPopUpPending ? (
                                            <Spinner />
                                        ) : isCurrent ? (
                                            "Your Current Plan"
                                        ) : (
                                            plan.buttonText
                                        )}
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>

            {/* FAQ or Extra Info Section */}
            <div className="mt-16 text-center text-sm text-muted-foreground">
                <p>
                    Prices quoted in INR. Need a custom enterprise plan?{" "}
                    <a href="#" className="underline underline-offset-2 text-primary">
                        Contact sales
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}
