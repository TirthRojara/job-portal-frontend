"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CardHeaderWrapper from "@/features/dashboard/components/card-header-wrapper";
import { SearchAddDialog } from "@/features/dashboard/components/search-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { PencilLine, Plus, X } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import React, { useState } from "react";
import { useGetBenefitList, useGetJobIdBenefit } from "../../[jobId]/api/query";
import { useAddBenefit, useRemoveBenefit } from "../api/mutation";

const ALL_SKILLS = [
    { value: "react", label: "React" },
    { value: "java", label: "Java" },
    { value: "javascript", label: "JavaScript" },
    { value: "css", label: "CSS" },
    { value: "python", label: "Python" },
];

export default function JobBenefitAndPerks() {
    // 1. STATE: Track the search text
    const [searchQuery, setSearchQuery] = useState("");

    const queryClient = useQueryClient();
    const pathname = usePathname();
    const params = useParams();
    const jobIdInParams = params.jobId;

    // JOB ID FOR CREATE
    const jobIdInSession = sessionStorage.getItem("jobId");
    // JOB ID FOR EDIT
    const jobIdFromParams = Array.isArray(jobIdInParams) ? jobIdInParams[0] : jobIdInParams;

    const isCreatePath = pathname === "/dashboard/recruiter/jobpost/create";
    const isEditPath = pathname.startsWith("/dashboard/recruiter/jobpost/") && pathname.endsWith("/edit");

    const jobIdByCondition = isCreatePath ? jobIdInSession : jobIdFromParams;

    // 2. Benefit list
    const { data: benefitListData } = useGetBenefitList();

    // 3. job id benefit
    const { data: jobBenefitData } = useGetJobIdBenefit(Number(jobIdByCondition));

    // 4. Mutation
    const { mutate: addBenefitMutate } = useAddBenefit();
    const { mutate: removeBenefitMutate } = useRemoveBenefit();

    const BenefitList = benefitListData?.data || [];

    const filteredResults = BenefitList.map((item: any) => ({
        label: item.name, // visible name: "life insurance"
        value: item.name, // unique ID: using name since no ID provided
    })).filter((item: any) => item.label.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    const handleAddBenefit = (item: any) => {
        addBenefitMutate({ jobId: Number(jobIdByCondition), benefitName: item.label });
    };

    const handleRemoveBenefit = (benefit: string) => {
        removeBenefitMutate({ jobId: Number(jobIdByCondition), benefitName: benefit });
    };

    return (
        <form className="flex flex-col gap-6 w-full max-w-3xl">
            <CardHeaderWrapper
                title="Benefits & Perks"
                buttonLabel="Add"
                isButton={false}
                lucidIcon={Plus}
                searchDialogAction={
                    <SearchAddDialog
                        title={"Skill"}
                        inputLabel={"Skill"}
                        placeholder="e.g. HTML"
                        description=" "
                        trigger={
                            <Button variant={"outline"}>
                                <Plus className="" /> <p>Add</p>
                            </Button>
                        }
                        searchResults={filteredResults}
                        onSearchChange={handleSearchChange}
                        onItemSelect={handleAddBenefit}
                    />
                }
            >
                <div className="flex gap-2 flex-wrap">
                    {jobBenefitData?.data?.benefitNames.map((benefit) => (
                        <Badge
                            onClick={() => handleRemoveBenefit(benefit)}
                            key={benefit}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm group cursor-pointer"
                        >
                            {benefit}
                            <X className="ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Badge>
                    ))}
                </div>
            </CardHeaderWrapper>
        </form>
    );
}
