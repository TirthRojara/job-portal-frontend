"use client";
import CardHeaderWrapper from "@/features/dashboard/components/card-header-wrapper";
import { MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function LocationBox({location}: {location:string}) {
    return (
        <CardHeaderWrapper isButton={false} title="Location" width="max-w-5xl">
            <div className=" flex gap-3 items-start">
                <div>
                    <MapPin />
                </div>
                <div>
                    <p className="font-semibold ">Address</p>
                    <Link
                        href=""
                        className="hover:text-blue-600 hover:underline transition-colors duration-200 text-muted-foreground"
                    >
                        {/* 123 Innovation Drive, San Francisco, CA 94105 */}
                        {location}
                    </Link>
                </div>
            </div>
        </CardHeaderWrapper>
    );
}
