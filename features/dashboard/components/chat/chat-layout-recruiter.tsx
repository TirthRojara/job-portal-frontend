import React from "react";
import ChatList from "./chat-list";

export default function ChatLayoutRecruiter({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-[calc(100vh-73px)] border-0 border-red-500 w-full">
            <ChatList />

            {children}
        </div>
    );
}
