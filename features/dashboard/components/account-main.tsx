import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ghost, MoveLeft } from "lucide-react";
import React from "react";
import AccountTab from "./account-tab";

const role = "RECRUITER";

export default function AccountMain() {
    return (
        <div className="">
            <div className="flex gap-4 items-center p-3 sm:p-6">
                <Button variant={"ghost"} className=" [&_svg]:size-5">
                    <MoveLeft className="size-5" />
                </Button>
                <h1 className=" font-semibold text-3xl">Account Setting</h1>
            </div>
            {/* ------------ */}
            <div>
                {/* -------------- */}
                <div className="w-full max-w-7xl mx-auto p-6">
                    <Tabs defaultValue="account" className="w-full">
                        <TabsList className="flex w-full justify-start rounded-none border-b bg-transparent p-0">
                            <TabsTrigger
                                value="account"
                                className="flex-none w-auto relative h-10 rounded-none border-b-2 border-b-transparent !bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-primary data-[state=active]:shadow-none hover:text-primary "
                            >
                                Account
                            </TabsTrigger>

                            {role === "RECRUITER" && (
                                <TabsTrigger
                                    value="subscription"
                                    // KEY FIXES: Same as above
                                    className="flex-none w-auto relative h-10 rounded-none border-b-2 border-b-transparent !bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-primary data-[state=active]:shadow-none hover:text-primary"
                                >
                                    Manage Subscription
                                </TabsTrigger>
                            )}
                        </TabsList>

                        <TabsContent value="account" className="mt-6">
                            <AccountTab />
                        </TabsContent>

                        {role === "RECRUITER" && (
                            <TabsContent value="subscription" className="mt-6">
                                <div className="p-4 border rounded-lg bg-slate-50">
                                    <h3 className="text-lg font-medium">
                                        Subscription Plan
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        View and update your billing
                                        information.
                                    </p>
                                </div>
                            </TabsContent>
                        )}
                    </Tabs>
                </div>
                {/* ------------- */}
            </div>
        </div>
    );
}
