import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React from "react";
import Messages from "./messages";
import { ScrollArea } from "@/components/ui/scroll-area";
import TypeBar from "./type-bar";

export default function MessageBox() {
    return (
        <div className="h-[calc(100vh-73px)] w-full">
            {/* top-bar */}
            <div className="bg-white w-full p-3">
                <div className="flex items-center gap-3   ">
                    <Avatar className=" size-18 ">
                        <AvatarFallback className="bg-amber-200 text-2xl font-semibold">
                            WJ
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                        <p className="text-2xl font-semibold">
                            William Johanson
                        </p>
                    </div>
                </div>
            </div>

            {/* messages */}
            <div>
                <ScrollArea className=" h-168 rounded-md border-0  scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                    <Messages />
                </ScrollArea>
            </div>
            <div>
                <TypeBar />
            </div>
        </div>
    );
}
