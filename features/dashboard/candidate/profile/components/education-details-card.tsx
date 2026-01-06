"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import EducationDetailsAdd from "./education-details-add";

const role = "CANDIDATE";

interface EducationItemProps {
    id: string;
    degree: string;
    institution: string;
    year: string;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export function EducationItem({
    id,
    degree,
    institution,
    year,
    onEdit,
    onDelete,
}: EducationItemProps) {
    return (
        <div className="group relative flex w-full items-start justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
            <div className="space-y-1">
                <h3 className="font-semibold leading-none tracking-tight">
                    {degree}
                </h3>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {institution}
                </p>
                <p className="text-sm text-muted-foreground">MASTERS</p>
                <p className="text-sm text-muted-foreground">{year}</p>
            </div>

            {role === "CANDIDATE" && (
                <div className="flex items-center gap-2">
                    <EducationDetailsAdd
                        trigger={
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                                onClick={() => onEdit?.(id)}
                            >
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                            </Button>
                        }
                    />

                    <Button
                        variant="ghost"
                        size="icon"
                        //   className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-7 w-7 p-0"
                        onClick={() => onDelete?.(id)}
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                    </Button>
                </div>
            )}
        </div>
    );
}
