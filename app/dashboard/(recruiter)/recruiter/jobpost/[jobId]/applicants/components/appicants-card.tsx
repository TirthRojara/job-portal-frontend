import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin } from "lucide-react";

export default function ApplicantsCard() {
    return (
        <Card className="w-full max-w-4xl transition-all hover:shadow-xl ">
            <CardHeader className="flex flex-row items-start justify-between pb-0 space-y-0">
                {/* Left side: Avatar + Name/Title */}
                <div className="flex items-center space-x-4">
                    <Avatar className="h-11 w-11 rounded-xl">
                        {/* We use AvatarFallback because there is no image URL, just initials.
                Custom coloring applied to match the design. */}
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-bold text-2xl rounded-xl">
                            TR
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold text-blue-600 leading-none">
                            Alex Johnson
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Senior Frontend Developer
                        </p>
                    </div>
                </div>

                {/* Right side: Date */}
                <span className="text-sm text-muted-foreground whitespace-nowrap ml-auto pl-4">
                    Applied 1d ago
                </span>
            </CardHeader>

            <CardContent>
                {/* Location Row */}
                <div className="flex items-center text-muted-foreground mt-0">
                    <MapPin className="h-4 w-4 mr-1.5 shrink-0" />
                    <span className="text-sm font-medium">New York, USA</span>
                </div>

                {/* Description/Bio */}
                <p className="mt-4 text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    Expert in React, TypeScript, and Tailwind. Previously led
                    frontend at FinTech startup andd there is some more about i
                    would like to work on backend but i know frontend as well. I
                    am full stack Developer. I would like to build full stack application.
                    Expert in React, TypeScript, and Tailwind. Previously led
                    frontend at FinTech startup andd there is some more about i
                    would like to work on backend but i know frontend as well. I
                    am full stack Developer. I would like to build full stack application.
                    Expert in React, TypeScript, and Tailwind. Previously led
                    frontend at FinTech startup andd there is some more about i
                    would like to work on backend but i know frontend as well. I
                    am full stack Developer. I would like to build full stack application.
                </p>
            </CardContent>
        </Card>
    );
}
