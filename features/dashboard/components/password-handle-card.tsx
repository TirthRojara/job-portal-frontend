"use client";
import { FormPassword } from "@/components/custom-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import CardHeaderWrapper from "./card-header-wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const authType = "OAUTH";
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

const schema = zodResolver(
    isForgotPassword
        ? ForgotPasswordSchema
        : isPasswordSet
        ? ChangePasswordSchema
        : SetPasswordSchema
);

type ForgotPassword = z.infer<typeof ForgotPasswordSchema>;
type ChangePassword = z.infer<typeof ChangePasswordSchema>;
type SetPassword = z.infer<typeof SetPasswordSchema>;

type Password = ChangePassword | SetPassword | ForgotPassword;

interface PasswordHandleCardProps {
  isForgotPasswordProp?: boolean;
}

export default function PasswordHandleCard({isForgotPasswordProp = false}: PasswordHandleCardProps) {
    const form = useForm<Password>({
        resolver: schema,
        defaultValues: {},
        mode: "onChange",
        reValidateMode: "onChange",
    });

    function onSubmit(data: any) {
        console.log({ data });
    }

    const changePassword = (
        <CardHeaderWrapper
            title={isPasswordSet ? "Change Password" : "Set Password"}
            isButton={false}
            width="max-w-md"
        >
            {/* change password */}
            <div className="flex flex-col gap-6 w-full">
                {isPasswordSet ? (
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
                            href=""
                            className="hover:underline w-fit text-blue-600 hover:text-blue-800 transition-colors "
                        >
                            Forgot Password?
                        </Link>
                    </div>
                ) : (
                    <>
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
                    </>
                )}
                <Button>
                    {isPasswordSet ? "Update Password" : "Set Password"}
                </Button>
            </div>
        </CardHeaderWrapper>
    );

    const forgotPassword = (
        <CardHeaderWrapper
            title={isPasswordSet ? "Change Password" : "Set Password"}
            isButton={false}
            width="max-w-md"
        >
            {/* change password */}
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

                <Button>
                    Set New Password
                </Button>
            </div>
        </CardHeaderWrapper>
    );

    return <>{isForgotPasswordProp ? forgotPassword : changePassword}</>;
}
