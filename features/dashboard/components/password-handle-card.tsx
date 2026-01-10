"use client";
import { FormPassword } from "@/components/custom-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import CardHeaderWrapper from "./card-header-wrapper";

const authType = "OAUTH";
const isPasswordSet = true;

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
    isPasswordSet ? ChangePasswordSchema : SetPasswordSchema
);

type ChangePassword = z.infer<typeof ChangePasswordSchema>;
type SetPassword = z.infer<typeof SetPasswordSchema>;

type Password = ChangePassword | SetPassword;

const form = useForm<Password>({
    resolver: schema,
    defaultValues: {},
    mode: "onChange",
    reValidateMode: "onChange",
});

function onSubmit(data: any) {
    console.log({ data });
}

export default function PasswordHandleCard() {
    return (
        <CardHeaderWrapper title="f" isButton={false} width="max-w-2xl">
            <div>
                <FormPassword
                    control={form.control}
                    form={form}
                    name="password"
                    label="Current Password"
                    placeholder="Enter current password"
                    required
                    errorReserve
                />
            </div>
        </CardHeaderWrapper>
    );
}
