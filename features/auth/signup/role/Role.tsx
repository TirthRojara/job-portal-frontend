"use client";

import Image from "next/image";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type Role = "candidate" | "recruiter";

export default function Role() {
    const [role, setRole] = useState<Role>("candidate");

    const handleContinue = () => {
        console.log("continue with google as:", role);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted dark:from-background dark:to-muted px-4">
            <Card className="w-full max-w-3xl shadow-lg border bg-card/90 border-border/70 backdrop-blur-sm">
                <div className="px-6 pt-8 pb-4 text-center sm:px-10">
                    <h1 className="text-xl font-semibold tracking-tight text-foreground">
                        <span className="font-bold">EasyApply</span>
                    </h1>

                    <h2 className="mt-6 text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                        Finish your account setup
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Choose how you want to use JobPortal.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {/* Candidate card */}
                        <button
                            type="button"
                            onClick={() => setRole("candidate")}
                            className={cn(
                                "group relative flex flex-col items-center rounded-xl border px-6 py-6 text-left transition-all focus:outline-none",
                                "bg-card hover:shadow-md",
                                role === "candidate"
                                    ? "border-primary shadow-md ring-1 ring-primary/50"
                                    : "border-border"
                            )}
                        >
                            {role === "candidate" && (
                                <span className="absolute right-4 top-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                                    <Check />
                                </span>
                            )}

                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-sm overflow-hidden">
                                <Image
                                    src="/candidate-bg.png"
                                    alt="Candidate"
                                    width={64}
                                    height={64}
                                    className="object-contain"
                                />
                            </div>

                            <div className="text-center">
                                <p className="text-base font-semibold text-foreground">
                                    Candidate
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Find jobs and build your career.
                                </p>
                            </div>
                        </button>

                        {/* Recruiter card */}
                        <button
                            type="button"
                            onClick={() => setRole("recruiter")}
                            className={cn(
                                "group relative flex flex-col items-center rounded-xl border px-6 py-6 text-left transition-all focus:outline-none",
                                "bg-card hover:shadow-md",
                                role === "recruiter"
                                    ? "border-primary shadow-md ring-1 ring-primary/50"
                                    : "border-border"
                            )}
                        >
                            {role === "recruiter" && (
                                <span className="absolute right-4 top-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                                    <Check />
                                </span>
                            )}

                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-sm overflow-hidden">
                                <Image
                                    src="/recruiter-bg.png"
                                    alt="Recruiter"
                                    width={64}
                                    height={64}
                                    className="object-contain"
                                />
                            </div>

                            <div className="text-center">
                                <p className="text-base font-semibold text-foreground">
                                    Recruiter
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Post jobs and hire talent.
                                </p>
                            </div>
                        </button>
                    </div>

                    <div className="mt-8">
                        <Button
                            className="w-full h-11 text-sm font-medium flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={handleContinue}
                        >
                            Continue with Google
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
