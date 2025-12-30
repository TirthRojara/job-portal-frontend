import { useState } from "react";
import { Pencil } from "lucide-react"; // or whatever icon library you use
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FormSelect } from "@/components/custom-form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Mock data for dropdowns (you would likely fetch this)
const PROFICIENCY_LEVELS = ["Basic", "Fluent", "Native"];

type langData = {
    name: string;
    level: string;
};

const PersonalDetailSchema = z.object({
    level: z.enum(["Basic", "Fluent", "Native"], {
        error: "Please select level",
    }),
});

type PersonalDetails = z.infer<typeof PersonalDetailSchema>;

// This component accepts the language object you are editing as a prop
export function EditLanguageDialog({
    languageData,
}: {
    languageData: langData;
}) {
    const form = useForm<PersonalDetails>({
        resolver: zodResolver(PersonalDetailSchema),
        defaultValues: {
            level: "Fluent",
        },
        mode: "onChange",
        reValidateMode: "onChange",
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-gray-900"
                >
                    <Pencil className="h-4 w-4 dark:text-white" />
                    <span className="sr-only">Edit language</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Language</DialogTitle>
                    <DialogDescription>
                        Update your proficiency level
                    </DialogDescription>
                </DialogHeader>


                <FormSelect
                    control={form.control}
                    name="level"
                    label="English"
                    placeholder="Select"
                    errorReserve
                >
                    <SelectItem key="Basic" value="Basic">
                        Basic
                    </SelectItem>
                    <SelectItem key="Fluent" value="Fluent">
                        Fluent
                    </SelectItem>
                    <SelectItem key="Native" value="Native">
                        Native
                    </SelectItem>
                </FormSelect>

                <DialogFooter>
                    {form.formState.isDirty && (
                        <DialogClose asChild>
                            <Button type="submit">Save changes</Button>
                        </DialogClose>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
