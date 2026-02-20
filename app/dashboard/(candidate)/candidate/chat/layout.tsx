import ChatLayoutCandidate from "@/features/dashboard/components/chat/chat-layout-candidate";
import React from "react";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return <ChatLayoutCandidate>{children}</ChatLayoutCandidate>;
}
