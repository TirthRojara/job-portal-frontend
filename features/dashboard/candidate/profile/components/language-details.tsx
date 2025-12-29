"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

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

// const languages = [
//     { id: "1", name: "English", level: "Native" },
//     { id: "2", name: "Spanish", level: "Beginner" },
//     { id: "3", name: "Gujarati", level: "Intermediate" },
// ];

type LanguageLevel = "Native" | "Intermediate" | "Beginner";

type Language = {
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

export default function LanguageDetails({languages}: LanguagesTableProps) {
    return (
        <Card className="max-w-4xl w-full py-4">
            <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                <CardTitle className=" md:text-lg">Languages</CardTitle>
                <div className="flex gap-2">
                    <Button variant={"outline"}>
                        <Plus />
                        Add
                    </Button>
                </div>
            </CardHeader>
            <CardContent className=" px-4">
                {/* <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
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
                            {languages.map((language) => (
                                <TableRow
                                    key={language.id}
                                    className="border-b last:border-b-0 hover:bg-accent/50"
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
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-7 w-7 p-0"
                                                // onClick={() => onEdit(language)}
                                            >
                                                <Edit className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                // onClick={() =>
                                                // onDelete(language.id)
                                                // }
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
                    <div className="text-center py-12 text-muted-foreground">
                        No languages added yet. Click "Add Language" to get
                        started.
                    </div>
                )} */}

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
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-7 w-7 p-0"
                                                //   onClick={() => onEdit(language)}
                                            >
                                                <Edit className="h-3 w-3" />
                                            </Button>
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
                        No languages added yet. Click "Add Language" to get
                        started.
                    </div>
                )}
            </CardContent>
        </Card>
        // <div className="space-y-4">
        //     <div className="flex items-center justify-between">
        //         <h3 className="text-lg font-semibold">Languages</h3>
        //         <Dialog>
        //             <DialogTrigger asChild>
        //                 <Button
        //                     variant="outline"
        //                     size="sm"
        //                     className="ml-auto h-8 gap-1"
        //                 >
        //                     <Plus className="h-4 w-4" />
        //                     Add Language
        //                 </Button>
        //             </DialogTrigger>
        //             <DialogContent className="sm:max-w-md">
        //                 {/* Add Language Form Here */}
        //                 <Button>Save Language</Button>
        //             </DialogContent>
        //         </Dialog>
        //     </div>

        // </div>
    );
}
