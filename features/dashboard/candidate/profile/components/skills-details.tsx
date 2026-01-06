"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    SearchAddDialog,
    SearchItem,
} from "@/features/dashboard/components/search-dialog";
import { Cross, Plus, X } from "lucide-react";
import React, { useState } from "react";

const role = "CANDIDATE";

const ALL_SKILLS = [
    { value: "react", label: "React" },
    { value: "java", label: "Java" },
    { value: "javascript", label: "JavaScript" },
    { value: "css", label: "CSS" },
    { value: "python", label: "Python" },
];

export default function SkillsDetails() {
    const [skillResults, setSkillResults] = useState<SearchItem[]>(ALL_SKILLS);

    // Function 1: Handle Skill Search
    const handleSkillSearch = (query: string) => {
        // In a real app, this would be an API call
        const filtered = ALL_SKILLS.filter((s) =>
            s.label.toLowerCase().includes(query.toLowerCase())
        );
        setSkillResults(filtered);
    };

    // Function 2: Handle Skill Selection
    const handleAddSkill = () => {
        console.log("Saving Skill to DB:");
    };

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
                    {ALL_SKILLS.map((skill) => (
                        <Badge
                            key={skill.value}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm group cursor-pointer"
                        >
                            {skill.label}
                            <X className="ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Badge>
                    ))}
                </div>

                {/* {true && (
                    <div className="text-center py-12 text-muted-foreground rounded-md border-2 border-dashed border-border">
                        No skill added yet. Click "Add Skills" to get started.
                    </div>
                )} */}
            </CardContent>
        </Card>
    );
}
