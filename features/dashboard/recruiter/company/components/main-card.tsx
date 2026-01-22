import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar, Eye, ExternalLink, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { CompanyApiResponse } from "../api/types";

// export type ICompany = {
//     name?: string;
//     location?: string;
//     websiteUrl?: string;
//     totalEmployees?: number;
//     establishedDate?: string;
//     isApproved?: boolean;
//     views?: number;
// };

interface MainCardProps {
    companyDetails: CompanyApiResponse;
}

const MainCard = ({ companyDetails }: MainCardProps) => {

    const dateString = companyDetails.establishedDate
    const year = new Date(dateString!).getFullYear();

    return (
        <Card className="w-full max-w-5xl  overflow-hidden bg-white shadow-sm border-slate-100">
            <CardContent className="">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Logo Section */}
                    <div className="shrink-0">
                        <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm border border-slate-100">
                            {/* Placeholder for the logo based on the image colors */}
                            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="100" height="100" fill="white" />
                                <path d="M50 50 L50 10 A40 40 0 0 0 10 50 Z" fill="#EF4444" /> {/* Red Top Left */}
                                <path d="M50 50 L90 50 A40 40 0 0 0 50 10 Z" fill="#EAB308" /> {/* Yellow Top Right */}
                                <path d="M50 50 L50 90 A40 40 0 0 0 90 50 Z" fill="#10B981" /> {/* Green Bottom Right */}
                                <path d="M50 50 L10 50 A40 40 0 0 0 50 90 Z" fill="#1E293B" /> {/* Dark Bottom Left */}
                                <circle cx="50" cy="50" r="12" fill="#F87171" /> {/* Center Dot */}
                            </svg>
                        </div>
                    </div>

                    {/* Main Content Section */}
                    <div className="flex-1 flex flex-col gap-4 w-full">
                        {/* Header: Title & Badge */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{companyDetails.name}</h2>
                            {companyDetails.isApproved && (
                                <Badge
                                    variant="secondary"
                                    className="w-fit bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-0 px-2 py-0.5 gap-1 font-medium"
                                >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    Verified
                                </Badge>
                            )}
                        </div>

                        {/* Meta Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row gap-y-3 gap-x-8 text-slate-500 text-sm">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-teal-600/80" />
                                <span>{companyDetails.location}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-teal-600/80" />
                                <span>{companyDetails.totalEmployees} employees</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-teal-600/80" />
                                {/* <span>Est. 2015</span> */}
                                <span>Est. {year}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4 text-teal-600/80" />
                                <span>{companyDetails.views} views</span>
                            </div>
                        </div>

                        {/* Action Link */}
                        {companyDetails.websiteUrl && (
                            <div className="pt-1">
                                <Link
                                    href="#"
                                    className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm group transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    Visit Website
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default MainCard;
