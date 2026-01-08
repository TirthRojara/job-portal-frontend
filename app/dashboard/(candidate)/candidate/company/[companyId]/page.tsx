import About from "@/features/dashboard/recruiter/company/components/about";
import Industry from "@/features/dashboard/recruiter/company/components/industry";
import Location from "@/features/dashboard/recruiter/company/components/location";
import MainCard from "@/features/dashboard/recruiter/company/components/main-card";

export default async function Page({
    params,
}: {
    params: Promise<{ companyId: string }>;
}) {
    const { companyId } = await params;
    console.log({ companyId });

    return (
        <>
            <div className="flex flex-col items-center gap-6 justify-center px-4 py-6 ">
                <MainCard />
                <About />
                <Industry />
                <Location />
            </div>
        </>
    );
}
