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

// const authType = "OAUTH";
const isPasswordSet = true;
const isForgotPassword = false;

// isPasswordSet => we have to check it from backend

const ChangePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Required"),
    newPassword: z.string().min(1, "Required"),
});

const SetPasswordSchema = z.object({
    password: z.string().min(1, "Required"),
    confirmPassword: z.string().min(1, "Required"),
});

const ForgotPasswordSchema = z.object({
    newPassword: z.string().min(1, "Required"),
});

// const schema = zodResolver(isForgotPassword ? ForgotPasswordSchema : isPasswordSet ? ChangePasswordSchema : SetPasswordSchema);

type ForgotPassword = z.infer<typeof ForgotPasswordSchema>;
type ChangePassword = z.infer<typeof ChangePasswordSchema>;
type SetPassword = z.infer<typeof SetPasswordSchema>;

interface PasswordHandleCardProps {
    isForgotPasswordProp?: boolean;
}

const ChangePassword = () => {
    const form = useForm<ChangePassword>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {},
        mode: "onChange",
        reValidateMode: "onChange",
    });

    function onSubmit(data: any) {
        console.log({ data });
    }

    return (
        <CardHeaderWrapper title="Change Password" isButton={false} width="max-w-md">
            <form>
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

                    <Button>Update Password</Button>
                </div>
            </form>
        </CardHeaderWrapper>
    );
};

const SetPassword = () => {
    const form = useForm<SetPassword>({
        resolver: zodResolver(SetPasswordSchema),
        defaultValues: {},
        mode: "onChange",
        reValidateMode: "onChange",
    });

    function onSubmit(data: any) {
        console.log({ data });
    }

    return (
        <>
            <CardHeaderWrapper title="Set Password" isButton={false} width="max-w-md">
                <form>
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

                        <Button>Set Password</Button>
                    </div>
                </form>
            </CardHeaderWrapper>
        </>
    );
};

const ForgotPassword = () => {
    const { mutate } = useSetNewPassword();

    const form = useForm<ForgotPassword>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            newPassword: ""
        },
        mode: "onChange",
        reValidateMode: "onChange",
    });

    function onSubmit(data: ForgotPassword) {
        console.log({ data });
        mutate(data.newPassword);
    }

    return (
        <CardHeaderWrapper title={isPasswordSet ? "Change Password" : "Set Password"} isButton={false} width="max-w-md">
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
                    <Button>Set New Password</Button>
                </div>
            </form>
        </CardHeaderWrapper>
    );
};

export default function PasswordHandleCard({ isForgotPasswordProp = false }: PasswordHandleCardProps) {
    const isPasswordSet = true; // => we have to check it from backend and for that create a new endpoint
    // const isForgotPasswordProp = false; // => this is got from props

    if (isForgotPasswordProp) {
        return <ForgotPassword />;
    }

    return <>{isPasswordSet ? <ChangePassword /> : <SetPassword />}</>;
}
