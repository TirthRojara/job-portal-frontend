import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React from "react";
import Messages from "./messages";
import { ScrollArea } from "@/components/ui/scroll-area";
import TypeBar from "./type-bar";

export default function MessageBox() {
    return (
        <div className="flex flex-col h-[calc(100vh-73px)] w-full overflow-hidden">
            {/* top-bar */}
            <div className="bg-white w-full p-3 shadow-2xl flex-none z-10">
                <div className="flex items-center gap-3   ">
                    <Avatar className=" md:size-15 size-12 ">
                        <AvatarFallback className="bg-emerald-200 text-white md:text-2xl text-lg font-semibold">
                            WJ
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                        <p className="md:text-2xl text-lg  font-semibold">
                            William Johanson
                        </p>
                    </div>
                </div>
            </div>

            {/* messages */}
            <div className="flex-1 min-h-0 ">
                <ScrollArea className=" h-full w-full rounded-md border-0  scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                    <Messages />
                </ScrollArea>
            </div>

            {/* typing bar */}
            <div className="flex-none ">
                <TypeBar />
            </div>
        </div>
    );
}
