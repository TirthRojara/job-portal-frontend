"use client";
import {
    FormDate,
    FormInput,
    FormSelect,
    FormTextarea,
} from "@/components/custom-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import CardHeaderWrapper from "@/features/dashboard/components/card-header-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilLine, Save, Send, X } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const role = "CANDIDATE";

const ALL_SKILLS = [
    { value: "react", label: "React" },
    { value: "java", label: "Java" },
    { value: "javascript", label: "JavaScript" },
    { value: "css", label: "CSS" },
    { value: "python", label: "Python" },
];

const PersonalDetailSchema = z.object({
    title: z.string().min(1, "Required"),
    description: z.string().min(1, "Required"),
    responsibilities: z.string().min(1, "Required"),
    requirements: z.string().min(1, "Required"),
    location: z.string().min(1, "Required"),
    workPlace: z.enum(["ONSITE", "REMOTE", "HYBRID"], {
        error: "Please select degree",
    }),
    applicationDeadline: z.date({ error: "Please select dates" }),
    salaryMin: z.string(),
    salaryMax: z.string(),
    // jobRoleId:
});

type PersonalDetails = z.infer<typeof PersonalDetailSchema>;

export default function JobDetails() {
    const form = useForm<PersonalDetails>({
        resolver: zodResolver(PersonalDetailSchema),
        defaultValues: {},
        mode: "onChange",
        reValidateMode: "onChange",
    });

    function onSubmit(data: any) {
        console.log({ data });
    }
    return (
        <>
            {role === "CANDIDATE" && (
                <div className="flex flex-col sm:flex-row sm:justify-between max-w-3xl w-full sm:items-center gap-5">
                    <div className="flex flex-col">
                        <p className="text-2xl font-bold">Create New Post</p>
                        <p>Post a new position to attract top talent</p>
                    </div>
                    <div className="sm:flex sm:gap-3 sm:block hidden">
                        <Button variant={"outline"} className="bg-muted">
                            <Save />
                            Save as Draft
                        </Button>
                        <Button onClick={form.handleSubmit(onSubmit)}>
                            <Send />
                            Post Job
                        </Button>
                    </div>
                </div>
            )}
            <form className="flex flex-col gap-6 w-full max-w-3xl">
                <CardHeaderWrapper
                    title="Job Details"
                    buttonLabel="Edit"
                    lucidIcon={PencilLine}
                >
                    <div className="flex flex-col gap-4 pb-3">
                        <FormInput
                            control={form.control}
                            name="title"
                            label="Title"
                            form={form}
                            placeholder="e.g. Senior Backend Developer"
                            required
                            errorReserve
                        />

                        <FormTextarea
                            control={form.control}
                            name="description"
                            label="Description"
                            placeholder="Describe the role and what the candidate will be doing..."
                            form={form}
                            required
                            errorReserve
                        />
                        <FormTextarea
                            control={form.control}
                            name="responsibilities"
                            label="Responsibilities"
                            placeholder="List the main responsibilities and duties..."
                            form={form}
                            required
                            errorReserve
                        />
                        <FormTextarea
                            control={form.control}
                            name="requirements"
                            label="Requirements"
                            placeholder="List the required qualification, experinece and skills..."
                            form={form}
                            required
                            errorReserve
                        />
                    </div>
                </CardHeaderWrapper>
                <CardHeaderWrapper
                    title="Location & Work Type"
                    buttonLabel="Edit"
                    lucidIcon={PencilLine}
                >
                    <div className="grid sm:grid-cols-2 gap-4 pb-3">
                        <FormInput
                            control={form.control}
                            name="location"
                            label="Location"
                            form={form}
                            placeholder="e.g. San Francisco, CA"
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
                    </div>
                </CardHeaderWrapper>

                <CardHeaderWrapper
                    title="Salary & Timeline"
                    buttonLabel="Edit"
                    lucidIcon={PencilLine}
                >
                    <div className="grid sm:grid-cols-3 gap-4 pb-3">
                        <FormInput
                            control={form.control}
                            name="salaryMin"
                            label="Minimum Salary"
                            form={form}
                            placeholder="200000"
                            type="number"
                            required
                            errorReserve
                        />
                        <FormInput
                            control={form.control}
                            name="salaryMax"
                            label="Maximum Salary"
                            form={form}
                            placeholder="800000"
                            type="number"
                            required
                            errorReserve
                        />

                        <FormDate
                            form={form}
                            control={form.control}
                            name="applicationDeadline"
                            label="Application Deadline"
                            errorReserve
                        />
                    </div>
                </CardHeaderWrapper>
            </form>
            <form className="flex flex-col gap-6 w-full max-w-3xl">
                <CardHeaderWrapper
                    title="Skills"
                    buttonLabel="Edit"
                    lucidIcon={PencilLine}
                    searchDialog
                >
                    <div className="flex gap-2 flex-wrap">
                        {ALL_SKILLS.map((skill) => (
                            <Badge
                                key={skill.value}
                                className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm group cursor-pointer"
                            >
                                {skill.label}
                                <X className="ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Badge>
                        ))}
                    </div>
                </CardHeaderWrapper>
            </form>
            <form className="flex flex-col gap-6 w-full max-w-3xl">
                <CardHeaderWrapper
                    title="Benefits & Perks"
                    buttonLabel="Edit"
                    lucidIcon={PencilLine}
                    searchDialog
                >
                    <div className="flex gap-2 flex-wrap">
                        {ALL_SKILLS.map((skill) => (
                            <Badge
                                key={skill.value}
                                className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm group cursor-pointer"
                            >
                                {skill.label}
                                <X className="ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Badge>
                        ))}
                    </div>
                </CardHeaderWrapper>
            </form>
            {/* mobile view */}
            <div className="w-full flex gap-4 mt-2 mb-1 sm:hidden">
                <Button variant={"outline"} className="bg-muted">
                    <Save />
                    Save as Draft
                </Button>
                <Button>
                    <Send />
                    Post Job
                </Button>
            </div>
        </>
    );
}
