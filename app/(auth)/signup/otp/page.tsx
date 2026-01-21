import { OTPForm } from "@/components/otp-form";
import { useVerifySignupOTP } from "@/features/auth/signup/otp/mutation";
import React from "react";

export default function Page() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-muted">
            <div className="w-full max-w-xs  relative bottom-20">
                <OTPForm mutation={useVerifySignupOTP} />
            </div>
        </div>
    );
}
