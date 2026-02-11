'use client';
import { Button } from "@/components/ui/button";
import { FileUser, PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const role = "RECRUITER";

export default function Header({jobId}: {jobId: string}) {

    const router = useRouter()

    return (
        role === "RECRUITER" && (
            <div className="flex justify-between w-full max-w-4xl">
                <div>
                    <Button
                    onClick={()=> router.push(`/dashboard/recruiter/jobpost/${jobId}/applicants`)}
                    variant={"outline"}>
                        <FileUser />
                        View Applicants
                    </Button>
                </div>
                <div>
                    <Button onClick={()=> router.push(`/dashboard/recruiter/jobpost/${jobId}/edit`)}>
                        <PencilLine />
                        Edit
                    </Button>
                </div>
            </div>
        )
    );
}

