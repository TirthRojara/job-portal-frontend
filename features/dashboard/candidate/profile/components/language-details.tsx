"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import { EditLanguageDialog } from "../edit/components/language-details-edit";
import {
    SearchAddDialog,
    SearchItem,
} from "@/features/dashboard/components/search-dialog";

// Mock Data for demonstration
const ALL_SKILLS = [
    { value: "react", label: "React" },
    { value: "java", label: "Java" },
    { value: "javascript", label: "JavaScript" },
    { value: "css", label: "CSS" },
    { value: "python", label: "Python" },
];

const ALL_LANGUAGES = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "hi", label: "Hindi" },
];

const lang = {
    name: "Englist",
    level: "Basic",
};

type LanguageLevel = "Native" | "Intermediate" | "Beginner";

export type Language = {
    id: string;
    name: string;
    level: LanguageLevel | string;
};

type LanguagesTableProps = {
    languages: Language[];
    // onEdit: (language: Language) => void;
    // onDelete: (id: string) => void;
    // onAdd: () => void;
};

export default function LanguageDetails({ languages }: LanguagesTableProps) {
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

    const [langResults, setLangResults] = useState<SearchItem[]>(ALL_LANGUAGES);

    // Function 3: Handle Language Search (Different logic!)
    const handleLangSearch = (query: string) => {
        // const filtered = ALL_LANGUAGES.filter((l) =>
        //     l.label.toLowerCase().includes(query.toLowerCase())
        // );
        // setLangResults(filtered);
        console.log('handle lang')
    };

    // Function 4: Handle Language Selection
    const handleAddLanguage = (item: SearchItem) => {
        console.log("Saving Language to DB:", item);
    };

    return (
        <Card className="max-w-4xl w-full py-4">
            <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                <CardTitle className=" md:text-lg">Languages</CardTitle>
                <div className="flex gap-2">
                    <SearchAddDialog
                        title="Languages"
                        inputLabel="Add language"
                        placeholder="e.g. English"
                        description=''
                        trigger={
                            <Button variant="outline">
                                <Plus className="w-4 h-4 mr-2" /> Add Language
                            </Button>
                        }
                        searchResults={langResults}
                        onSearchChange={handleLangSearch}
                        onItemSelect={handleAddLanguage}
                    />
                    {/* <Button variant={"outline"}>
                        <Plus />
                        Add
                    </Button> */}
                </div>
            </CardHeader>
            <CardContent className=" px-4">
                <div className="overflow-hidden rounded-md bg-background ">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-b-2 border-border">
                                {/* Thicker header separator */}
                                <TableHead className="w-[200px] sm:w-[250px]">
                                    Language
                                </TableHead>
                                <TableHead className="w-[150px] sm:w-[200px]">
                                    Level
                                </TableHead>
                                <TableHead className="text-right sm:w-[100px]">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {languages.map((language, index) => (
                                <TableRow
                                    key={language.id}
                                    className="border-b border-border/50 last:border-b-0 hover:bg-accent/50"
                                >
                                    <TableCell className="font-medium">
                                        {language.name}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                language.level === "Native"
                                                    ? "default"
                                                    : language.level ===
                                                      "Intermediate"
                                                    ? "secondary"
                                                    : "outline"
                                            }
                                            className={
                                                language.level === "Native"
                                                    ? "bg-blue-100 text-blue-800 border-blue-200"
                                                    : language.level ===
                                                      "Intermediate"
                                                    ? "bg-blue-50 text-blue-700 border-blue-100"
                                                    : "bg-blue-50/50 text-blue-600 border-blue-100/50"
                                            }
                                        >
                                            {language.level}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex gap-1 justify-end">
                                            <EditLanguageDialog
                                                languageData={lang}
                                            />
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                //   onClick={() => onDelete(language.id)}
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {languages.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground rounded-md border-2 border-dashed border-border">
                        No languages added yet. Click "Add" to get started.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
