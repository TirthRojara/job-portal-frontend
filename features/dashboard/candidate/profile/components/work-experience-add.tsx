"use client";
import {
    FormDate,
    FormDisplay,
    FormInput,
    FormSelect,
    FormSwitch,
    FormTextarea,
} from "@/components/custom-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, PenLine } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const University = [
    { label: "Oxford", value: "ox" },
    { label: "Boston", value: "bs" },
    { label: "IIT", value: "iit" },
    { label: "Taxes", value: "Taxes" },
    { label: "Standford", value: "Standford" },
    { label: "howford", value: "howford" },
    { label: "Yaml", value: "Yaml" },
    { label: "MIT", value: "MIT" },
    { label: "MIT2", value: "MIT2" },
    { label: "MIT3", value: "MIT3" },
    { label: "MIT4", value: "MIT4" },
    { label: "MIT5", value: "MIT5" },
    { label: "MIT6", value: "MIT6" },
];

const PersonalDetailSchema = z.object({
    companyName: z.string({ error: "Required" }).min(1, "Required"),
    department: z.string({ error: "Required" }).min(1, "Required"),
    position: z.string({ error: "Required" }).min(1, "Required"),
    description: z.string({ error: "Required" }).min(1, "Required"),
    workPlace: z.enum(["ONSITE", "REMOTE", "HYBRID"], {
        error: "Please select degree",
    }),
    startDate: z.date({ error: "Please select date" }),
    endDate: z.date({ error: "Please select date" }).optional(),
    currentlyWorking: z.boolean(),
    location: z.string({ error: "Required" }).min(1, "Required"),
});

type PersonalDetails = z.infer<typeof PersonalDetailSchema>;

interface EducationDetailsEditProps {
    trigger: React.ReactNode;
}

export default function WorkExperienceAdd({
    trigger,
}: EducationDetailsEditProps) {
    const form = useForm<PersonalDetails>({
        resolver: zodResolver(PersonalDetailSchema),
        defaultValues: {},
        mode: "onChange",
        reValidateMode: "onChange",
    });

    function onSubmit(data: any) {
        console.log({ data });
        // console.log(data.fullname);
        // console.log(data.email);

        // form.reset();
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                <DialogContent
                    showCloseButton={true}
                    className="w-full md:min-w-3xl md:h-fit h-[90vh]"
                >
                    <div className="h-full overflow-auto p-3">
                        <Card className="max-w-4xl w-full border-none shadow-none">
                            <DialogHeader>
                                <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                                    <DialogTitle>
                                        <CardTitle className=" md:text-lg">
                                            Work Experience
                                        </CardTitle>
                                    </DialogTitle>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={form.handleSubmit(
                                                onSubmit
                                            )}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </CardHeader>
                            </DialogHeader>
                            <CardContent className=" px-4">
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4 "
                                    // className=" space-y-6"
                                >
                                    <FormInput
                                        control={form.control}
                                        name="companyName"
                                        label="Company"
                                        form={form}
                                        placeholder=""
                                        required
                                        errorReserve
                                    />

                                    <FormInput
                                        control={form.control}
                                        name="department"
                                        label="Department"
                                        form={form}
                                        placeholder=""
                                        required
                                        errorReserve
                                    />

                                    <FormInput
                                        control={form.control}
                                        name="position"
                                        label="Position"
                                        form={form}
                                        placeholder=""
                                        required
                                        errorReserve
                                    />

                                    <FormTextarea
                                        control={form.control}
                                        name="description"
                                        label="Description"
                                        form={form}
                                        required
                                        errorReserve
                                    />

                                    <FormInput
                                        control={form.control}
                                        name="location"
                                        label="Location"
                                        form={form}
                                        placeholder=""
                                        required
                                        errorReserve
                                    />

                                    <FormSelect
                                        control={form.control}
                                        name="workPlace"
                                        label="WorkPlace"
                                        placeholder="Select workplace"
                                        errorReserve
                                    >
                                        <SelectItem key="ONSITE" value="ONSITE">
                                            ONSITE
                                        </SelectItem>
                                        <SelectItem key="REMOTE" value="REMOTE">
                                            REMOTE
                                        </SelectItem>
                                        <SelectItem key="HYBRID" value="HYBRID">
                                            HYBRID
                                        </SelectItem>
                                    </FormSelect>

                                    <FormDate
                                        form={form}
                                        control={form.control}
                                        name="startDate"
                                        label="Start Date"
                                        errorReserve
                                    />
                                    <FormDate
                                        form={form}
                                        control={form.control}
                                        name="endDate"
                                        label="End Date"
                                        placeholder="Empty if working"
                                        errorReserve
                                    />

                                    <FormSwitch
                                        form={form}
                                        control={form.control}
                                        name="currentlyWorking"
                                        label="Currently Working"
                                        errorReserve
                                    />
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
