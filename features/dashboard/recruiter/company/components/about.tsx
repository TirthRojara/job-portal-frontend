"use client";
import CardHeaderWrapper from "@/features/dashboard/components/card-header-wrapper";
import React from "react";

const text = `TechVision Solutions is a leading technology company specializing in innovative software development, cloud solutions, and digital transformation services. We empower businesses worldwide with cutting-edge technology and exceptional talent. Our mission is to create impactful solutions that drive growth and success for our clients across various industries. \n\n TechVision Solutions is a leading technology company specializing in innovative software development, cloud solutions, and digital transformation services. We empower businesses worldwide with cutting-edge technology and exceptional talent. Our mission is to create impactful solutions that drive growth and success for our clients across various industries.`;

export default function About() {
    return (
        <CardHeaderWrapper
            isButton={false}
            title="About Company"
            width="max-w-5xl"
        >
            <p className="-mt-3 text-muted-foreground  whitespace-pre-wrap">
                {text}
            </p>
        </CardHeaderWrapper>
    );
}
