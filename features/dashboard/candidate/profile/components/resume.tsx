"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUp, Upload, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

// 1. Define Zod Schema
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

const formSchema = z.object({
    resume: z
        .instanceof(File, { message: "Please upload a file." })
        .refine(
            (file) => file.size <= MAX_FILE_SIZE,
            `File size should be less than 10MB.`
        )
        .refine(
            (file) => ACCEPTED_FILE_TYPES.includes(file.type),
            "Only .pdf files are accepted."
        ),
});

type FormValues = z.infer<typeof formSchema>;

export default function Resume() {
    const [previewName, setPreviewName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 2. Initialize Form
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    });

    // 3. Handle File Selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewName(file.name);
            form.setValue("resume", file, { shouldValidate: true }); // Update form state manually
        }
    };

    const handleRemoveFile = () => {
        setPreviewName(null);
        form.setValue("resume", undefined as any, { shouldValidate: true });
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const onSubmit = (data: FormValues) => {
        console.log("File ready to submit:", data.resume);
        // API call here: const formData = new FormData(); formData.append('resume', data.resume);
    };
    return (
        <Card className="max-w-4xl w-full py-4">
            <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                <CardTitle className=" md:text-lg">Resume / CV</CardTitle>
                <Button variant={"outline"}>
                    Save
                </Button>
            </CardHeader>
            <CardContent className=" px-4 flex flex-col gap-4">


                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="resume"
                            render={({
                                field: { value, onChange, ...fieldProps },
                            }) => (
                                <FormItem>
                                    <FormControl>
                                        {/* Custom Dropzone UI */}
                                        <div
                                            className={cn(
                                                "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition-colors",
                                                form.formState.errors.resume
                                                    ? "border-destructive/50 bg-destructive/5"
                                                    : "border-muted-foreground/25 hover:bg-muted/5"
                                            )}
                                        >
                                            <div className="mb-4 rounded-full bg-muted/50 p-3">
                                                <FileUp className="h-6 w-6 text-muted-foreground" />
                                            </div>

                                            <h3 className="mb-1 text-lg font-semibold">
                                                Upload your resume
                                            </h3>
                                            <p className="mb-6 text-sm text-muted-foreground">
                                                PDF files up to 10MB
                                            </p>

                                            {/* Hidden Native Input */}
                                            <input
                                                {...fieldProps}
                                                ref={fileInputRef}
                                                type="file"
                                                accept=".pdf"
                                                className="hidden"
                                                onChange={(event) => {
                                                    handleFileChange(event);
                                                    // Don't call onChange from RHF here, we handled it manually with setValue
                                                }}
                                            />

                                            <div className="flex items-center gap-4">
                                                <Button
                                                    type="button"
                                                    onClick={() =>
                                                        fileInputRef.current?.click()
                                                    }
                                                    // className="bg-emerald-600 font-medium text-white hover:bg-emerald-700"
                                                >
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    {previewName
                                                        ? "Change File"
                                                        : "Choose File"}
                                                </Button>

                                                {/* Show selected file with remove option */}
                                                {previewName && (
                                                    <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm">
                                                        <span className="text-emerald-600 font-medium max-w-[150px] truncate">
                                                            {previewName}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={
                                                                handleRemoveFile
                                                            }
                                                            className="text-muted-foreground hover:text-destructive"
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </FormControl>

                                    {/* Validation Error Message */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
