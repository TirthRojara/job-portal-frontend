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
    major: z.string({ error: "Required" }).min(1, "Required"),
    degree: z.enum(["BACHELOR", "MASTER", "PHD"], {
        error: "Please select degree",
    }),
    yearStart: z.date({ error: "Please select date" }),
    yearEnd: z.date({ error: "Please select date" }),
    educationId: z.string().min(1, "Please select University"),
});

type PersonalDetails = z.infer<typeof PersonalDetailSchema>;

interface EducationDetailsEditProps {
    trigger: React.ReactNode;
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
                            <Button
                                variant="outline"
                                role="combobox"
                                className="w-full justify-between text-muted-foreground"
                            >
                                {field.value
                                    ? options.find(
                                          (o: any) => o.value === field.value
                                      )?.label
                                    : "Select..."}
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
                                                    field.onChange(
                                                        option.value
                                                    );
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        field.value ===
                                                            option.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
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
                    {fieldState.error && (
                        <span className="text-red-500 text-sm">
                            {fieldState.error.message}
                        </span>
                    )}
                </div>
            )}
        />
    );
}

export default function EducationDetailsAdd({
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
                {/* <DialogContent className="sm:max-w-[425px]"> */}
                {/* <DialogContent className=" h-[90vh] w-[90vw] max-h-[90vh] max-w-[90vw] sm:h-[600px] sm:w-[800px] md:w-3xl md:h-[600px]"> */}
                <DialogContent
                    showCloseButton={true}
                    className="w-full md:min-w-3xl md:h-fit h-[90vh]"
                >
                    {/* <DialogHeader>
                        <DialogTitle>Personal Details</DialogTitle>
                    </DialogHeader> */}
                    {/* <Card className="max-w-4xl w-full py-4"> */}
                    <div className="h-full overflow-auto p-3">
                        <Card className="max-w-4xl w-full border-none shadow-none">
                            <DialogHeader>
                                <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                                    <DialogTitle>
                                        <CardTitle className=" md:text-lg">
                                            Education Details
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

                                        {/* <Button variant={"outline"}>Cancel</Button> */}
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
                                        name="major"
                                        label="Major"
                                        form={form}
                                        placeholder=""
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
                                        <SelectItem
                                            key="BACHELOR"
                                            value="BACHELOR"
                                        >
                                            BACHELOR
                                        </SelectItem>
                                        <SelectItem key="MASTER" value="MASTER">
                                            MASTER
                                        </SelectItem>
                                        <SelectItem key="PHD" value="PHD">
                                            PHD
                                        </SelectItem>
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
                                        errorReserve
                                    />

                                    <LocalComboBox
                                        control={form.control}
                                        name="educationId"
                                        label="University"
                                        // placeholder="Select a University"
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
