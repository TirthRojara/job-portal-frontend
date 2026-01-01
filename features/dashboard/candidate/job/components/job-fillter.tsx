"use client";
import { FormInputGroup, FormSelect } from "@/components/custom-form";
import { CustomSlider } from "@/components/custom-slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, SearchIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const role = 'CANDIDATE'
// const role = 'RECRUITER'

const PersonalDetailSchema = z.object({
    filter: z.string({ error: "Required" }).min(1, "Required"),
    location: z.string({ error: "Required" }).min(1, "Required").optional(),
    workplace: z
        .enum(["ONSITE", "REMOTE", "HYBRID"], {
            error: "Please select workplace",
        })
        .optional(),
    salaryMin: z.number({ error: "Required" }).min(1, "Required").optional(),
});

type PersonalDetails = z.infer<typeof PersonalDetailSchema>;

export default function JobFillter() {
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
        <Card className=" md:w-sm p-4">
            <form>
                <FormInputGroup
                    control={form.control}
                    name="filter"
                    label=""
                    form={form}
                    icon={SearchIcon}
                    placeholder={role === 'CANDIDATE' ? "Search Jobs..." : "Fillter your jobs"}
                    required
                    errorReserve
                    className="mt-[-9px]"
                />

                <FormInputGroup
                    control={form.control}
                    name="location"
                    label=""
                    form={form}
                    icon={MapPin}
                    placeholder="Location"
                    required
                    errorReserve
                />

                <FormSelect
                    control={form.control}
                    name="workplace"
                    label=""
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

                <CustomSlider
                    defaultValue={[200]}
                    max={1000}
                    // className="salary-slider" // Use this class if applying the CSS override above
                    className="mt-3"
                    label="Salary"
                />

                <Button className="w-full mt-5">Search</Button>
            </form>
        </Card>
    );
}
