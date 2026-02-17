import React from "react";
import { ArrowUp, Pause, Play, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

// Define the valid variants
export type SubscriptionActionVariant = "upgrade" | "pause" | "resume" | "cancel";

interface SubscriptionActionCardProps {
    variant: SubscriptionActionVariant;
    className?: string;
    onAction?: () => void;
    // Optional overrides if you want to change text dynamically
    title?: string;
    description?: string;
    buttonText?: string;
    isActive?: boolean; // For the "Already Active" state shown in your image
}

export function SubscriptionActionCard({
    variant,
    className,
    onAction,
    title,
    description,
    buttonText,
    isActive = false,
}: SubscriptionActionCardProps) {
    // Configuration map for styles and default content based on variant
    const config = {
        upgrade: {
            icon: ArrowUp,
            defaultTitle: "Upgrade Plan",
            defaultDesc: "Get access to premium features and unlimited job posts",
            defaultButtonText: "Upgrade Now",
            // Using Teal/Primary tones to match image
            colors: {
                iconBg: "bg-primary/30 dark:bg-primary/30",
                iconText: "text-primary dark:text-teal-400",
                button: "bg-primary hover:bg-primary/90 text-white",
            },
        },
        pause: {
            icon: Pause,
            defaultTitle: "Pause Subscription",
            defaultDesc: "Temporarily pause your billing without losing data",
            defaultButtonText: "Pause Billing",
            // Using Yellow/Amber tones
            colors: {
                iconBg: "bg-amber-100 dark:bg-amber-900/30",
                iconText: "text-amber-600 dark:text-amber-400",
                button: "bg-amber-500 hover:bg-amber-600 text-white",
            },
        },
        resume: {
            icon: Play,
            defaultTitle: "Resume Subscription",
            defaultDesc: "Continue your subscription and restore full access",
            defaultButtonText: "Resume Subscription",
            // Using Green/Emerald tones
            colors: {
                iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
                iconText: "text-emerald-600 dark:text-emerald-400",
                button: "bg-emerald-500 hover:bg-emerald-600 text-white",
            },
        },
        cancel: {
            icon: XCircle,
            defaultTitle: "Cancel Subscription",
            defaultDesc: "Terminate your subscription at the end of the billing cycle",
            defaultButtonText: "Cancel Plan",
            // Using Red/Destructive tones
            colors: {
                iconBg: "bg-red-100 dark:bg-red-900/30",
                iconText: "text-red-600 dark:text-red-400",
                button: "bg-red-600 hover:bg-red-700 text-white",
            },
        },
    };

    const currentConfig = config[variant];
    const Icon = currentConfig.icon;

    // Logic to handle the "Already Active" state seen in your image
    // const isButtonDisabled = isActive;
    // const finalButtonText = isActive
    //     ? "Already Active"
    //     : buttonText || currentConfig.defaultButtonText;
    const finalButtonClass = isActive
        ? "bg-emerald-400/50 text-white cursor-not-allowed hover:bg-emerald-400/50" // Faded style for active
        : currentConfig.colors.button;

    return (
        <Card className={cn("w-full max-w-sm shadow-sm ", className)}>
            <CardHeader className="flex flex-col items-center pb-0 pt-0">
                <div
                    className={cn(
                        "h-14 w-14 rounded-full grid place-items-center mx-auto transition-colors",
                        currentConfig.colors.iconBg,
                    )}
                >
                    <Icon className={cn("h-6 w-6", currentConfig.colors.iconText)} />
                </div>
            </CardHeader>

            <CardContent className="flex flex-col items-center text-center gap-2 pb-0">
                <h3 className="text-lg font-bold text-foreground">{title || currentConfig.defaultTitle}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[250px]">
                    {description || currentConfig.defaultDesc}
                </p>
            </CardContent>

            <CardFooter className="w-full pt-0 pb-0 px-6">
                <Button
                    onClick={onAction}
                    disabled={isActive}
                    className={cn(
                        "w-full font-semibold transition-all",
                        currentConfig.colors.button,
                        isActive && "opacity-50 cursor-not-allowed",
                    )}
                    // className={cn(
                    //     "w-full font-semibold transition-all",
                    //     finalButtonClass
                    // )}
                >
                    {/* {finalButtonText} */}
                    {currentConfig.defaultButtonText}
                </Button>
            </CardFooter>
        </Card>
    );
}

export default SubscriptionActionCard;
