"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUp, Upload, X } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useDropzone } from "react-dropzone";
import { useAppSelector } from "@/store/index.store";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

const formSchema = z.object({
    resume: z
        .instanceof(File, { message: "Please upload a resume." })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: "File size should be less than 10MB.",
        })
        .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
            message: "Only PDF files are accepted.",
        }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Resume() {
    // const [previewName, setPreviewName] = useState<string | null>(null);
    // const fileInputRef = useRef<HTMLInputElement>(null);

    // 2. Initialize Form
    // const form = useForm<FormValues>({
    //     resolver: zodResolver(formSchema),
    //     mode: "onChange",
    // });

    // 3. Handle File Selection
    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         setPreviewName(file.name);
    //         form.setValue("resume", file, { shouldValidate: true }); // Update form state manually
    //     }
    // };

    // const handleRemoveFile = () => {
    //     setPreviewName(null);
    //     form.setValue("resume", undefined as any, { shouldValidate: true });
    //     if (fileInputRef.current) {
    //         fileInputRef.current.value = "";
    //     }
    // };

    // const onSubmit = (data: FormValues) => {
    //     console.log("File ready to submit:", data.resume);
    //     // API call here: const formData = new FormData(); formData.append('resume', data.resume);
    // };

    // const [file, setFile] = useState<File | null>(null);

    const role = useAppSelector((state) => state.app.role);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    });

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length === 0) return;

            form.setValue("resume", acceptedFiles[0], {
                shouldValidate: true,
            });
        },
        [form],
    );

    const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
        onDrop,
        accept: { "application/pdf": [".pdf"] },
        multiple: false,
        maxSize: MAX_FILE_SIZE,
    });

    const removeFile = () => {
        form.resetField("resume");
    };

    const resumeFile = form.watch("resume");

    return (
        <Card className="max-w-4xl w-full py-4">
            <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                <CardTitle className=" md:text-lg">Resume / CV</CardTitle>
                {role === "CANDIDATE" && <Button variant={"outline"}>Save</Button>}
            </CardHeader>
            <CardContent className=" px-4 flex flex-col gap-4">
                <Form {...form}>
                    <form className="w-full space-y-4">
                        <FormField
                            control={form.control}
                            name="resume"
                            render={() => (
                                <FormItem>
                                    <FormControl>
                                        {/* Custom Dropzone UI */}

                                        <div
                                            {...getRootProps()}
                                            className={cn(
                                                "relative min-h-[227.2px] flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition-all cursor-pointer",

                                                isDragActive && "border-primary bg-primary/5",

                                                isDragReject && "border-destructive bg-destructive/5",

                                                form.formState.errors.resume && "border-destructive bg-destructive/5",

                                                !isDragActive &&
                                                    !isDragReject &&
                                                    !form.formState.errors.resume &&
                                                    "border-muted-foreground/25 hover:bg-muted/5",
                                            )}
                                        >
                                            <input {...getInputProps()} />

                                            <div
                                                className={cn(
                                                    "mb-4 rounded-full p-3 transition-colors",
                                                    isDragActive
                                                        ? "bg-primary/10 text-primary"
                                                        : "bg-muted/50 text-muted-foreground",
                                                )}
                                            >
                                                <FileUp className="h-6 w-6" />
                                            </div>

                                            <h3 className="mb-1 text-lg font-semibold">
                                                {isDragReject
                                                    ? "Invalid file"
                                                    : isDragActive
                                                      ? "Drop your resume here"
                                                      : "Upload your resume"}
                                            </h3>

                                            <p className="mb-6 text-sm text-muted-foreground">
                                                {isDragReject
                                                    ? "Only PDF files up to 10MB are allowed"
                                                    : isDragActive
                                                      ? "Release to upload your PDF"
                                                      : "PDF files up to 10MB"}
                                            </p>

                                            {!resumeFile && !isDragActive && (
                                                <Button type="button">
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    Choose File
                                                </Button>
                                            )}

                                            {resumeFile && (
                                                <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm">
                                                    <span className="text-emerald-600 font-medium max-w-[180px] truncate">
                                                        {resumeFile.name}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeFile();
                                                        }}
                                                        className="text-muted-foreground hover:text-destructive"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </FormControl>

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
