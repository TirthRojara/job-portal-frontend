"use client";
import { FormCheckbox, FormDate, FormDisplay, FormInput, FormSelect, FormSwitch, FormTextarea } from "@/components/custom-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SelectItem } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenLine } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import z, { any } from "zod";
import { CreateProfileResponse, Gender, UpdateProfileFormData, UpdateProfilePayload, UpdateProfileSchema } from "../../api/types";
import { useUpdateCandidateProfile } from "../../api/mutation";
import { YYYYMMDD } from "@/lib/utils/utils";
import { Spinner } from "@/components/ui/spinner";

export default function PersonalDetailsEdit({ profileData }: { profileData: CreateProfileResponse }) {
    const { mutate: updateProfileMutate, isPending } = useUpdateCandidateProfile();

    const form = useForm<UpdateProfileFormData>({
        resolver: zodResolver(UpdateProfileSchema),
        defaultValues: {
            fullname: profileData.fullName,
            gender: profileData.gender,
            phone: profileData.phone,
            address: profileData.address,
            openToWork: profileData.openToWork,
            birthDate: profileData.birthDate ? new Date(profileData.birthDate) : undefined,
            summary: profileData.summary,
        },
        mode: "onChange",
        reValidateMode: "onChange",
    });

    useEffect(() => {
        if (profileData) {
            form.reset({
                fullname: profileData.fullName,
                gender: profileData.gender,
                phone: profileData.phone,
                address: profileData.address,
                openToWork: profileData.openToWork,
                birthDate: profileData.birthDate ? new Date(profileData.birthDate) : undefined,
                summary: profileData.summary,
            });
        }
    }, [profileData, form]);

    function onSubmit(data: UpdateProfileFormData) {
        console.log({ data });

        const dirtyFields = form.formState.dirtyFields;

        // 2. Stop if nothing changed
        if (Object.keys(dirtyFields).length === 0) {
            console.log("No changes detected");
            return;
        }

        const payload: UpdateProfilePayload = {};

        if (dirtyFields.fullname) payload.fullName = data.fullname;
        if (dirtyFields.gender) payload.gender = data.gender as Gender;
        if (dirtyFields.phone) payload.phone = data.phone;
        if (dirtyFields.address) payload.address = data.address;
        if (dirtyFields.openToWork) payload.openToWork = data.openToWork;
        if (dirtyFields.summary) payload.summary = data.summary;
        if (dirtyFields.birthDate && data.birthDate) {
            payload.birthDate = YYYYMMDD(data.birthDate.toString());
        }

        console.log("only changed:", payload);

        updateProfileMutate({
            payload,
        });
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={"outline"}>
                        <PenLine /> Edit
                    </Button>
                </DialogTrigger>
                <DialogContent
                    showCloseButton={true}
                    className="w-full md:min-w-3xl md:h-fit h-[90vh]"
                    aria-describedby={undefined}
                >
                    <div className="h-full overflow-auto p-3">
                        <Card className="max-w-4xl w-full border-none shadow-none">
                            <DialogHeader>
                                <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                                    <DialogTitle>
                                        <CardTitle className=" md:text-lg">Personal Details</CardTitle>
                                    </DialogTitle>
                                    <div className="flex gap-2">
                                        {form.formState.isDirty && (
                                            <Button disabled={isPending} onClick={form.handleSubmit(onSubmit)}>
                                                {isPending ? <Spinner /> : "Save"}
                                            </Button>
                                        )}
                                    </div>
                                </CardHeader>
                            </DialogHeader>
                            <CardContent className=" px-4">
                                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                                    <FormInput
                                        control={form.control}
                                        name="fullname"
                                        label="Full Name"
                                        form={form}
                                        placeholder="Tirth Rojara"
                                        required
                                        errorReserve
                                    />

                                    <FormInput
                                        control={form.control}
                                        name="phone"
                                        label="Phone"
                                        form={form}
                                        placeholder="1234567890"
                                        type="tel"
                                        required
                                        errorReserve
                                    />

                                    <FormSelect
                                        control={form.control}
                                        name="gender"
                                        label="Gender"
                                        placeholder="Select"
                                        errorReserve
                                    >
                                        <SelectItem key="MALE" value="MALE">
                                            MALE
                                        </SelectItem>
                                        <SelectItem key="FEMALE" value="FEMALE">
                                            FEMALE
                                        </SelectItem>
                                        <SelectItem key="OTHER" value="OTHER">
                                            OTHER
                                        </SelectItem>
                                    </FormSelect>

                                    <FormDate
                                        form={form}
                                        control={form.control}
                                        name="birthDate"
                                        label="Date of birth"
                                        errorReserve
                                    />

                                    <FormTextarea
                                        control={form.control}
                                        name="address"
                                        label="Address"
                                        form={form}
                                        required
                                        errorReserve
                                    />

                                    <FormTextarea
                                        control={form.control}
                                        name="summary"
                                        label="Summary"
                                        form={form}
                                        required
                                        errorReserve
                                    />

                                    <FormSwitch
                                        form={form}
                                        control={form.control}
                                        name="openToWork"
                                        label="Open To Work"
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
