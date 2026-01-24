'use client';
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Empty() {
  const router = useRouter();

  return (
    <Card className="w-full max-w-md mx-auto border shadow-sm">
      <CardContent className="flex flex-col items-center text-center pt-12 pb-12 px-6">
        {/* Icon Circle */}
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Building2 className="w-10 h-10 text-gray-400" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          No Company Profile Yet
        </h2>

        {/* Description Text */}
        <p className="text-gray-500 mb-8 leading-relaxed max-w-xs mx-auto">
          Create your company profile to start posting jobs and attracting top
          talent. Add your company details, images, and showcase what makes your
          organization unique.
        </p>

        {/* Action Button */}
        <Button 
          className="bg-[#00897B] hover:bg-[#00796B] text-white font-medium px-6 py-2 h-auto text-base"
          onClick={() => router.push("/dashboard/recruiter/company/create")}
        >
          <Plus className="mr-2 h-5 w-5" />
          Create Company Profile
        </Button>
      </CardContent>
    </Card>
  );
}