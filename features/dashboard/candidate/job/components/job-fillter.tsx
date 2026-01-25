"use client";
import { FormInputGroup, FormSelect } from "@/components/custom-form";
import { CustomSlider } from "@/components/custom-slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SelectItem } from "@/components/ui/select";
import { WorkPlace } from "@/features/dashboard/recruiter/jobpost/api/types";
import { useAppSelector } from "@/store/index.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, SearchIcon } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

// const role = "CANDIDATE";

const FilterSchema = z.object({
    filter: z.string().optional(),
    location: z.string().optional(),
    workplace: z.enum(WorkPlace).optional(),
    salaryMin: z.number().optional(),
});

export type FilterValues = z.infer<typeof FilterSchema>;

interface JobFilterProps {
    onSearch?: (filters: FilterValues) => void;
    defaultValues?: FilterValues;
}

export default function JobFillter({ onSearch, defaultValues }: JobFilterProps) {
    const role = useAppSelector((state) => state.app.role);

    const form = useForm<FilterValues>({
        resolver: zodResolver(FilterSchema),
        // defaultValues: {
        //     filter: "",
        //     location: "",
        //     workplace: undefined,
        //     salaryMin: undefined,
        // },
        defaultValues: defaultValues || {},
        mode: "onChange",
        reValidateMode: "onChange",
    });

    function handleSearch(data: FilterValues) {
        console.log({ data });
        console.log("Search clicked");

        if (onSearch) {
            onSearch(data);
        }
    }

    return (
        <Card className=" md:w-sm p-4">
            <form onSubmit={form.handleSubmit(handleSearch)}>
                <FormInputGroup
                    control={form.control}
                    name="filter"
                    label=""
                    form={form}
                    icon={SearchIcon}
                    placeholder={role === "CANDIDATE" ? "Search Jobs..." : "Fillter your jobs"}
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

                <FormSelect control={form.control} name="workplace" label="" placeholder="Select workplace" errorReserve>
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

                <Controller
                    control={form.control}
                    name="salaryMin"
                    render={({ field }) => (
                        <CustomSlider
                            step={10}
                            defaultValue={[defaultValues?.salaryMin || 0]}
                            max={1000}
                            // className="salary-slider" // Use this class if applying the CSS override above
                            className="mt-3"
                            label="Salary"
                            onValueChange={(value) => {
                                field.onChange(value[0]); // ✅ number[] → number
                            }}
                        />
                    )}
                />

                <Button className="w-full mt-5" type="submit">
                    Search
                </Button>
            </form>
        </Card>
    );
}
