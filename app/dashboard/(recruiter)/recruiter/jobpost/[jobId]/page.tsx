import JobpostIdPage from "@/features/dashboard/recruiter/jobpost/[jobId]/components/jobpost-id-page";


export default async function Page({ params }: { params: Promise<{ jobId: string }> }) {
    const { jobId } = await params;

    return (
        <>
            <JobpostIdPage jobId={jobId} />
        </>
    );
}
