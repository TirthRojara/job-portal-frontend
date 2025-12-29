import { FormDisplay } from "@/components/custom-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { PenLine } from "lucide-react";
import React from "react";
import PersonalDetailsEdit from "../edit/components/personal-details-edit";

export default function ProfileDetails() {
    return (
        <Card className="max-w-4xl w-full py-4">
            <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                <CardTitle className=" md:text-lg">Personal Details</CardTitle>
                <div className="flex gap-2">
                    {/* <Button>
                        <PenLine /> Edit
                    </Button> */}
                    <PersonalDetailsEdit />

                    {/* <Button variant={"outline"}>Cancel</Button> */}
                </div>
            </CardHeader>
            <CardContent className=" px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    <FormDisplay label="Full Name" value="Tirth Rojara" />
                    <FormDisplay label="Email" value="test@gmail.com" />
                    <FormDisplay label="Gender" value="MALE" />
                    <FormDisplay label="Phone" value="1234567890" />
                    <FormDisplay label="Date of Birth" value="07/04/2025" />
                    <FormDisplay
                        label="Address"
                        value="Rajkot, Gujarat, India"
                    />
                    <Field>
                        <FieldLabel>Work Status</FieldLabel>
                        <FieldDescription className={true ? "pl-1" : "pl-2"}>
                            <Badge>Open to Work</Badge>
                            {/* - */}
                        </FieldDescription>
                    </Field>
                </div>
            </CardContent>
        </Card>
    );
}
