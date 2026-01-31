"use client";
import { Badge } from "@/components/ui/badge";
import CardHeaderWrapper from "@/features/dashboard/components/card-header-wrapper";
import { Icon, PencilLine, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { useAddSkillInJob, useRemoveSkillInJob } from "../api/mutation";
import { SearchAddDialog, SearchItem } from "@/features/dashboard/components/search-dialog";
import { Button } from "@/components/ui/button";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useGetJobIdSkill } from "../../[jobId]/api/query";
import { QUERY } from "@/constants/tanstank.constants";
import { useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "@/types/api";
import { JobSkillResponse } from "../../[jobId]/api/types";

type Skill = {
    value: number;
    label: string;
};

const ALL_SKILLS = [
    { value: 1, label: "JavaScript" },
    { value: 2, label: "TypeScript" },
    { value: 3, label: "Java" },
    { value: 4, label: "C++" },
    { value: 5, label: "C#" },
    { value: 6, label: "C" },
    { value: 7, label: "HTML" },
    { value: 8, label: "CSS" },
    { value: 9, label: "Python" },
    { value: 10, label: "ReactJs" },
    { value: 11, label: "NodeJs" },
    { value: 12, label: "ExpressJs" },
    { value: 13, label: "NextJs" },
];

const ALL = [];

export default function JobSkills() {
    // 1. STATE: Track the search text
    const [searchQuery, setSearchQuery] = useState("");
    const [currentSkill, setCurrentSkill] = useState<SearchItem[]>([]);

    const jobIdInSession = sessionStorage.getItem("jobId");

    //Mutation
    const { mutate: addSkillInCreate } = useAddSkillInJob();
    const { mutate: removeSkillInCreate } = useRemoveSkillInJob();

    const filteredSkills = ALL_SKILLS.filter((skill) => skill.label.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    const handleAddSkill = (item: any) => {
        addSkillInCreate(
            { jobId: Number(jobIdInSession), skillId: item.value },
            {
                onSuccess(data, variables, onMutateResult, context) {
                    setCurrentSkill((prev) => [...prev, item]);
                },
            },
        );
    };

    const handleRemoveSkill = (item: any) => {
        removeSkillInCreate(
            { jobId: Number(jobIdInSession), skillId: item },
            {
                onSuccess(data, variables, onMutateResult, context) {
                    setCurrentSkill((prev) => prev.filter((skill) => skill.value !== item));
                },
            },
        );
    };

    return (
        <form className="flex flex-col gap-6 w-full max-w-3xl">
            <CardHeaderWrapper
                title="Skills"
                isButton={false}
                lucidIcon={Plus}
                buttonLabel={"Add"}
                searchDialogAction={
                    <>
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
                            searchResults={filteredSkills}
                            onSearchChange={handleSearchChange}
                            onItemSelect={handleAddSkill}
                        />
                    </>
                }
            >
                <div className="flex gap-2 flex-wrap">
                    {currentSkill.map((skill) => (
                        <Badge
                            onClick={() => handleRemoveSkill(skill.value)}
                            key={skill.value}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm group cursor-pointer"
                        >
                            {skill.label}
                            <X className="ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Badge>
                    ))}
                </div>
            </CardHeaderWrapper>
        </form>
    );
}

export function JobSkillsEdit() {
    const [searchQuery, setSearchQuery] = useState("");

    const queryClient = useQueryClient();
    const pathname = usePathname();
    const params = useParams();
    const jobIdInParams = params.jobId;
    const isCreatePath = pathname === "/dashboard/recruiter/jobpost/create";
    const isEditPath = pathname.startsWith("/dashboard/recruiter/jobpost/") && pathname.endsWith("/edit");

    const { data: jobSkillData } = useGetJobIdSkill(Number(jobIdInParams));

    //Mutation
    const { mutate: addSkillInEdit } = useAddSkillInJob({
        onMutate: async (variables, context) => {
            const queryKey = [QUERY.JOBSKILL.getJobIdSkill, variables.jobId];

            await queryClient.cancelQueries({ queryKey: queryKey });

            const previousJobskill = queryClient.getQueryData<ApiResponse<JobSkillResponse[]>>(queryKey);

            queryClient.setQueryData<ApiResponse<JobSkillResponse[]>>(queryKey, (oldData) => {
                if (!oldData || !oldData.data) return oldData;

                const optimisticJobSkill: JobSkillResponse = {
                    id: Math.floor(Math.random() * 1000000),
                    name: variables.name!,
                };

                return {
                    ...oldData,
                    data: [...(oldData.data || []), optimisticJobSkill],
                };
            });

            return { previousEvent: previousJobskill };
        },
        onError(error, variables, onMutateResult, context) {
            // if (context?.previousEvent) {
            //     queryClient.setQueryData([QUERY.JOBSKILL.getJobIdSkill], context.previousEvent);
            // }
            const queryKey = [QUERY.JOBSKILL.getJobIdSkill, variables.jobId];
            const previousJobskill = queryClient.getQueryData<ApiResponse<JobSkillResponse[]>>(queryKey);
            queryClient.setQueryData([queryKey], previousJobskill);
        },
        onSettled(data, error, variables, onMutateResult, context) {
            const queryKey = [QUERY.JOBSKILL.getJobIdSkill, variables.jobId];
            queryClient.invalidateQueries({ queryKey: queryKey });
        },
    });

    
    const { mutate: removeSkillInEdit } = useRemoveSkillInJob({
        onMutate: async (variables, context) => {
            const queryKey = [QUERY.JOBSKILL.getJobIdSkill, variables.jobId];

            await queryClient.cancelQueries({ queryKey: queryKey });

            const previousJobskill = queryClient.getQueryData<ApiResponse<JobSkillResponse[]>>(queryKey);

            queryClient.setQueryData<ApiResponse<JobSkillResponse[]>>(queryKey, (oldData) => {
                if (!oldData || !oldData.data) return oldData;

                return {
                    ...oldData,
                    data: oldData.data.filter((item) => item.id !== variables.skillId),
                };
            });

            return previousJobskill;
        },
        onError(error, variables, onMutateResult, context) {
            const queryKey = [QUERY.JOBSKILL.getJobIdSkill, variables.jobId];
            const previousJobskill = queryClient.getQueryData<ApiResponse<JobSkillResponse[]>>(queryKey);
            queryClient.setQueryData([queryKey], previousJobskill);
        },
        onSettled(data, error, variables, onMutateResult, context) {
            const queryKey = [QUERY.JOBSKILL.getJobIdSkill, variables.jobId];
            queryClient.invalidateQueries({ queryKey: queryKey });
        },
    });

    const filteredSkills = ALL_SKILLS.filter((skill) => skill.label.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    const handleAddSkill = (item: any) => {
        addSkillInEdit({ jobId: Number(jobIdInParams), skillId: item.value, name: item.label });
    };

    const handleRemoveSkill = (skillId: number) => {
        removeSkillInEdit({ jobId: Number(jobIdInParams), skillId });
    };

    return (
        <form className="flex flex-col gap-6 w-full max-w-3xl">
            <CardHeaderWrapper
                title="Skills"
                isButton={false}
                lucidIcon={Plus}
                buttonLabel={"Add"}
                searchDialogAction={
                    <>
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
                            searchResults={filteredSkills}
                            onSearchChange={handleSearchChange}
                            onItemSelect={handleAddSkill}
                        />
                    </>
                }
            >
                <div className="flex gap-2 flex-wrap">
                    {jobSkillData?.data?.map((skill) => (
                        <Badge
                            onClick={() => handleRemoveSkill(skill.id)}
                            key={skill.id}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm group cursor-pointer"
                        >
                            {skill.name}
                            <X className="ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Badge>
                    ))}
                </div>
            </CardHeaderWrapper>
        </form>
    );
}
