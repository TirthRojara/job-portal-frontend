"use client";
import { FormSelect } from "@/components/custom-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const PersonalDetailSchema = z.object({
    // title: z.string().min(1, "Required"),
    status: z.enum(["INTOUCH", "REJECTED", "SELECTED"], {
        error: "Please select degree",
    }),
});

type PersonalDetails = z.infer<typeof PersonalDetailSchema>;

export default function ApplicationStatusCard() {
    const form = useForm<PersonalDetails>({
        resolver: zodResolver(PersonalDetailSchema),
        defaultValues: {status: "INTOUCH"},
        mode: "onChange",
        reValidateMode: "onChange",
    });

    function onSubmit(data: any) {
        console.log({ data });
    }

    return (
        <Card className="w-full ">
            <CardHeader>
                <CardTitle>Application Status</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                        <p>Applied for:</p>
                        <p className="font-semibold">Ai Full Stack Developer</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Applied on:</p>
                        <p className="font-semibold">15-03-2026</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Current Status:</p>
                        <Badge>Selected</Badge>
                    </div>
                </div>
                <Separator />
                <div>
                    <form className="flex flex-col gap-4">
                        <FormSelect
                            control={form.control}
                            name="status"
                            label="Update Status"
                            placeholder="Select"
                            errorReserve
                        >
                            <SelectItem key="INTOUCH" value="INTOUCH">
                                In-Touch
                            </SelectItem>
                            <SelectItem key="REJECTED" value="REJECTED">
                                Rejected
                            </SelectItem>
                            <SelectItem key="SELECTED" value="SELECTED">
                                Selected
                            </SelectItem>
                        </FormSelect>

                        {form.formState.isDirty && <Button>Save</Button>}
                    </form>
                </div>
            </CardContent>
        </Card>
    );
}
