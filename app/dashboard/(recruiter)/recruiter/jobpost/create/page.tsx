import Header from "@/features/dashboard/recruiter/jobpost/create/components/header";
import JobDetails from "@/features/dashboard/recruiter/jobpost/create/components/job-details";

export default function Page() {
    return (
        <>
            {/* <h1>JobPost create page</h1> */}
            <div className="flex flex-col justify-centers items-center gap-6 px-4 py-6">
                {/* <Header /> */}
                <JobDetails />
            </div>
        </>
    );
}
