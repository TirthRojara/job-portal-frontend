"use client";
import { FormDate, FormInput, FormSelect, FormTextarea } from "@/components/custom-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import CardHeaderWrapper from "@/features/dashboard/components/card-header-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilLine, Save, Send, Trash2, X } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z, { boolean } from "zod";
import JobSkills, { JobSkillsEdit } from "./job-skills";
import JobBenefitAndPerks from "./job-benefit";
import {
    CreateJobFormData,
    CreateJobPayload,
    CreateJobSchema,
    EditJobFormData,
    EditJobPayload,
    EditJobSchema,
    EditJobStatus,
} from "../api/types";
import { useCreateJob, useDeleteJOb, useEditJob, useUpdateJobStatus } from "../api/mutation";
import { YYYYMMDD } from "@/lib/utils/utils";
import { useGetJobById } from "../../[jobId]/api/query";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function JobDetails({ companyId }: { companyId: number }) {
    const [isCreatedJob, setIsCreatedJob] = useState(false);
    const [step, setStep] = useState<number | null>(null);

    const pathname = usePathname();
    const params = useParams();
    const router = useRouter();
    const jobIdInParams = params.jobId;
    const jobIdFromParams = Array.isArray(jobIdInParams) ? jobIdInParams[0] : jobIdInParams;
    const jobIdInSession = sessionStorage.getItem("jobId");

    const { data: jobData, isError, isLoading } = useGetJobById(jobIdFromParams!);

    console.log("job data by id : ", jobData);
    const job = jobData?.data;

    const { mutate: createJobMutate, isPending: createJobIsPending, isSuccess: createJobIsSuccess } = useCreateJob();
    const { mutate: editJobMutate } = useEditJob();
    const { mutate: updateStatusMutate, isPending: isUpdateStatusPending } = useUpdateJobStatus();
    const { mutate: deleteMutate } = useDeleteJOb();

    const isCreatePath = pathname === "/dashboard/recruiter/jobpost/create";
    const isEditPath = pathname.startsWith("/dashboard/recruiter/jobpost/") && pathname.endsWith("/edit");
    // const isCreatedJobOrEdit = (isCreatePath && !isCreatedJob) || isEditPath;
    const isCreatedJobOrEdit = (isCreatePath && step === 1) || isEditPath;

    const jobIdByCondition = isCreatePath ? jobIdInSession : jobIdFromParams;

    // Read step from sessionStorage on mount
    useEffect(() => {
        const stored = sessionStorage.getItem("step");
        setStep(stored ? Number(stored) : 1); // default step = 1
    }, []);

    // Persist step on every change
    useEffect(() => {
        if (step !== null) {
            sessionStorage.setItem("step", String(step));
        }
    }, [step]);

    // console.log({ companyId });
    // console.log({ isCreatedJobOrEdit });
    // console.log({ pathname, isEditPath, isCreatePath });
    // console.log({ isCreatedJob });
    // useEffect(() => {
    //     console.log({ isCreatedJob });
    // }, [isCreatedJob]);

    const schema = isEditPath ? EditJobSchema : CreateJobSchema;

    const baseDefaults = {
        title: "",
        description: "",
        responsibilities: "",
        requirements: "",
        location: "",
        workPlace: undefined,
        jobRole: undefined,
        applicationDeadline: undefined,
        salaryMin: "",
        salaryMax: "",
    };

    const form = useForm<CreateJobFormData | EditJobFormData>({
        resolver: zodResolver(schema),
        defaultValues: baseDefaults,
        mode: "onChange",
        reValidateMode: "onChange",
    });

    useEffect(() => {
        if (jobData && !isLoading && !isError && isEditPath) {
            form.reset({
                title: job?.title || "",
                description: job?.description || "",
                responsibilities: job?.responsibilities || "",
                requirements: job?.requirements || "",
                location: job?.location || "",
                workPlace: job?.workplace || undefined,
                jobRole: job?.jobRole?.id ? (String(job.jobRole.id) as "1" | "2" | "3" | "4") : undefined,
                applicationDeadline: job?.applicationDeadline ? new Date(job.applicationDeadline) : undefined,
                salaryMin: job?.salaryMin ? String(job.salaryMin) : "",
                salaryMax: job?.salaryMax ? String(job.salaryMax) : "",
            });
        }
    }, [jobData, isError, isLoading, form, isEditPath]);

    function onSubmit(data: CreateJobFormData | EditJobFormData) {
        // console.log({ data });

        if (isCreatePath) {
            const modifyFormData = {
                ...data,
            } as CreateJobFormData;

            console.log({ modifyFormData });

            const createJobPayload: CreateJobPayload = {
                title: modifyFormData.title,
                description: modifyFormData.description,
                responsibilities: modifyFormData.responsibilities,
                requirements: modifyFormData.requirements,
                location: modifyFormData.location,
                workplace: modifyFormData.workPlace,
                status: "PENDING",
                salaryMin: Number(modifyFormData.salaryMin),
                salaryMax: Number(modifyFormData.salaryMax),
                jobRoleId: Number(modifyFormData.jobRole),
                applicationDeadline: YYYYMMDD(modifyFormData.applicationDeadline.toString()),
            };

            const payloadData = {
                companyId,
                data: createJobPayload,
            };

            createJobMutate(payloadData, {
                onSuccess(data, variables, onMutateResult, context) {
                    setStep(2);
                    sessionStorage.setItem("jobId", String(data.data?.id));
                },
                onError(error, variables, onMutateResult, context) {
                    setStep(1);
                },
            });
        } else if (isEditPath) {
            // 1. Get dirty fields
            const dirtyFields = form.formState.dirtyFields;

            // 2. Stop if nothing changed
            if (Object.keys(dirtyFields).length === 0) {
                console.log("No changes detected");
                return;
            }

            // 3. Transform: Map ONLY Changed Data -> API Payload
            const payloadData: EditJobPayload = {};
            const formData = data as EditJobFormData;

            // Iterate over the keys found in dirtyFields
            (Object.keys(dirtyFields) as (keyof EditJobFormData)[]).forEach((key) => {
                // ⚠️ SAFETY CHECK: Ensure the field is actually true (dirty)
                // (Sometimes keys exist but are set to false/undefined)
                if (dirtyFields[key] !== true) return;

                const value = formData[key];
                if (value === undefined) return;

                // Handle specific transformations
                switch (key) {
                    case "salaryMin":
                    case "salaryMax":
                        // Convert string "200000" -> number 200000
                        (payloadData as any)[key] = Number(value);
                        break;

                    case "jobRole":
                        // Rename 'jobRole' -> 'jobRoleId' and convert to Number
                        payloadData.jobRoleId = Number(value);
                        break;

                    case "workPlace":
                        // Rename 'workPlace' -> 'workplace' & ensure string
                        payloadData.workplace = value as string;
                        break;

                    case "applicationDeadline":
                        // Ensure Date object
                        payloadData.applicationDeadline = YYYYMMDD(value as string);
                        break;

                    default:
                        // For simple fields (title, description, etc.), copy directly
                        (payloadData as any)[key] = value;
                        break;
                }
            });

            // 🔍 CHECK THIS LOG (Not the one at the top of onSubmit)
            console.log("Final Filtered Payload:", payloadData);

            // 4. Send Request (Ensure you have jobIdInParams available)
            // You might need to import your update mutation hook (e.g., useUpdateJob)
            editJobMutate({
                jobId: Number(jobIdFromParams), // Or
                companyId: companyId,
                data: payloadData,
            });
        }
    }

    const handlePostNow = () => {
        updateStatusMutate(
            {
                jobId: Number(jobIdByCondition),
                companyId,
                payload: { status: EditJobStatus.ACTIVE },
            },
            {
                onSuccess(data, variables, onMutateResult, context) {
                    toast.success("Job posted successfully.");
                    router.push("/dashboard/recruiter/jobpost");
                    setStep(1);
                },
            },
        );
    };

    const handleDeleteJob = () => {
        deleteMutate(
            {
                jobId: Number(jobIdByCondition),
                companyId,
            },
            {
                onSuccess(data, variables, onMutateResult, context) {
                    router.push("/dashboard/recruiter/jobpost");
                },
            },
        );
    };

    if (step === null) return null; // optional loading

    return (
        <>
            {isEditPath && (
                <div className="max-w-3xl w-full flex justify-between gap-3">
                    <div>
                        <Button variant={"destructive"} onClick={handleDeleteJob}>
                            <Trash2 />
                            Delete
                        </Button>
                    </div>
                    <div className="flex gap-3">
                        <Button onClick={form.handleSubmit(onSubmit)}>Update Post</Button>
                        {job?.status === "PENDING" && (
                            <Button onClick={handlePostNow}>
                                <Send /> Post Now
                            </Button>
                        )}
                    </div>
                </div>
            )}

            {/* {isCreatePath && !isCreatedJob && ( */}
            {isCreatePath && step === 1 && (
                <div className="flex flex-col sm:flex-row sm:justify-between max-w-3xl w-full sm:items-center gap-5">
                    <div className="flex flex-col">
                        <p className="text-2xl font-bold">Create New Post</p>
                        <p>Post a new position to attract top talent</p>
                    </div>
                    <div className="sm:flex sm:gap-3 sm:block hidden">
                        {/* <Button variant={"outline"} className="bg-muted">
                            <Save />
                            Save as Draft
                        </Button> */}
                        <Button onClick={form.handleSubmit(onSubmit)}>
                            {/* <Send /> */}
                            Continue
                        </Button>
                    </div>
                </div>
            )}

            {isCreatedJobOrEdit && (
                <form className="flex flex-col gap-6 w-full max-w-3xl">
                    <CardHeaderWrapper title="Job Details" isButton={false}>
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
                    <CardHeaderWrapper title="Location & Work Type" isButton={false}>
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

                            <FormSelect
                                control={form.control}
                                name="jobRole"
                                label="Job Role"
                                placeholder="Select Job Role"
                                errorReserve
                            >
                                <SelectItem key="Internship" value="1">
                                    Internship
                                </SelectItem>
                                <SelectItem key="Fresher" value="2">
                                    Fresher
                                </SelectItem>
                                <SelectItem key="Junior" value="3">
                                    Junior
                                </SelectItem>
                                <SelectItem key="Senior" value="4">
                                    Senior
                                </SelectItem>
                            </FormSelect>
                        </div>
                    </CardHeaderWrapper>

                    <CardHeaderWrapper title="Salary & Timeline" isButton={false}>
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
            )}

            {/* AFTER JOB CREATED  */}
            {/* {isCreatePath && isCreatedJob && ( */}
            {isCreatePath && step === 2 && (
                <div className="flex flex-col sm:flex-row sm:justify-between max-w-3xl w-full sm:items-center gap-5">
                    <div className="flex flex-col">
                        <p className="text-2xl font-bold">Create New Post</p>
                        <p>Post a new position to attract top talent</p>
                    </div>
                    <div className="sm:flex sm:gap-3 sm:block hidden">
                        {/* <Button onClick={form.handleSubmit(onSubmit)}> ============================*/}
                        <Button onClick={handlePostNow}>
                            {isUpdateStatusPending ? (
                                <Spinner />
                            ) : (
                                <>
                                    <Send />
                                    Post Now
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            )}

            {/* {(isEditPath || isCreatedJob) && <JobSkills />} */}
            {/* {(isEditPath || isCreatedJob) && <JobBenefitAndPerks />} */}

            {/* {(isEditPath || step === 2) && <JobSkills />} */}
            {/* {(isEditPath || step === 2) && <JobBenefitAndPerks />} */}
            {step === 2 && <JobSkills />}
            {isEditPath && <JobSkillsEdit />}

            {(step === 2 || isEditPath) && <JobBenefitAndPerks />}

            {/* mobile view */}
            {/* {isCreatePath && !isCreatedJob && ( */}
            {isCreatePath && step === 1 && (
                <div className="w-full flex justify-end gap-4 mt-2 mb-1 sm:hidden">
                    {/* <Button variant={"outline"} className="bg-muted">
                        <Save />
                        Save as Draft
                    </Button> */}
                    <Button onClick={form.handleSubmit(onSubmit)}>
                        {/* <Send /> */}
                        Continue
                    </Button>
                </div>
            )}
            {/* {isCreatePath && isCreatedJob && ( */}
            {isCreatePath && step === 2 && (
                <div className="w-full flex gap-4 mt-2 mb-1 sm:hidden justify-end">
                    <Button onClick={handlePostNow}>
                        {isUpdateStatusPending ? (
                            <Spinner />
                        ) : (
                            <>
                                <Send />
                                Post Now
                            </>
                        )}
                    </Button>
                </div>
            )}
        </>
    );
}
