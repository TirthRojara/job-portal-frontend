import { FormDate, FormInput, FormSelect, FormSwitch, FormTextarea } from "@/components/custom-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SelectItem } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { CreateProfilePayload, createProfileSchema, Gender, ICreateProfile } from "../api/types";
import { useCreateJob } from "../api/mutation";
import { Spinner } from "@/components/ui/spinner";
import { da } from "date-fns/locale";
import { YYYYMMDD } from "@/lib/utils/utils";

export default function CreateProfile() {

    const { mutate: createProfileMutate , isPending} = useCreateJob()


    const form = useForm<ICreateProfile>({
        resolver: zodResolver(createProfileSchema),
        defaultValues: {
            fullname: "",
            gender: undefined,
            phone: "",
            address: "",
            openToWork: false,
            birthDate: undefined,
            summary: "",
        },
        mode: "onChange",
        reValidateMode: "onChange",
    });

    function onSubmit(data: ICreateProfile) {
        console.log("create click");
        console.log({ data });

        const payload: CreateProfilePayload = { 
            fullName: data.fullname,
            summary: data.summary,
            phone: data.phone,
            address: data.address,
            gender: data.gender as Gender,
            birthDate: YYYYMMDD(data.birthDate.toString()),
            openToWork: data.openToWork
        }

        createProfileMutate({
            payload
        })
    }

    return (
        <Card className="flex flex-col max-w-4xl w-full border px-6">
            <div className="flex flex-col items-center">
                <p className="text-2xl font-bold">Create Profile</p>
                {/* <p>Post a new position to attract top talent</p> */}
            </div>
            <div className="flex flex-col gap-6">
                <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 "
                    // className=" space-y-6"
                >
                    <FormInput
                        control={form.control}
                        name="fullname"
                        label="Full Name"
                        form={form}
                        placeholder=""
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

                    <FormSelect control={form.control} name="gender" label="Gender" placeholder="Select" errorReserve>
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

                    <FormDate form={form} control={form.control} name="birthDate" label="Date of birth" errorReserve />

                    <FormTextarea control={form.control} name="address" label="Address" form={form} required errorReserve />

                    <FormTextarea control={form.control} name="summary" label="Summary" form={form} required errorReserve />

                    <FormSwitch form={form} control={form.control} name="openToWork" label="Open To Work" errorReserve />
                </form>
                <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
                    {isPending ? <Spinner /> : 'Create'}
                </Button>
            </div>
        </Card>
    );
}
