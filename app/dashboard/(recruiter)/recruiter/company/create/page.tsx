import CompanyDetailsEdit from "@/features/dashboard/recruiter/company/edit/components/company-details-edit";
import IndustryEdit from "@/features/dashboard/recruiter/company/edit/components/industry-edit";


export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center w-full gap-6 px-4 py-6 ">
            <CompanyDetailsEdit />
            {/* <IndustryEdit /> */}
        </div>
    );
}
