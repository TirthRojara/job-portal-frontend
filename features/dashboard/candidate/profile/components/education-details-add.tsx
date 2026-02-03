"use client";
import { FormDate, FormDisplay, FormInput, FormSelect, FormSwitch, FormTextarea } from "@/components/custom-form";
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
    CandidateEducationPayload,
    CandidateEducationResponse,
    CreateEducationForm,
    CreateEducationSchema,
    Degree,
    EditEducationForm,
    EditEducationSchema,
} from "../api/types";
import { useGetCandidateEducation } from "../api/query";
import { useCreateEducation, useEditEducation } from "../api/mutation";
import { getUserData } from "@/features/dashboard/api/api";
import { useGetUserData } from "@/features/dashboard/api/query";
import { Spinner } from "@/components/ui/spinner";

const University = [
    { label: "Harvard University", value: "1" },
    { label: "Stanford University", value: "2" },
    { label: "California Institute of Technology", value: "3" },
    { label: "IIT Kharagpur", value: "17" },
    { label: "IIT Bombay", value: "18" },
    { label: "IIT Madras", value: "19" },
    { label: "IIT Gandhinagar", value: "20" },
    { label: "Gujarat Technological University (GTU)", value: "21" },
    { label: "Indian Institute of Information Technology Surat (IIIT Surat)", value: "22" },
];

interface EducationDetailsEditProps {
    trigger: React.ReactNode;
    isEdit: boolean;
    initialData?: CandidateEducationResponse;
}

export function LocalComboBox({ control, name, options, label }: any) {
    const [open, setOpen] = React.useState(false);
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <div className="grid gap-2">
                    {label && <Label>{label}</Label>}
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" className="w-full justify-between text-muted-foreground">
                                {field.value ? options.find((o: any) => o.value === field.value)?.label : "Select..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                            <Command>
                                <CommandInput placeholder="Search..." />
                                <CommandList>
                                    <CommandEmpty>No results.</CommandEmpty>
                                    <CommandGroup>
                                        {options.map((option: any) => (
                                            <CommandItem
                                                key={option.value}
                                                value={option.label}
                                                onSelect={() => {
                                                    field.onChange(option.value);
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        field.value === option.value ? "opacity-100" : "opacity-0",
                                                    )}
                                                />
                                                {option.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {fieldState.error && <span className="text-red-500 text-sm">{fieldState.error.message}</span>}
                </div>
            )}
        />
    );
}

export default function EducationDetailsAdd({ trigger, isEdit, initialData }: EducationDetailsEditProps) {
    const [open, setOpen] = useState(false);

    const { mutate: createMutate, isPending: isCreatePending, isSuccess: isCreateSuccess } = useCreateEducation();
    const { mutate: editMutate, isPending: isEditPending, isSuccess: isEditSuccess } = useEditEducation();

    const schema = isEdit ? EditEducationSchema : CreateEducationSchema;

    const baseDefaults = {
        major: "",
        degree: undefined,
        yearStart: undefined,
        yearEnd: undefined,
        educationId: "",
    };

    const form = useForm<CreateEducationForm | EditEducationForm>({
        resolver: zodResolver(schema),
        defaultValues: baseDefaults,
        mode: "onChange",
        reValidateMode: "onChange",
    });

    const { isDirty, dirtyFields } = form.formState;

    useEffect(() => {
        if (isEdit && initialData) {
            form.reset({
                major: initialData.major || "",
                degree: initialData.degree as Degree,
                yearStart: initialData.yearStart ? new Date(Number(initialData.yearStart), 0, 1) : undefined,
                yearEnd: initialData.yearEnd ? new Date(Number(initialData.yearEnd), 0, 1) : undefined,
                educationId: initialData.educationId ? String(initialData.educationId) : "",
            });
        } else if (!isEdit) {
            form.reset(baseDefaults);
        }
    }, [isEdit, initialData, form]);

    // useEffect(() => {
    //     if (isEditSuccess) if (isEditSuccess) setOpen(false);
    //     if (isCreateSuccess) if (isCreateSuccess) setOpen(false);
    // }, [isEditSuccess, isCreateSuccess]);

    useEffect(() => {
        if (isEditSuccess || isCreateSuccess) {
            setOpen(false);
        }
    }, [isEditSuccess, isCreateSuccess]);

    function onSubmit(data: CreateEducationForm | EditEducationForm) {
        if (!isEdit) {
            const modify = { ...data } as CreateEducationForm;

            const payload: CandidateEducationPayload = {
                degree: modify.degree,
                educationId: Number(modify.educationId),
                major: modify.major,
                yearStart: new Date(modify.yearStart).getFullYear(),
                yearEnd: new Date(modify.yearEnd).getFullYear(),
            };

            createMutate({
                payload,
            });

            form.reset(baseDefaults);
        }

        if (isEdit) {
            if (Object.keys(dirtyFields).length === 0) {
                console.log("No changes detected");
                return;
            }

            const payload: Partial<CandidateEducationPayload> = {};

            if (dirtyFields.degree) payload.degree = data.degree;
            if (dirtyFields.educationId) payload.educationId = Number(data.educationId);
            if (dirtyFields.major) payload.major = data.major;
            if (dirtyFields.yearStart && data.yearStart) payload.yearStart = new Date(data.yearStart).getFullYear();
            if (dirtyFields.yearEnd && data.yearEnd) payload.yearEnd = new Date(data.yearEnd).getFullYear();

            editMutate({
                candidateEducationId: initialData?.id!,
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
                                        <CardTitle className=" md:text-lg">Education Details</CardTitle>
                                    </DialogTitle>
                                    <div className="flex gap-2">
                                        <Button onClick={form.handleSubmit(onSubmit)}>
                                            {isCreatePending || isEditPending ? <Spinner /> : "Save"}
                                        </Button>
                                    </div>
                                </CardHeader>
                            </DialogHeader>
                            <CardContent className=" px-4">
                                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                                    <FormInput
                                        control={form.control}
                                        name="major"
                                        label="Major"
                                        form={form}
                                        placeholder="e.g. B.Tech Computer Eng."
                                        required
                                        errorReserve
                                    />

                                    <FormSelect
                                        control={form.control}
                                        name="degree"
                                        label="Degree"
                                        placeholder="Select Degree"
                                        errorReserve
                                    >
                                        <SelectItem value={Degree.BACHELOR}>BACHELOR</SelectItem>
                                        <SelectItem value={Degree.MASTER}>MASTER</SelectItem>
                                        <SelectItem value={Degree.PHD}>PHD</SelectItem>
                                    </FormSelect>

                                    <FormDate
                                        form={form}
                                        control={form.control}
                                        name="yearStart"
                                        label="Start Year"
                                        errorReserve
                                    />
                                    <FormDate
                                        form={form}
                                        control={form.control}
                                        name="yearEnd"
                                        label="End Year"
                                        isFutureDate
                                        errorReserve
                                    />

                                    <LocalComboBox
                                        control={form.control}
                                        name="educationId"
                                        label="University"
                                        options={University}
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
