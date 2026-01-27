
import React from "react";
import { useGetJobIdSkill } from "../api/query";
import { Badge } from "@/components/ui/badge";

export default function JobSkill({jobId}: {jobId: number}) {

    const { data, isLoading, isError} = useGetJobIdSkill(jobId)

    if(isLoading) return <>loading skills</>
    if(isError) return <p className="text-destructive">Error</p>
    if(data?.data?.length === 0) return <></>

    console.log('job skill data' , data)

    return (
        <div className="flex flex-col gap-4">
            <h2 className=" md:text-lg font-semibold">Required skills</h2>
            <div className="flex gap-2 flex-wrap">
                {data?.data!.map((skill) => (
                    <Badge key={skill.id} className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm group cursor-pointer">
                        {skill.name}
                    </Badge>
                ))}
            </div>
        </div>
    );
}
