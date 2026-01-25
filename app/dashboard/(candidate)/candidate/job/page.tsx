import Job from "@/features/dashboard/candidate/job/components/job";

export default function Page() {
    return (
        <>
            {/* <h1>Job page</h1> */}
            {/* <div className="flex flex-col-reverse sm:flex-row gap-6 px-6 py-6 justify-center">
                <div className="flex flex-col gap-4">
                    <JobPreviewCard />
                    <JobPreviewCard />
                    <JobPreviewCard />
                    <JobPreviewCard />
                    <JobPreviewCard />
                   <JobPreviewCardSkeleton />
                </div>
                <div className="flex flex-col sm:sticky sm:top-25 sm:self-start  ">
                    <JobFillter />
                </div>
            </div> */}
            <Job />
        </>
    );
}
