"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import { EditLanguageDialog } from "../edit/components/language-details-edit";
import { SearchAddDialog, SearchItem } from "@/features/dashboard/components/search-dialog";
import { useGetCandidateLanguage } from "../api/query";
import { useCreateLanguage, useDeleteLanguage } from "../api/mutation";
import { Level } from "../api/types";

const role = "CANDIDATE";

const ALL_LANGUAGES = [
    { value: "Italian", label: "Italian" },
    { value: "French", label: "French" },
    { value: "Korean", label: "Korean" },
    { value: "Japanese", label: "Japanese" },
    { value: "Spanish", label: "Spanish" },
    { value: "English", label: "English" },
    { value: "Gujarati", label: "Gujarati" },
    { value: "Hindi", label: "Hindi" },
];

// const lang = {
//     name: "Englist",
//     level: "Basic",
// };

type LanguageLevel = "Native" | "Intermediate" | "Beginner";

export type Language = {
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
    const [langResults, setLangResults] = useState<SearchItem[]>(ALL_LANGUAGES);

    const { data: candidateLanguage, isError, isLoading, error } = useGetCandidateLanguage();

    const { mutate: createMutate } = useCreateLanguage();
    const { mutate: deleteMutate, isPending: isDeletePending } = useDeleteLanguage();

    console.log(candidateLanguage);

    // Function 3: Handle Language Search (Different logic!)
    const handleLangSearch = (query: string) => {
        const filtered = ALL_LANGUAGES.filter((l) => l.label.toLowerCase().includes(query.toLowerCase()));
        setLangResults(filtered);
    };

    // Function 4: Handle Language Selection
    const handleAddLanguage = (item: SearchItem) => {
        console.log("Saving Language to DB:", item);

        createMutate({
            payload: { languageName: item.label, level: Level.FLUENT },
        });
    };

    const handleLanguageDelete = (languageName: string) => {
        console.log({ languageName });

        deleteMutate({
            languageName: languageName,
        });
    };

    if (error?.status === 404) {
        return (
            <Card className="max-w-4xl w-full py-4">
                <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                    <CardTitle className=" md:text-lg">Languages</CardTitle>
                    <div className="flex gap-2">
                        {role === "CANDIDATE" && (
                            <SearchAddDialog
                                title="Languages"
                                inputLabel="Add language"
                                placeholder="e.g. English"
                                description=" "
                                trigger={
                                    <Button variant="outline">
                                        <Plus className="w-4 h-4 mr-2" /> Add Language
                                    </Button>
                                }
                                searchResults={langResults}
                                onSearchChange={handleLangSearch}
                                onItemSelect={handleAddLanguage}
                            />
                        )}
                    </div>
                </CardHeader>
                <CardContent className=" px-4">
                    <div className="text-center py-12 text-muted-foreground rounded-md border-2 border-dashed border-border">
                        No languages added yet. Click "Add" to get started.
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="max-w-4xl w-full py-4">
            <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                <CardTitle className=" md:text-lg">Languages</CardTitle>
                <div className="flex gap-2">
                    {role === "CANDIDATE" && (
                        <SearchAddDialog
                            title="Languages"
                            inputLabel="Add language"
                            placeholder="e.g. English"
                            description=" "
                            trigger={
                                <Button variant="outline">
                                    <Plus className="w-4 h-4 mr-2" /> Add Language
                                </Button>
                            }
                            searchResults={langResults}
                            onSearchChange={handleLangSearch}
                            onItemSelect={handleAddLanguage}
                        />
                    )}
                </div>
            </CardHeader>
            <CardContent className=" px-4">
                <div className="overflow-hidden rounded-md bg-background ">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-b-2 border-border">
                                {/* Thicker header separator */}
                                <TableHead className="w-[200px] sm:w-[250px]">Language</TableHead>
                                <TableHead className="w-[150px] sm:w-[200px]">Level</TableHead>
                                {role === "CANDIDATE" && <TableHead className="text-right sm:w-[100px]">Actions</TableHead>}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {candidateLanguage?.data!.map((language, index) => (
                                <TableRow
                                    key={language.languageName}
                                    className="border-b border-border/50 last:border-b-0 hover:bg-accent/50"
                                >
                                    <TableCell className="font-medium">{language.languageName}</TableCell>
                                    <TableCell>
                                        <Badge>{language.level}</Badge>
                                    </TableCell>
                                    {role === "CANDIDATE" && (
                                        <TableCell className="text-right">
                                            <div className="flex gap-1 justify-end">
                                                <EditLanguageDialog languageName={language.languageName} level={language.level} />
                                                <Button
                                                    disabled={isDeletePending}
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleLanguageDelete(language.languageName)}
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* {languages.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground rounded-md border-2 border-dashed border-border">
                        No languages added yet. Click "Add" to get started.
                    </div>
                )} */}
            </CardContent>
        </Card>
    );
}
