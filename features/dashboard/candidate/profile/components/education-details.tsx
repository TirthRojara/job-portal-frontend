import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";
import EducationDetailsAdd from "./education-details-add";
import { EducationItem } from "./education-details-card";
import { useAppSelector } from "@/store/index.store";
import { useGetCandidateEducation } from "../api/query";

export default function EducationDetails() {
    const { data: candidateEducation, isPending, error } = useGetCandidateEducation();

    const role = useAppSelector((state) => state.app.role);

    if (isPending) return <></>;

    if (error?.status === 404) {
        return (
            <Card className="max-w-4xl w-full py-4">
                <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                    <CardTitle className=" md:text-lg">Education</CardTitle>
                    <div className="flex gap-2">
                        {role === "CANDIDATE" && (
                            <EducationDetailsAdd
                                isEdit={false}
                                trigger={
                                    <Button variant={"outline"}>
                                        <Plus />
                                        Add Education
                                    </Button>
                                }
                            />
                        )}
                    </div>
                </CardHeader>
                <CardContent className=" px-4 flex flex-col gap-4">
                    <div className="text-center py-12 text-muted-foreground rounded-md border-2 border-dashed border-border">
                        No Education added yet. Click "Add" to get started.
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="max-w-4xl w-full py-4">
            <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                <CardTitle className=" md:text-lg">Education</CardTitle>
                <div className="flex gap-2">
                    {role === "CANDIDATE" && (
                        <EducationDetailsAdd
                            isEdit={false}
                            trigger={
                                <Button variant={"outline"}>
                                    <Plus />
                                    Add Education
                                </Button>
                            }
                        />
                    )}
                </div>
            </CardHeader>
            <CardContent className=" px-4 flex flex-col gap-4">
                {candidateEducation?.data?.map((item) => (
                    <EducationItem key={item.id} candidateEducation={item} />
                ))}
            </CardContent>
        </Card>
    );
}
