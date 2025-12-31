import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";
import EducationDetailsAdd from "./education-details-add";
import { EducationItem } from "./education-details-card";

const edu = {
    id: "1",
    degree: "Bachelor of Science in Computer Science",
    institution: "Stanford University",
    year: "2008 - 2012",
};

export default function EducationDetails() {
    return (
        <Card className="max-w-4xl w-full py-4">
            <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                <CardTitle className=" md:text-lg">Education</CardTitle>
                <div className="flex gap-2">
                    <EducationDetailsAdd
                        trigger={
                            <Button variant={"outline"}>
                                <Plus />
                                Add Education
                            </Button>
                        }
                    />
                    {/* <Button variant={"outline"}>
                        <Plus />
                        Add Education
                    </Button> */}
                </div>
            </CardHeader>
            <CardContent className=" px-4 flex flex-col gap-4">
                <EducationItem
                    key={edu.id}
                    id={edu.id}
                    degree={edu.degree}
                    institution={edu.institution}
                    year={edu.year}
                    // onEdit={handleEdit}
                    // onDelete={handleDelete}
                />
                <EducationItem
                    key={2}
                    id={edu.id}
                    degree={edu.degree}
                    institution={edu.institution}
                    year={edu.year}
                    // onEdit={handleEdit}
                    // onDelete={handleDelete}
                />
                

                {/* {true && (
                    <div className="text-center py-12 text-muted-foreground rounded-md border-2 border-dashed border-border">
                        No Education added yet. Click "Add" to get started.
                    </div>
                )} */}
            </CardContent>
        </Card>
    );
}
