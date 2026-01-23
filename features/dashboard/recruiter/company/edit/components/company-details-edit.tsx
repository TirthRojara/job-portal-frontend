"use client";
import { FormDate, FormInput, FormTextarea } from "@/components/custom-form";
import { Button } from "@/components/ui/button";
import CardHeaderWrapper from "@/features/dashboard/components/card-header-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveLeft, Save } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import z, { any, never } from "zod";
import { CompanyCreateSchema, CompanyUpdateSchema, ICompanyCreate, ICompanyUpdate } from "../api/types";
import { useCreateCompany, useUpdateCompany } from "../api/mutation";
import { useGetMyComanyDetails } from "../../api/query";
import { YYYYMMDD } from "@/lib/utils/utils";

// .${isFirst ? 'strict()' : 'partial()'}(); // partial() makes ALL optional // Method-2 use this

// const isFirst = useSelector((state: any) => state.someSlice.isFirst);

// const schema = isFirst
//     ? zodResolver(PersonalDetailSchemaRequired)
//     : zodResolver(PersonalDetailSchemaOptional);

// type PersonalDetails = z.infer<typeof PersonalDetailSchema>;

export default function CompanyDetailsEdit() {
    const router = useRouter();
    const pathname = usePathname();

    const isCreatePage = pathname.includes("create");

    const {
        data: companyData,
        isLoading: isCompanyLoading,
        error: companyError,
        isError: isCompanyError,
    } = useGetMyComanyDetails();

    const company = companyData?.data?.[0];
    console.log({ company });

    const { mutate: createCompanyMutate } = useCreateCompany();
    const { mutate: updateCompanyMutate } = useUpdateCompany();

    console.log({ isCreatePage });

    const baseDefaults = {
        name: "",
        description: "",
        location: "",
        address: "",
        mapLink: "",
        websiteUrl: "",
        totalEmployees: "",
        establishedDate: undefined,
    };

    const form = useForm<ICompanyCreate | ICompanyUpdate>({
        resolver: zodResolver(isCreatePage ? CompanyCreateSchema : CompanyUpdateSchema),
        defaultValues: baseDefaults,
        mode: "onChange",
        reValidateMode: "onChange",
    });

    useEffect(() => {
        if (!isCreatePage && company && !isCompanyLoading && !isCompanyError) {
            form.reset({
                name: company.name || "",
                description: company.description || "",
                location: company.location || "",
                address: company.address || "",
                mapLink: company.mapLink || "",
                websiteUrl: company.websiteUrl || "",
                totalEmployees: company.totalEmployees?.toString() || "",
                establishedDate: company.establishedDate ? new Date(company.establishedDate) : undefined,
            });
        }
    }, [company, isCreatePage, isCompanyLoading, isCompanyError, form]);

    function onSubmit(data: ICompanyCreate | ICompanyUpdate) {
        const payload = {
            ...data,
            establishedDate: YYYYMMDD(data.establishedDate!.toString()),
            totalEmployees: Number(data.totalEmployees),
        };

        if (isCreatePage) {
            const cleanPayload = Object.fromEntries(
                Object.entries(payload).filter(([_, value]) => {
                    // Remove undefined AND empty strings
                    return value !== undefined && value !== "";
                }),
            );

            createCompanyMutate(cleanPayload as any);
        } else {
            const changedData = Object.keys(form.formState.dirtyFields).reduce((acc, key) => {
                acc[key as keyof ICompanyUpdate] = data[key as keyof ICompanyUpdate];
                return acc;
            }, {} as any);

            console.log("Only changed:", changedData);

            // Handle Date
            if (changedData.establishedDate) {
                // Check if it's already a string or needs .toString()
                const dateStr =
                    typeof changedData.establishedDate === "string"
                        ? changedData.establishedDate
                        : changedData.establishedDate.toString();

                changedData.establishedDate = YYYYMMDD(dateStr);
            }

            // Handle Number conversion
            if (changedData.totalEmployees) {
                changedData.totalEmployees = Number(changedData.totalEmployees);
            }

            // 3. Stop if nothing changed
            if (Object.keys(changedData).length === 0) {
                console.log("No changes detected");
                return;
            }

            const payloadData = {
                companyId: company!.id,
                data: changedData,
            };

            console.log({ payloadData });
            updateCompanyMutate(payloadData);
        }
    }

    return (
        <div className="w-full max-w-4xl justify-center items-center">
            <form className="flex flex-col justify-center items-center w-full max-w-4xl gap-6">
                <div className="flex items-center justify-between w-full">
                    <div>
                        <h2 className="font-semibold text-2xl sm:text-3xl">{isCreatePage ? "Create" : "Edit"} Company Profile</h2>
                        <p className="text-muted-foreground">
                            {isCreatePage ? "Create" : "Update"} your company information and branding
                        </p>
                    </div>
                    <div>
                        <Button variant={"ghost"} onClick={() => router.push("/dashboard/recruiter/company")} type="button">
                            <MoveLeft /> Back
                        </Button>
                    </div>
                </div>
                <CardHeaderWrapper title="Company Details" isButton={false} width="max-w-4xl">
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
                                errorReserve
                            />
                            <FormInput
                                control={form.control}
                                name="mapLink"
                                label="Map Link"
                                form={form}
                                placeholder=""
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
                            <Button className="w-45" onClick={form.handleSubmit(onSubmit)}>
                                <Save /> Save
                            </Button>
                        </div>
                    )}
                </CardHeaderWrapper>
            </form>
        </div>
    );
}
