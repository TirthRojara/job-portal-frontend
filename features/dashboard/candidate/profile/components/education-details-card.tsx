"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import EducationDetailsAdd from "./education-details-add";
import { useAppSelector } from "@/store/index.store";
import { CandidateEducationResponse } from "../api/types";
import { useGetUserData } from "@/features/dashboard/api/query";
import { useDeleteEducation } from "../api/mutation";

export function EducationItem({ candidateEducation }: { candidateEducation: CandidateEducationResponse }) {
    const role = useAppSelector((state) => state.app.role);

    const { mutate: deleteMutate } = useDeleteEducation();

    const handleDelete = () => {
        deleteMutate({
            candidateEducationId: candidateEducation.id,
        });
    };

    return (
        <div className="group relative flex w-full items-start justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
            <div className="space-y-1">
                <h3 className="font-semibold leading-none tracking-tight">{candidateEducation.major}</h3>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{candidateEducation.education.name}</p>
                <p className="text-sm text-muted-foreground">{candidateEducation.degree}</p>
                <p className="text-sm text-muted-foreground">
                    {candidateEducation.yearStart + " - " + candidateEducation.yearEnd}
                </p>
            </div>

            {role === "CANDIDATE" && (
                <div className="flex items-center gap-2">
                    <EducationDetailsAdd
                        initialData={candidateEducation}
                        isEdit={true}
                        trigger={
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                            </Button>
                        }
                    />

                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-7 w-7 p-0"
                        onClick={handleDelete}
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                    </Button>
                </div>
            )}
        </div>
    );
}
