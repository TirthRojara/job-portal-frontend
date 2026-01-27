import { Dice1, Eye } from "lucide-react";
import React from "react";
import { useGetJobViewById } from "../api/query";

export default function ViewCount({ jobId }: { jobId: number }) {
    const { data, isLoading, isError } = useGetJobViewById(jobId);

    if(isLoading) return <></>
    if(isError) return <></>

    return (
        <>
            <Eye className="h-4 w-4 " />
            <p>{data?.data?.totalViews}</p>
        </>
    );
}
