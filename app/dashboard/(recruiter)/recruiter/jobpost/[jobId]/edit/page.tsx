import ButtonHeader from "@/features/dashboard/recruiter/jobpost/[jobId]/edit/components/button-header";
import JobDetails from "@/features/dashboard/recruiter/jobpost/create/components/job-details";
import React from "react";

export default function Page() {
    return (
        <div className="flex flex-col justify-centers items-center gap-6 px-4 py-6">
            <ButtonHeader />
            <JobDetails />
        </div>
    );
}
