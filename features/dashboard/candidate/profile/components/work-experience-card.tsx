import React from "react";
import WorkExperienceAdd from "./work-experience-add";
import { Button } from "@/components/ui/button";
import { Dot, MapPin, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Experience {
    id: number;
    companyName: string;
    department: string;
    position: string;
    description: string;
    workPlace: string;
    startDate: Date | string;
    endDate: Date | null;
    currentlyWorking: boolean;
    location: string;
}

interface WorkExperienceCardProps {
    experience: Experience;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export default function WorkExperienceCard({
    experience,
}: WorkExperienceCardProps) {
    return (
        <div className="group relative flex w-full items-start justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
            <div className="space-y-1">
                <h3 className="font-semibold leading-none tracking-tight">
                    {experience.position}
                </h3>
                <p className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                    {experience.companyName} <Dot /> {experience.department}
                </p>
                <div className="flex gap-2 sm:gap-3 flex-col sm:flex-row">
                    <p className="text-sm text-muted-foreground">
                        2020 - Present
                    </p>
                    <p className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />{" "}
                        {experience.location}{" "}
                    </p>
                    <Badge>Current</Badge>
                </div>
                <div className="mt-5">
                    <p className="text-muted-foreground">
                        Developed and maintained web applications using MERN
                        stack. Collaborated with design team to implement
                        responsive user interfaces.
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <WorkExperienceAdd
                    trigger={
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-foreground"
                            // onClick={() => onEdit?.(id)}
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
                    // onClick={() => onDelete?.(id)}
                >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                </Button>
            </div>
        </div>
    );
}
