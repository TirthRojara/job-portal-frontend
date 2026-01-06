import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";
import WorkExperienceAdd from "./work-experience-add";
import WorkExperienceCard from "./work-experience-card";

const role = "CANDIDATE";

const expe = {
    id: 5,
    companyName: "Google",
    department: "Backend",
    startDate: "2025-04-10T00:00:00.000Z",
    endDate: null,
    position: "FullStack Developer - SDE1",
    description: "Working with backend team",
    currentlyWorking: true,
    workPlace: "REMOTE",
    location: "Banglore",
    candidateProfileId: 20,
};

export default function WorkExperience() {
    return (
        <Card className="max-w-4xl w-full py-4">
            <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                <CardTitle className=" md:text-lg">Work Experience</CardTitle>
                <div className="flex gap-2">
                    {role === "CANDIDATE" && (
                        <WorkExperienceAdd
                            trigger={
                                <Button variant={"outline"}>
                                    <Plus />
                                    Add Experience
                                </Button>
                            }
                        />
                    )}
                </div>
            </CardHeader>
            <CardContent className=" px-4 flex flex-col gap-4">
                <WorkExperienceCard experience={expe} />
                <WorkExperienceCard experience={expe} />

                {/* {true && (
                    <div className="text-center py-12 text-muted-foreground rounded-md border-2 border-dashed border-border">
                        No Work Experience added yet. Click "Add" to get
                        started.
                    </div>
                )} */}
            </CardContent>
        </Card>
    );
}
