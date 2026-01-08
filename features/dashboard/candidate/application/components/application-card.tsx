import React from "react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Users, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ApplicationCard() {
  return (
    <Card className="w-full p-4 ">
      <CardContent className="p-0">
        {/* Company Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-1">Lunacal</h3>

        {/* Profile Name + Link Icon */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-gray-600 text-[15px]">
            Software Development Internship
          </span>
          <ExternalLink className="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-600" />
        </div>

        {/* Status Badge (Without the '?') */}
        <div className="mb-6">
          <Badge 
            variant="secondary" 
            className="bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full px-3 py-1 font-normal text-sm"
          >
            Not selected
          </Badge>
        </div>

        {/* Metadata Footer: Applicants & Date */}
        <div className="flex gap-6 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>3711 Applicants</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Applied on 3 Sep' 25</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}