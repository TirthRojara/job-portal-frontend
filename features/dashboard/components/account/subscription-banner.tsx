import React from "react";
import { Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function SubscriptionBanner() {
    return (
        <div className="w-full bg-primary text-primary-foreground rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
            {/* Left Side: Icon, Plan Name, Price */}
            <div className="flex items-center gap-4">
                {/* Icon Box */}
                <div className="bg-primary-foreground/20 h-12 w-12 flex items-center justify-center rounded-lg backdrop-blur-sm">
                    <Crown className="h-6 w-6" />
                </div>

                {/* Plan Details */}
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-xl font-bold tracking-tight">
                            Pro Plan
                        </h2>
                        {/* Custom styled shadcn Badge to match image aesthetics */}
                        <Badge
                            variant="outline"
                            className="border-none bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/25 px-2 py-0.5 text-xs font-medium rounded-full"
                        >
                            Active
                        </Badge>
                    </div>
                    <div className="flex items-baseline">
                        <span className="text-3xl font-extrabold mr-1">
                            $29
                        </span>
                        <span className="text-sm opacity-80 font-medium">
                            /month
                        </span>
                    </div>
                </div>
            </div>

            {/* Right Side: Billing Details Columns */}
            {/* Using CSS Grid for easy responsive 3-column layout on mobile */}
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto md:flex md:gap-8 text-left md:text-right">
                <DetailColumn label="Billing Cycle" value="Monthly" />
                <DetailColumn label="Next Payment" value="2/9/2026" />
            </div>
        </div>
    );
}

// Helper component for the detail columns to ensure consistent styling
function DetailColumn({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col">
            <span className="text-sm opacity-80 mb-1">{label}</span>
            <span className="text-base font-bold leading-tight">{value}</span>
        </div>
    );
}
export default SubscriptionBanner;
