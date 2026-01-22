"use client";
import { FormPassword } from "@/components/custom-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CardHeaderWrapper from "../card-header-wrapper";
import { useSetNewPassword } from "@/features/auth/forgotpassword/api/mutation";
import {
    ChangePasswordPayload,
    ChangePasswordSchema,
    ForgotPasswordPayload,
    ForgotPasswordSchema,
    SetPasswordPayload,
    SetPasswordSchema,
} from "./api/types";
import { useChangePassword, useSetPasswordForOauth } from "./api/mutation";
import { Spinner } from "@/components/ui/spinner";
import { useIsPasswordSetForOauth } from "./api/query";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

// const authType = "OAUTH";
// const isPasswordSet = true;
// const isForgotPassword = false;

// isPasswordSet => we have to check it from backend

interface PasswordHandleCardProps {
    isForgotPasswordProp?: boolean;
}

const ChangePassword = () => {
    const { mutate, isPending } = useChangePassword();

    const form = useForm<ChangePasswordPayload>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
        },
        mode: "onChange",
        reValidateMode: "onChange",
    });

    function onSubmit(data: ChangePasswordPayload) {
        mutate(data);
    }

    return (
        <CardHeaderWrapper title="Change Password" isButton={false} width="max-w-md">
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6 w-full">
                    <div className="flex flex-col gap-6">
                        <FormPassword
                            control={form.control}
                            form={form}
                            name="currentPassword"
                            label="Current Password"
                            placeholder="Enter current password"
                            required
                            errorReserve
                        />
                        <FormPassword
                            control={form.control}
                            form={form}
                            name="newPassword"
                            label="New Password"
                            placeholder="Enter new password"
                            required
                            errorReserve
                        />

                        <Link
                            href="/forgotpassword"
                            className="hover:underline w-fit text-blue-600 hover:text-blue-800 transition-colors "
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <Button disabled={isPending}>
                        {isPending && <Spinner />}
                        {isPending ? "Updating..." : "Update Password"}
                    </Button>
                </div>
            </form>
        </CardHeaderWrapper>
    );
};

const SetPassword = () => {
    const { mutate, isPending } = useSetPasswordForOauth();

    const form = useForm<SetPasswordPayload>({
        resolver: zodResolver(SetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
        reValidateMode: "onChange",
    });

    function onSubmit(data: SetPasswordPayload) {
        mutate(data);
    }

    return (
        <>
            <CardHeaderWrapper title="Set Password" isButton={false} width="max-w-md">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6 w-full">
                        <FormPassword
                            control={form.control}
                            form={form}
                            name="password"
                            label="Password"
                            placeholder="Enter password"
                            required
                            errorReserve
                        />
                        <FormPassword
                            control={form.control}
                            form={form}
                            name="confirmPassword"
                            label="Confirm Password"
                            placeholder="Enter Confirm password"
                            required
                            errorReserve
                        />

                        <Button disabled={isPending}>
                            {isPending && <Spinner />}
                            {isPending ? "Setting Password..." : "Set Password"}
                        </Button>
                    </div>
                </form>
            </CardHeaderWrapper>
        </>
    );
};

const ForgotPassword = () => {
    const { mutate, isPending } = useSetNewPassword();

    const form = useForm<ForgotPasswordPayload>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            newPassword: "",
        },
        mode: "onChange",
        reValidateMode: "onChange",
    });

    function onSubmit(data: ForgotPasswordPayload) {
        mutate(data.newPassword);
    }

    return (
        <CardHeaderWrapper title="Set New Password" isButton={false} width="max-w-md">
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6 w-full">
                    <FormPassword
                        control={form.control}
                        form={form}
                        name="newPassword"
                        label="New Password"
                        placeholder="Enter new password"
                        required
                        errorReserve
                    />
                    <Button disabled={isPending}>
                        {isPending && <Spinner />}
                        {isPending ? "Setting New Password..." : "Set New Password"}
                    </Button>
                </div>
            </form>
        </CardHeaderWrapper>
    );
};

const SkeletonLoader = () => {
    return (
        <CardHeaderWrapper
            // 1. Pass a Skeleton as the title so the header pulses too
            title='Password Settings'
            isButton={false}
            width="max-w-md"
        >
            <div className="flex flex-col gap-6 w-full pt-2">
                {/* Field 1 (Current Password / Password) */}
                <div className="flex flex-col gap-3">
                    {/* Label Skeleton */}
                    <Skeleton className="h-4 w-32" />
                    {/* Input Box Skeleton */}
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>

                {/* Field 2 (New Password / Confirm Password) */}
                <div className="flex flex-col gap-3">
                    {/* Label Skeleton */}
                    <Skeleton className="h-4 w-28" />
                    {/* Input Box Skeleton */}
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>

                {/* Forgot Password Link Placeholder (Optional - remove if not needed for 'Set Password') */}
                <Skeleton className="h-4 w-36" />

                {/* Submit Button Skeleton */}
                <Skeleton className="h-10 w-full rounded-md mt-1" />
            </div>
        </CardHeaderWrapper>
    );
};

export default function PasswordHandleCard({ isForgotPasswordProp = false }: PasswordHandleCardProps) {
    const isPasswordSet = true; // => we have to check it from backend and for that create a new endpoint
    // const isForgotPasswordProp = false; // => this is got from props

    const { data, error, isLoading } = useIsPasswordSetForOauth();

    if (isForgotPasswordProp) {
        return <ForgotPassword />;
    }

    if (isLoading) {
        return <SkeletonLoader />;
    }

    if (error) {
        toast.error("Please reload the page.");
    }

    return <>{data?.data?.isPasswordSet ? <ChangePassword /> : <SetPassword />}</>;
}
