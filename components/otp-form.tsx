"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { useState } from "react";

// type MutationFn = (variables: any) => Promise<any>;
type MutationHook<TData, TError, TVariables> = (
    options?: UseMutationOptions<TData, TError, TVariables>,
) => UseMutationResult<TData, TError, TVariables>;

export function OTPForm<TData = any, TError = unknown, TVariables = any>({
    mutation,
    ...props
}: React.ComponentProps<typeof Card> & { mutation: MutationHook<TData, TError, TVariables> }) {
    const { mutate, isPending } = mutation();
    const [otpValue, setOtpValue] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ otpValue });
        mutate({ otp: Number(otpValue) } as any);
    };

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Enter verification code</CardTitle>
                <CardDescription>We sent a 6-digit code to your email.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="otp">Verification code</FieldLabel>
                            <InputOTP maxLength={6} id="otp" required value={otpValue} onChange={(value) => setOtpValue(value)}>
                                <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                            <FieldDescription>Enter the 6-digit code sent to your email.</FieldDescription>
                        </Field>

                        <FieldGroup>
                            <Button type="submit">Verify</Button>
                            <FieldDescription className="text-center">
                                Didn&apos;t receive the code? <a href="#">Resend</a>
                            </FieldDescription>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
