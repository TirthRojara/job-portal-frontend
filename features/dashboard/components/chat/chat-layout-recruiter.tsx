import React from "react";
import { ActiveChat } from "./chat-page-recruiter";
import ChatList from "./chat-list";

export default function ChatLayoutRecruiter({ children }: { children: React.ReactNode }) {
    // const [activeChat, setActiveChat] = useState<ActiveChat | null>(null);

    return (
        <div className="flex h-[calc(100vh-73px)] border-0 border-red-500 w-full">
            <ChatList />

            {/* here i want to pass children */}

            {children}
        </div>
    );
}
