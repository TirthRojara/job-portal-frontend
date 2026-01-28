import React from "react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Users, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ApplicationResponse } from "../api/types";
import { formatShortDate } from "@/lib/utils/utils";
import { useAppSelector } from "@/store/index.store";

export default function ApplicationCard({ tableData }: { tableData: ApplicationResponse }) {
    const role = useAppSelector((state) => state.app.role);

    const handleCompanyClick = (companyID: number) => {
        if (role === "CANDIDATE") {
            window.open(`/dashboard/candidate/company/${companyID}`, "_blank", "noopener,noreferrer");
        }
    };

    const handleJobLinkClick = (jobID: number) => {
        if (role === "CANDIDATE") {
            window.open(`/dashboard/candidate/job/${jobID}`, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <Card className="w-full min-w-xs p-4 ">
            <CardContent className="p-0">
                {/* Company Name */}
                <h3 onClick={() => handleCompanyClick(tableData.company.id)} className="text-xl font-bold text-gray-900 mb-1">
                    {tableData.company.name}
                </h3>

                {/* Profile Name + Link Icon */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-gray-600 text-[15px]">{tableData.job.title}</span>
                    <ExternalLink
                        onClick={() => handleJobLinkClick(tableData.job.id)}
                        className="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-600"
                    />
                </div>

                {/* Status Badge (Without the '?') */}
                <div className="mb-6">
                    <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full px-3 py-1 font-normal text-sm"
                    >
                        {tableData.status}
                    </Badge>
                </div>

                {/* Metadata Footer: Applicants & Date */}
                <div className="flex gap-6 text-gray-500 text-sm">
                    {/* <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>3711 Applicants</span>
                    </div> */}
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Applied on {formatShortDate(tableData.applyDate)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
