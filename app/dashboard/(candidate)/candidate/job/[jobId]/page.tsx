
import JobDescription from "@/features/dashboard/recruiter/jobpost/[jobId}/components/job-description";
import JobDetailsTop from "@/features/dashboard/recruiter/jobpost/[jobId}/components/job-details-top";

export default async function Page({
    params,
}: {
    params: Promise<{ jobId: string }>;
}) {
    const { jobId } = await params;
    console.log({ jobId });

    return (
        <>
             <div className="flex flex-col justify-centers items-center gap-6 px-4 py-6">
                <JobDetailsTop />
                <JobDescription />
             </div>
        </>
    );
}
