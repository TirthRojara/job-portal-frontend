"use client";
import { FormInput } from "@/components/custom-form";
import { Button } from "@/components/ui/button";
import { useForgotPassword } from "@/features/auth/forgotpassword/api/mutation";
import CardHeaderWrapper from "@/features/dashboard/components/card-header-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const ForgotPasswordSchema = z.object({
    email: z.string().min(1, "Required").email("Invalid email address"),
});

type ForgotPasswordPayload = z.infer<typeof ForgotPasswordSchema>;

export default function Page() {
    const { mutate, isPending } = useForgotPassword();

    const form = useForm<ForgotPasswordPayload>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: "",
        },
        mode: "onChange",
        reValidateMode: "onChange",
    });

    function onSubmit(data: any) {
        console.log({ data });
        mutate(data.email);
    }

    return (
        <div className="flex w-full justify-center top-50 relative px-4">
            <CardHeaderWrapper title="Forgot Password" isButton={false} width="max-w-md">
                {/* change password */}
                <div className="flex flex-col gap-6 w-full">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                        <FormInput
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="test@example.com"
                            required
                            type="email"
                            errorReserve
                        />

                        <Button type="submit">Send OTP</Button>
                    </form>
                </div>
            </CardHeaderWrapper>
        </div>
    );
}
