import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon, Plus } from "lucide-react";
import React, { Children, ReactNode, useState } from "react";
import { SearchAddDialog, SearchItem } from "./search-dialog";

interface CardHeaderWrapperProps {
    title?: string;
    buttonLabel?: string;
    lucidIcon?: LucideIcon;
    children?: ReactNode;
    searchDialog?: Boolean;
}

const hidden = false;

const ALL_SKILLS = [
    { value: "react", label: "React" },
    { value: "java", label: "Java" },
    { value: "javascript", label: "JavaScript" },
    { value: "css", label: "CSS" },
    { value: "python", label: "Python" },
];

export default function CardHeaderWrapper({
    title,
    buttonLabel,
    lucidIcon: Icon = Plus,
    children,
    searchDialog = false,
}: CardHeaderWrapperProps) {
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
        <Card className="max-w-3xl w-full py-4">
            <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                <CardTitle className=" md:text-lg">{title}</CardTitle>

                {searchDialog ? (
                    <SearchAddDialog
                        title={title!}
                        inputLabel={title!}
                        placeholder="e.g. HTML"
                        description=" "
                        trigger={
                            <Button variant={"outline"}>
                                 <Icon className="" /> <p>{buttonLabel}</p>
                            </Button>
                        }
                        searchResults={skillResults}
                        onSearchChange={handleSkillSearch}
                        onItemSelect={handleAddSkill}
                        
                    />
                ) : (
                    <Button
                        variant={"outline"}
                        className={` ${hidden ? "hidden" : "block"}`}
                    >
                        <div className="flex gap-2">
                            <Icon className="" /> <p>{buttonLabel}</p>
                        </div>
                    </Button>
                )}
            </CardHeader>
            <CardContent className=" px-4">{children}</CardContent>
        </Card>
    );
}
