"use client";
import { FormDate, FormInput, FormTextarea } from "@/components/custom-form";
import { Button } from "@/components/ui/button";
import CardHeaderWrapper from "@/features/dashboard/components/card-header-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveLeft, Save } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const PersonalDetailSchema = z.object({
    name: z.string().min(1, "Required"),
    description: z.string().min(1, "Required"),
    location: z.string().min(1, "Required"),
    address: z.string().min(1, "Required").optional(),
    mapLink: z.string().min(1, "Required").optional(),
    websiteUrl: z.string().min(1, "Required").optional(),
    totalEmployees: z.string().min(1, "Required"),
    establishedDate: z.date({ error: "Please select dates" }),
});
// .${isFirst ? 'strict()' : 'partial()'}(); // partial() makes ALL optional // Method-2 use this

// method-1 just see how it also work
// const PersonalDetailSchemaOptional = z.object({
//     name: z.string().min(1, "Required").optional(),
//     description: z.string().min(1, "Required").optional(),
//     location: z.string().min(1, "Required").optional(),
//     address: z.string().min(1, "Required").optional(),
//     mapLink: z.string().min(1, "Required").optional(),
//     websiteUrl: z.string().min(1, "Required").optional(),
//     totalEmployees: z.string().min(1, "Required").optional(),
//     establishedDate: z.date({ error: "Please select dates" }).optional(),
// });

// const isFirst = useSelector((state: any) => state.someSlice.isFirst);

// const schema = isFirst
//     ? zodResolver(PersonalDetailSchemaRequired)
//     : zodResolver(PersonalDetailSchemaOptional);

type PersonalDetails = z.infer<typeof PersonalDetailSchema>;

export default function CompanyDetailsEdit() {
    const form = useForm<PersonalDetails>({
        resolver: zodResolver(PersonalDetailSchema), //pass the schema here
        defaultValues: {
            name: "",
            description: "",
            location: "",
            address: "",
            mapLink: "",
            websiteUrl: "",
            totalEmployees: "",
            establishedDate: undefined,
        },
        mode: "onChange",
        reValidateMode: "onChange",
    });

    function onSubmit(data: any) {
        console.log({ data });
    }

    return (
        <div className="w-full max-w-4xl justify-center items-center">
            <form className="flex flex-col justify-center items-center w-full max-w-4xl gap-6">
                <div className="flex items-center justify-between w-full">
                    <div>
                        <h2 className="font-semibold text-2xl sm:text-3xl">
                            Edit Company Profile
                        </h2>
                        <p className="text-muted-foreground">
                            Update your company information and branding
                        </p>
                    </div>
                    <div>
                        <Button variant={"ghost"}>
                            <MoveLeft /> Back
                        </Button>
                    </div>
                </div>
                <CardHeaderWrapper
                    title="Company Details"
                    isButton={false}
                    width="max-w-4xl"
                >
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-6">
                            <FormInput
                                control={form.control}
                                name="name"
                                label="Company Name"
                                form={form}
                                placeholder=""
                                required
                                errorReserve
                            />

                            <FormTextarea
                                control={form.control}
                                name="description"
                                label="Description"
                                placeholder=""
                                form={form}
                                required
                                errorReserve
                            />
                        </div>
                        <div className=" grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormInput
                                control={form.control}
                                name="location"
                                label="Location"
                                form={form}
                                placeholder="e.g. San Francisco, CA"
                                required
                                errorReserve
                            />
                            <FormInput
                                control={form.control}
                                name="websiteUrl"
                                label="Website URL"
                                form={form}
                                placeholder=""
                                required
                                errorReserve
                            />
                        </div>
                        <div className="flex flex-col gap-6">
                            <FormTextarea
                                control={form.control}
                                name="address"
                                label="Address"
                                placeholder=""
                                form={form}
                                required
                                errorReserve
                            />
                            <FormInput
                                control={form.control}
                                name="mapLink"
                                label="Map Link"
                                form={form}
                                placeholder=""
                                required
                                errorReserve
                            />
                        </div>
                        <div className=" grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                            <FormInput
                                control={form.control}
                                name="totalEmployees"
                                label="Total Employees"
                                type="number"
                                form={form}
                                placeholder=""
                                required
                                errorReserve
                            />
                            <FormDate
                                form={form}
                                control={form.control}
                                name="establishedDate"
                                label="Established Date"
                                errorReserve
                            />
                        </div>
                    </div>

                    {form.formState.isDirty && (
                        <div className="flex justify-end my-3">
                            <Button
                                className="w-45"
                                onClick={form.handleSubmit(onSubmit)}
                            >
                                <Save /> Save
                            </Button>
                        </div>
                    )}
                </CardHeaderWrapper>
            </form>
        </div>
    );
}
