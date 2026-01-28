"use client";

import SavedJobPage from "@/features/dashboard/candidate/savedjob/components/saved-job-page";


export default function Page() {
    // const [currentPage, setCurrentPage] = useState(1);
    // const totalPages = 10;

    return (
        // <>
        //     <div className="flex flex-col justify-centers items-center gap-6 px-4 py-6">
        //         <JobPreviewCard jobData={jobData} />
        //         <JobPreviewCard jobData={jobData} />
        //         <JobPreviewCard jobData={jobData} />
        //         <JobPreviewCard jobData={jobData} />
                

        //         <PaginationBar
        //             currentPage={currentPage}
        //             totalPages={totalPages}
        //             totalItems={100}
        //             pageSize={10}
        //             onPageChange={setCurrentPage}
        //         />
        //     </div>
        // </>

        <SavedJobPage />
    );
}
