import { useEffect, useState } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FormSelect } from "@/components/custom-form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateLanguageLevel } from "../../api/mutation";
import { Level } from "../../api/types";

// Mock data for dropdowns (you would likely fetch this)
// const PROFICIENCY_LEVELS = ["Basic", "Fluent", "Native"];

// type langData = {
//     languageName: string;
//     level: string;
// };

const LanguageLevelSchema = z.object({
    // level: z.enum(["Basic", "Fluent", "Native"], {
    level: z.enum(Level, {
        error: "Please select level",
    }),
});

type LanguageLevelFormData = z.infer<typeof LanguageLevelSchema>;

// This component accepts the language object you are editing as a prop
export function EditLanguageDialog({ languageName, level }: { languageName: string; level: Level }) {
    const [open, setOpen] = useState(false);

    const { mutate, isPending } = useUpdateLanguageLevel();

    const form = useForm<LanguageLevelFormData>({
        resolver: zodResolver(LanguageLevelSchema),
        defaultValues: {
            level: level,
        },
        mode: "onChange",
        reValidateMode: "onChange",
    });

    useEffect(() => {
        if (open) {
            form.reset({ level: level });
        }
    }, [open, level, form]);

    function onSubmit(data: LanguageLevelFormData) {
        mutate({
            languageName,
            payload: { level: data.level },
        });

        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900">
                    <Pencil className="h-4 w-4 dark:text-white" />
                    <span className="sr-only">Edit language</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Language</DialogTitle>
                    <DialogDescription>Update your proficiency level</DialogDescription>
                </DialogHeader>

                <form>
                    <FormSelect control={form.control} name="level" label={languageName} placeholder="Select" errorReserve>
                        <SelectItem key="Basic" value={Level.BASIC}>
                            Basic
                        </SelectItem>
                        <SelectItem key="Fluent" value={Level.FLUENT}>
                            Fluent
                        </SelectItem>
                        <SelectItem key="Native" value={Level.NATIVE}>
                            Native
                        </SelectItem>
                    </FormSelect>
                </form>

                <DialogFooter>
                    {form.formState.isDirty && (
                        <Button onClick={form.handleSubmit(onSubmit)} type="submit" disabled={isPending}>
                            Save changes
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
