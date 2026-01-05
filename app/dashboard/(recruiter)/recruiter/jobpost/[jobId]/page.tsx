// import { useParams } from "next/navigation";

export default async function Page({
    params,
}: {
    params: Promise<{ jobId: string }>;
}) {
    const { jobId } = await params;
    console.log({ jobId });

    return (
        <>
            <h1>job Post: {jobId}</h1>
        </>
    );
}
