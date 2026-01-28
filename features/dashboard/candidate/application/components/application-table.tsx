import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { ApplicationResponse } from "../api/types";
import { formatShortDate } from "@/lib/utils/utils";
import { useAppSelector } from "@/store/index.store";

type ApplicationData = {
    company: string;
    profile: string;
    appliedOn: string;
    applicants: number;
    status: "Not selected" | "Selected" | "In Progress";
};

const applications: ApplicationData[] = [
    {
        company: "Lunacal",
        profile: "Software Development Internship",
        appliedOn: "3 Sep' 25",
        applicants: 3711,
        status: "Not selected",
    },
    {
        company: "Piesoft Technologies Private Limited sdfjdskflsd sldfjsdllsdjf",
        profile: "Front End Development Internship sdfdsfsfldsj   slfjlsdjflsd fsdjflllfjdlsfjdlfjlfjsdlfs",
        appliedOn: "1 Sep' 25",
        applicants: 4869,
        status: "Not selected",
    },
    {
        company: "Infoware",
        profile: "Node.js Development Internship",
        appliedOn: "27 Aug' 25",
        applicants: 324,
        status: "Not selected",
    },
    {
        company: "Brihat Infotech Private Limited",
        profile: "Full Stack Development Internship",
        appliedOn: "5 Aug' 25",
        applicants: 3944,
        status: "Not selected",
    },
    {
        company: "KIRAN VENTURES",
        profile: "ReactJS Development Internship",
        appliedOn: "5 Aug' 25",
        applicants: 3432,
        status: "Not selected",
    },
    {
        company: "Xinterview",
        profile: "ReactJS Development Internship",
        appliedOn: "5 Aug' 25",
        applicants: 2356,
        status: "Not selected",
    },
    {
        company: "Zdminds",
        profile: "Web Development Internship",
        appliedOn: "5 Aug' 25",
        applicants: 1219,
        status: "Not selected",
    },
    {
        company: "CloudActive Labs India Private Limited",
        profile: "Full Stack Development Internship",
        appliedOn: "25 Jul' 25",
        applicants: 2160,
        status: "Not selected",
    },
];

export default function ApplicationTable({ tableData }: { tableData: ApplicationResponse[] }) {
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
        <div className="w-full border rounded-lg bg-white shadow-sm  max-w-7xl ">
            <Table>
                <TableHeader className="bg-muted">
                    <TableRow className="hover:bg-transparent border-b border-gray-100">
                        {/* HEADERS: Uppercase, smaller font, lighter color to match reference */}
                        <TableHead className="w-[250px] py-5  font-semibold tracking-wider text-gray-500 uppercase pl-6">
                            Company
                        </TableHead>
                        <TableHead className="w-[340px] py-5  font-semibold tracking-wider text-gray-500 uppercase">
                            Profile
                        </TableHead>
                        <TableHead className="w-[150px] py-5  font-semibold tracking-wider text-gray-500 uppercase">
                            Applied On
                        </TableHead>
                        {/* <TableHead className="w-[150px] py-5  font-semibold tracking-wider text-gray-500 uppercase">
                            <p>Number of</p>
                            <p>Applicants</p>
                        </TableHead> */}
                        <TableHead className="w-[200px] text-right py-5  font-semibold tracking-wider text-gray-500 uppercase pr-6">
                            Application Status
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableData.map((data, index) => (
                        <TableRow key={index} className="border-b border-gray-100 hover:bg-gray-50/50">
                            {/* Company Name: Dark text, extra vertical padding */}
                            <TableCell className="py-6 font-medium text-gray-700 align-top pl-6">
                                <div
                                    onClick={() => handleCompanyClick(data.company.id)}
                                    className="whitespace-normal truncate line-clamp-2 max-w-[220px] hover:text-blue-600 hover:underline cursor-pointer"
                                >
                                    {data.company.name}
                                </div>
                            </TableCell>

                            {/* Profile: Fixed width allows wrapping, blue icon matches reference */}
                            <TableCell className="py-6 align-top">
                                <div className="flex justify-between gap-2 pr-6">
                                    <span className=" w-[240px] text-gray-700 leading-snug  whitespace-normal truncate line-clamp-2">
                                        {data.job.title}
                                    </span>
                                    <ExternalLink onClick={()=> handleJobLinkClick(data.job.id)} className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0 cursor-pointer hover:text-blue-600" />
                                </div>
                            </TableCell>

                            {/* Date */}
                            <TableCell className="py-6 text-gray-600 align-top">{formatShortDate(data.applyDate)}</TableCell>

                            {/* Applicants Count */}
                            {/* <TableCell className="py-6 text-gray-600 align-top">
                                {app.applicants}
                            </TableCell> */}

                            {/* Status Badge: Custom gray background to match design */}
                            <TableCell className="py-6 text-right align-top pr-6">
                                <Badge
                                    variant="secondary"
                                    className="bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full px-4 py-1 font-normal text-sm"
                                >
                                    {data.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
