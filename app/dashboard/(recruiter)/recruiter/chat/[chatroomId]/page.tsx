"use client";

import MessageBox from "@/features/dashboard/components/chat/message-box";
import { useParams } from "next/navigation";

export default function ChatRoomPage() {
    const params = useParams();
    const chatroomId = params.chatroomId as string;

    return <MessageBox />;
}
