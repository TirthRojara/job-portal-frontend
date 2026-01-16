import React from "react";
import ChatListCard from "./chat-list-card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatList() {
    return (
        <div className="flex-1">
            <ScrollArea className=" h-[calc(100vh-73px)] w-full rounded-md border  scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                <div className="sm:max-w-sm max-w-5xl min-w-sm w-full flex flex-col gap-1 h-[calc(100vh-73px)]  ">
                    <ChatListCard />
                    <ChatListCard />
                    <ChatListCard />
                    <ChatListCard />
                    <ChatListCard />
                    <ChatListCard />
                    <ChatListCard />
                    <ChatListCard />
                    <ChatListCard />
                    <ChatListCard />
                    <ChatListCard />
                    <ChatListCard />
                    <ChatListCard />
                    <ChatListCard />
                    <ChatListCard />
                    <ChatListCard />
                    <ChatListCard />
                    <ChatListCard />
                </div>
            </ScrollArea>
        </div>
    );
}
