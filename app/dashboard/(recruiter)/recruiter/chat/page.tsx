import ChatList from "@/features/dashboard/components/chat/chat-list";
import EmptyChatState from "@/features/dashboard/components/chat/empty-chat-state";
import MessageBox from "@/features/dashboard/components/chat/message-box";
import React from "react";

export default function Page() {
    return (
        <div className="flex h-[calc(100vh-73px)] border-0 border-red-500 w-full">
            {/* <div className="flex-1 w-full"> */}
                <ChatList />
            {/* </div> */}
            <MessageBox />
            {/* <EmptyChatState />  */} 
        </div>
    );
}
