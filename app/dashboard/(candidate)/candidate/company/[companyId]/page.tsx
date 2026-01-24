import Company from "@/features/dashboard/candidate/company/components/company";

export default async function Page({ params }: { params: Promise<{ companyId: string }> }) {
    const { companyId } = await params;
    console.log({ companyId });

    return (
        <>
            <Company companyId={Number(companyId)}/>
        </>
    );
}
