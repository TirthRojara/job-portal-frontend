import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type ProfileCompletionCardProps = {
    name?: string;
    value?: number; // 0-100
};

export default function ProfileCompletionCard({
    name = "John",
    value = 85,
}: ProfileCompletionCardProps) {
    return (
        <div className="px-4 py-6">
            <Card className="w-full w-full mx-auto border-none bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white p-5 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* Left side */}
                    <div className="flex-1 min-w-0">
                        <CardHeader className="p-0 mb-3">
                            <CardTitle className="text-xl sm:text-2xl font-semibold">
                                Welcome back, {name}!
                            </CardTitle>
                            <CardDescription className="text-sm sm:text-base text-emerald-50/90">
                                Your profile is {value}% complete
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-0">
                            <Progress
                                value={value}
                                className="h-2 bg-white/30 mt-2 mb-4 [&>div]:bg-white"
                            />

                            {/* <Button
              variant="secondary"
              className="rounded-full px-5 py-2 text-sm font-medium text-emerald-600 bg-white hover:bg-slate-100"
            > */}
                            <Button variant={"secondary"}>
                                Complete Profile
                            </Button>
                        </CardContent>
                    </div>

                    {/* Right side (no image, just text hint on desktop) */}
                    {/* <div className="hidden sm:flex sm:flex-col sm:items-end sm:justify-center sm:w-52">
          <p className="text-xs sm:text-sm text-emerald-50/90 text-right">
            Keep completing your details to get better job matches.
          </p>
        </div> */}
                </div>
            </Card>
        </div>
    );
}
