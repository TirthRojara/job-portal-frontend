"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import PasswordHandleCard from "./password-handle-card";

export default function AccountTab() {
    return (
        <div className="flex flex-col gap-6">
            <div className="w-full max-w-md ">
                <Card className="shadow-sm  ">
                    <CardContent className="px-6">
                        <div className="flex flex-col w-full gap-2">
                            {/* The Label */}
                            <Label className="text-sm font-medium text-muted-foreground">
                                Current Email
                            </Label>

                            <div className="w-full max-w-full min-h-[40px] font-medium items-start rounded-md border border-input bg-muted px-3 py-2 text-sm leading-relaxed break-all">
                                work.amazon.hr.team.123456@amazon.com
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            {/* ----------------------------------- */}
            <div>
                <PasswordHandleCard />
            </div>
        </div>
    );
}
