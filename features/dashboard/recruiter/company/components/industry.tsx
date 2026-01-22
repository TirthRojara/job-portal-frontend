"use client";
import { Badge } from "@/components/ui/badge";
import CardHeaderWrapper from "@/features/dashboard/components/card-header-wrapper";
import { X } from "lucide-react";
import React from "react";
import { useGetCompanyIndustry } from "../api/query";
import { string } from "zod";
import { CompanyIndustry } from "../api/types";

const role = "CANDIDATE";

export default function Industry({ companyId }: { companyId: number }) {
    const { data, isLoading, error } = useGetCompanyIndustry(`${companyId}`);

    if (isLoading || error) return;

    const industries = data?.data || [];

    return (
        <CardHeaderWrapper title="Industries" width="max-w-5xl" buttonLabel="Add" isButton={role === "CANDIDATE" ? false : true}>
            <div className="flex gap-2 flex-wrap">
                {industries.map((item: CompanyIndustry) => (
                    <Badge key={item.id} className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm group ">
                        {item.industry.name}
                        {/* <X className="ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" /> */}
                    </Badge>
                ))}
            </div>
        </CardHeaderWrapper>
    );
}
