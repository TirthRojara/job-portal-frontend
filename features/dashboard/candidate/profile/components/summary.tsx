"use client";
import CardHeaderWrapper from "@/features/dashboard/components/card-header-wrapper";
import React from "react";

export default function Summary({ summary }: { summary: string }) {
    return (
        <CardHeaderWrapper title="Summary" width="max-w-4xl" isButton={false}>
           {summary}
        </CardHeaderWrapper>
    );
}
