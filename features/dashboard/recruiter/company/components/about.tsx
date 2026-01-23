"use client";
import CardHeaderWrapper from "@/features/dashboard/components/card-header-wrapper";
import { formatText } from "@/lib/utils/utils";
import React from "react";

export default function About({ description }: { description: string }) {
    return (
        <CardHeaderWrapper isButton={false} title="About Company" width="max-w-5xl">
            <p className="-mt-3 text-muted-foreground  whitespace-pre-wrap">{formatText(description)}</p>
        </CardHeaderWrapper>
    );
}
