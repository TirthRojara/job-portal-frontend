"use client";
import { FormDisplay, FormInput, FormSelect } from "@/components/custom-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectItem } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const PersonalDetailSchema = z.object({
    fullname: z.string().min(1, "Required"),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
    phone: z.number().min(10, 'Phone must be 10 digits').max(10, 'Phone must be 10 digits')
});


type PersonalDetails = z.infer<typeof PersonalDetailSchema>;

export default function PersonalDetails() {
    const form = useForm<PersonalDetails>({
        resolver: zodResolver(PersonalDetailSchema),
        defaultValues: {
            fullname: "",
            email: "",
            gender: "MALE",
        },
        mode: "onChange",
        reValidateMode: "onChange",
    });

    function onSubmit(data: any) {
        console.log({ data });
        console.log(data.fullname);
        console.log(data.email);

        // form.reset();
    }

    return (
        <>
            <Card className="max-w-4xl w-full py-4">
                <CardHeader className=" flex flex-row items-center justify-between px-4">
                    <CardTitle className=" md:text-lg">
                        Personal Details
                    </CardTitle>
                    <div className="flex gap-2">
                        {form.formState.isDirty && <Button>Save</Button>}
                        {/* <Button variant={"outline"}>Cancel</Button> */}
                    </div>
                </CardHeader>
                <CardContent className=" px-4">
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 "
                        // className=" space-y-6"
                    >
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
                            name="email"
                            label="Email"
                            placeholder="test@example.com"
                            required
                            type="email"
                            errorReserve
                        />

                        <FormSelect
                            control={form.control}
                            name="gender"
                            label="Gender"
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

                        <FormInput
                            control={form.control}
                            name="phone"
                            label="Phone"
                            form={form}
                            placeholder=""
                            type="tel"
                            required
                            errorReserve
                        />
                    </form>

                    {/* <FormDisplay label='Full Name' value='Tirth Rojara' /> */}
                    {/* <FormDisplay label='Email' value='tirthrojara@gmail.com' /> */}
                </CardContent>
            </Card>
        </>
    );
}
