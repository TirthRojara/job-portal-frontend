"use client";
import CardHeaderWrapper from "@/features/dashboard/components/card-header-wrapper";
import React from "react";

export default function About({ desscription }: { desscription: string }) {
    return (
        <CardHeaderWrapper isButton={false} title="About Company" width="max-w-5xl">
            <p className="-mt-3 text-muted-foreground  whitespace-pre-wrap">{desscription}</p>
        </CardHeaderWrapper>
    );
}
