import { FormDisplay } from "@/components/custom-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { PenLine } from "lucide-react";
import React from "react";
import PersonalDetailsEdit from "../edit/components/personal-details-edit";
import { useAppSelector } from "@/store/index.store";
import { CreateProfileResponse } from "../api/types";
import { formatShortDate } from "@/lib/utils/utils";

// const role = "CANDIDATE";

export default function ProfileDetails({ profileData }: { profileData: CreateProfileResponse }) {
    const role = useAppSelector((state) => state.app.role);

    return (
        <Card className="max-w-4xl w-full py-4">
            <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                <CardTitle className=" md:text-lg">Personal Details</CardTitle>
                {role === "CANDIDATE" && (
                    <div className="flex gap-2">
                        <PersonalDetailsEdit profileData={profileData} />
                    </div>
                )}
            </CardHeader>
            <CardContent className=" px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    <FormDisplay label="Full Name" value={profileData.fullName} />
                    {/* <FormDisplay label="Email" value="test@gmail.com" /> */}
                    {/* <FormDisplay label="Role" value="AI Full Stack developer" /> */}
                    <FormDisplay label="Gender" value={profileData.gender} />
                    <FormDisplay label="Phone" value={profileData.phone} />
                    <FormDisplay label="Date of Birth" value={formatShortDate(profileData.birthDate)} />
                    <FormDisplay label="Address" value={profileData.address} />
                    <Field>
                        <FieldLabel>Work Status</FieldLabel>
                        <FieldDescription className={profileData.openToWork ? "pl-1" : "pl-2"}>
                            {profileData.openToWork ? <Badge>Open to Work</Badge> : "-"}
                        </FieldDescription>
                    </Field>
                </div>
            </CardContent>
        </Card>
    );
}
