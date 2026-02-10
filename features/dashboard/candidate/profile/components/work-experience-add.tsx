"use client";
import { FormDate, FormDisplay, FormInput, FormInputGroup, FormSelect, FormSwitch, FormTextarea } from "@/components/custom-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, PenLine } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import {
    CandidateExperiencePayload,
    CandidateExperienceResponse,
    CreateExperienceForm,
    CreateExperienceSchema,
    EditExperienceForm,
    EditExperienceSchema,
} from "../api/types";
import { YYYYMMDD } from "@/lib/utils/utils";
import { WorkPlace } from "@/features/dashboard/recruiter/jobpost/api/types";
import { useCreateExperience, useEditExperience } from "../api/mutation";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

interface EducationDetailsEditProps {
    isEdit: boolean;
    trigger: React.ReactNode;
    initialData?: CandidateExperienceResponse;
}

export default function WorkExperienceAdd({ isEdit, trigger, initialData }: EducationDetailsEditProps) {
    const [open, setOpen] = useState(false);

    const { mutate: createMutate, isPending: isCreatePending, isSuccess: isCreateSuccess } = useCreateExperience();
    const { mutate: editMutate, isPending: isEditPending, isSuccess: isEditSuccess } = useEditExperience();

    const schema = isEdit ? EditExperienceSchema : CreateExperienceSchema;

    const baseDefaults = {
        companyName: "",
        department: "",
        position: "",
        description: "",
        workPlace: undefined,
        startDate: undefined,
        currentlyWorking: false,
        location: "",
        endDate: undefined,
    };

    const form = useForm<CreateExperienceForm | EditExperienceForm>({
        resolver: zodResolver(schema),
        defaultValues: baseDefaults,
        mode: "onChange",
        reValidateMode: "onChange",
    });

    const { isDirty, dirtyFields } = form.formState;


    useEffect(() => {
        if (isEdit && initialData) {
            form.reset({
                companyName: initialData.companyName ?? "",
                department: initialData.department ?? "",
                position: initialData.position ?? "",
                description: initialData.description ?? "",
                workPlace: initialData.workPlace,
                startDate: initialData.startDate ? new Date(initialData.startDate) : undefined,
                endDate: initialData.endDate ? new Date(initialData.endDate) : undefined,
                currentlyWorking: initialData.currentlyWorking ?? false,
                location: initialData.location ?? "",
            });
        } else {
            form.reset(baseDefaults);
        }
    }, [isEdit, initialData]);

    useEffect(() => {
        if (isEditSuccess || isCreateSuccess) {
            setOpen(false);
        }
    }, [isEditSuccess, isCreateSuccess]);

    function onSubmit(data: CreateExperienceForm | EditExperienceForm) {
        console.log({ data });

        if (!isEdit) {
            const modify = { ...data } as CreateExperienceForm;

            const payload: CandidateExperiencePayload = {
             
                companyName: modify.companyName,
                department: modify.department,
                position: modify.position,
                description: modify.description,
                workPlace: modify.workPlace,
                location: modify.location,
                currentlyWorking: modify.currentlyWorking,
                startDate: YYYYMMDD(modify.startDate.toString()),
                endDate: modify.currentlyWorking ? undefined : modify.endDate ? YYYYMMDD(modify.endDate.toString()) : undefined,
            };

            console.log("create payload", payload);

            createMutate({
                payload,
            });

      
        }

        if (isEdit) {
            if (Object.keys(dirtyFields).length === 0) {
                console.log("No changes detected");
                return;
            }

            if (dirtyFields.currentlyWorking && data.currentlyWorking === false && !data.endDate) {
                toast.info("End date is required if not currently working");
                return;
            }

            const payload: Partial<CandidateExperiencePayload> = {};

            if (dirtyFields.companyName) payload.companyName = data.companyName;
            if (dirtyFields.department) payload.department = data.department;
            if (dirtyFields.position) payload.position = data.position;
            if (dirtyFields.description) payload.description = data.description;
            if (dirtyFields.location) payload.location = data.location;
            if (dirtyFields.workPlace) payload.workPlace = data.workPlace;

            if (dirtyFields.currentlyWorking) payload.currentlyWorking = data.currentlyWorking;

            if (dirtyFields.startDate && data.startDate) payload.startDate = YYYYMMDD(data.startDate.toString());

            if (dirtyFields.endDate && data.endDate) payload.endDate = YYYYMMDD(data.endDate.toString());

            if (dirtyFields.currentlyWorking && data.currentlyWorking === true) payload.endDate = undefined;

            console.log("edit payload", payload);

            editMutate({
                candidateExperienceId: initialData?.id!,
                payload,
            });
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                <DialogContent
                    aria-describedby={undefined}
                    showCloseButton={true}
                    className="w-full md:min-w-3xl md:h-fit h-[90vh]"
                >
                    <div className="h-full overflow-auto p-3">
                        <Card className="max-w-4xl w-full border-none shadow-none">
                            <DialogHeader>
                                <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                                    <DialogTitle>
                                        <CardTitle className=" md:text-lg">Work Experience</CardTitle>
                                    </DialogTitle>
                                    <div className="flex gap-2">
                                        <Button onClick={form.handleSubmit(onSubmit)}>
                                            {isCreatePending || isEditPending ? <Spinner /> : "Save"}
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
