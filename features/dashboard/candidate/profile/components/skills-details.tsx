"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchAddDialog, SearchItem } from "@/features/dashboard/components/search-dialog";
import { useAppSelector } from "@/store/index.store";
import { Cross, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { useGetCandidateSkill, useGetCandidateSkillById } from "../api/query";
import { useCreateSkill, useDeleteSkill } from "../api/mutation";
import { EmptyState } from "@/components/empty-state";

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

export default function SkillsDetails({ jobId, applicantId }: { jobId?: string; applicantId?: string }) {
    const [skillResults, setSkillResults] = useState(ALL_SKILLS);

    const role = useAppSelector((state) => state.app.role);

    const { data: candidateSkill, error } = useGetCandidateSkill(role);
    const { data: candidateskillForRecruiter, error: recruiterError } = useGetCandidateSkillById(role, jobId!, applicantId!);

    const { mutate: addSkillMutate } = useCreateSkill();
    const { mutate: deleteMutate } = useDeleteSkill();

    const handleSkillSearch = (query: string) => {
        // In a real app, this would be an API call
        const filtered = ALL_SKILLS.filter((s) => s.label.toLowerCase().includes(query.toLowerCase()));
        setSkillResults(filtered);
    };

    const handleAddSkill = (item: any) => {
        addSkillMutate({
            payload: { skillId: item.value },
            skillName: item.label,
        });
    };

    const handleRemoveSkill = (skillId: number) => {
        deleteMutate({
            payload: { skillId },
        });
    };

    if (error?.status === 404 || recruiterError?.status === 404) {
        return (
            <Card className="max-w-4xl w-full py-4">
                <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                    <CardTitle className=" md:text-lg">Skills</CardTitle>
                    <div className="flex gap-2">
                        {role === "CANDIDATE" && (
                            <SearchAddDialog
                                title="Skills"
                                inputLabel="Add skills"
                                placeholder="e.g. HTML"
                                description=" "
                                trigger={
                                    <Button variant={"outline"}>
                                        <Plus /> Add Skill
                                    </Button>
                                }
                                searchResults={skillResults}
                                onSearchChange={handleSkillSearch}
                                onItemSelect={handleAddSkill}
                            />
                        )}
                    </div>
                </CardHeader>
                <CardContent className=" px-4">
                    <div className="text-center py-12 text-muted-foreground rounded-md border-2 border-dashed border-border">
                       {role === 'CANDIDATE' && ` No skill added yet. Click "Add Skills" to get started.`}
                       {role === 'RECRUITER' && ` No skill added.`}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (recruiterError && recruiterError.status !== 404) {
        return <EmptyState title="Something went wrong!" />;
    }

    return (
        <Card className="max-w-4xl w-full py-4">
            <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                <CardTitle className=" md:text-lg">Skills</CardTitle>
                <div className="flex gap-2">
                    {role === "CANDIDATE" && (
                        <SearchAddDialog
                            title="Skills"
                            inputLabel="Add skills"
                            placeholder="e.g. HTML"
                            description=" "
                            trigger={
                                <Button variant={"outline"}>
                                    <Plus /> Add Skill
                                </Button>
                            }
                            searchResults={skillResults}
                            onSearchChange={handleSkillSearch}
                            onItemSelect={handleAddSkill}
                        />
                    )}
                </div>
            </CardHeader>
            <CardContent className=" px-4">
                <div className="flex gap-2 flex-wrap">
                    {candidateSkill?.data!.map((skill) => (
                        <Badge
                            onClick={() => handleRemoveSkill(skill.skill.id)}
                            key={skill.skill.id}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm group cursor-pointer"
                        >
                            {skill.skill.name}
                            <X className="ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Badge>
                    ))}
                    {candidateskillForRecruiter?.data!.map((skill) => (
                        <Badge
                            onClick={() => handleRemoveSkill(skill.skill.id)}
                            key={skill.skill.id}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm group cursor-pointer"
                        >
                            {skill.skill.name}
                            <X className="ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
