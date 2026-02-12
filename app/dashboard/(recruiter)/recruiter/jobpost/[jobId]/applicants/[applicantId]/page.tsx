import ApplicantsProfilePage from "@/features/dashboard/recruiter/jobpost/[jobId]/applicants/[applicantId]/components/applicants-profile-page";

export default async function Page({ params }: { params: Promise<{ applicantId: string; jobId: string }> }) {
    const { applicantId, jobId } = await params;


    return (
        <>
            <ApplicantsProfilePage applicantId={applicantId} jobId={jobId} />
        </>
    );
}
