import JobIdPage from "@/features/dashboard/candidate/job/[jobId]/components/job-id-page";

export default async function Page({
    params,
}: {
    params: Promise<{ jobId: string }>;
}) {
    const { jobId } = await params;
    console.log({ jobId });

    return (
        <>
            <JobIdPage jobId={jobId} />
             {/* <div className="flex flex-col justify-centers items-center gap-6 px-4 py-6">
                <JobDetailsTop />
                <JobDescription />
             </div> */}
        </>
    );
}
