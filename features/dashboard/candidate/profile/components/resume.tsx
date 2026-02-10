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
import { useGetCandidateResume } from "../api/query";
import { isPending } from "@reduxjs/toolkit";
import { formSchema, FormValues, MAX_FILE_SIZE } from "../api/types";
import { useUploadResume } from "../api/mutation";

export default function Resume() {
    const role = useAppSelector((state) => state.app.role);

    const { data: resume, error: resumeError, isError: resumeIsError, isPending: resumePending } = useGetCandidateResume();

    const { mutate: resumeMutate, isPending: isResumeUploading } = useUploadResume();

    // console.log("resume data header \n", resume?.headers["content-disposition"]);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    });

    const { isDirty } = form.formState;

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length === 0) return;

            form.setValue("resume", acceptedFiles[0], {
                shouldDirty: true,
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

    // const removeFile = () => {
    //     form.resetField("resume");
    // };

    const downloadFile = (url: string, fileName: string) => {
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
    };

    const handleResumeDownload = () => {
        console.log("download click");

        // If user just dropped a file → download local file
        if (resumeFile) {
            const url = URL.createObjectURL(resumeFile);
            downloadFile(url, resumeFile.name);
            URL.revokeObjectURL(url);

            return;
        }

        // Otherwise download from backend
        if (resume) {
            const blob = resume.data; // Blob
            const fileName = resume.headers["content-disposition"];

            const url = URL.createObjectURL(blob);
            downloadFile(url, fileName);

            URL.revokeObjectURL(url);
        }
    };

    const onsubmit = (data: FormValues) => {
        console.log("submit", data);

        resumeMutate(
            {
                payload: { cv: data.resume },
            },
            {
                onSuccess: () => {
                    form.reset(form.getValues(), {
                        keepDirty: false,
                    });
                },
            },
        );
    };

    const resumeFile = form.watch("resume");

    if (resumePending) return <></>;
    if (resumeIsError && resumeError?.status !== 404) return <></>;

    const chooseFileCondition = !resumeFile && !isDragActive && resumeIsError && resumeError.status === 404;

    return (
        <Card className="max-w-4xl w-full py-4">
            <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                <CardTitle className=" md:text-lg">Resume / CV</CardTitle>
                {role === "CANDIDATE" && isDirty && (
                    <Button onClick={form.handleSubmit(onsubmit)} variant={"outline"}>
                        Save
                    </Button>
                )}
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

                                            {chooseFileCondition && (
                                                <Button type="button">
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    Choose File
                                                </Button>
                                            )}

                                            {(resumeFile || resume) && (
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // stop dropzone click
                                                        e.preventDefault();
                                                        handleResumeDownload();
                                                    }}
                                                    className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm"
                                                >
                                                    <span className="text-emerald-600 font-medium max-w-[180px] truncate">
                                                        {resumeFile
                                                            ? resumeFile.name
                                                            : resume
                                                              ? resume.headers["content-disposition"]
                                                              : "No resume"}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        className="text-muted-foreground hover:text-destructive"
                                                    >
                                                        {/* <X
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                // removeFile();
                                                            }}
                                                            className="h-4 w-4 cursor-pointer"
                                                        /> */}
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
