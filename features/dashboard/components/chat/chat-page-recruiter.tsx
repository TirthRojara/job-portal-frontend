import React from "react";
import ChatList from "./chat-list";
import MessageBox from "./message-box";
import EmptyChatState from "./empty-chat-state";

export default function ChatPageRecruiter() {
    return (
        <div className="flex h-[calc(100vh-73px)] border-0 border-red-500 w-full">
            {/* <div className="flex-1 w-full"> */}
            <ChatList />
            {/* </div> */}
            {/* <MessageBox /> */}
            <EmptyChatState /> 
        </div>
    );
}
