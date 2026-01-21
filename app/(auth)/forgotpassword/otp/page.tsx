import { OTPForm } from "@/components/otp-form";
import { useVerifyForgotOTP } from "@/features/auth/forgotpassword/api/mutation";
import React from "react";

export default function Page() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-muted">
            <div className="w-full max-w-xs  relative bottom-20 flex flex-col gap-6 ">
                <p className=" font-semibold ml-16">Please do not refresh until password is set.</p>
                <OTPForm mutation={useVerifyForgotOTP} type="forgot-password" />
            </div>
        </div>
    );
}
