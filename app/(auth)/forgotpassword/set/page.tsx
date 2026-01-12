
import PasswordHandleCard from "@/features/dashboard/components/account/password-handle-card";
import React from "react";

export default function Page() {
    return (
        <div className="flex w-full justify-center top-50 relative px-4">
            <PasswordHandleCard isForgotPasswordProp />
        </div>
    );
}
