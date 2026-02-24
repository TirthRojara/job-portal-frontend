import React from "react";
import ChatList from "./chat-list";
import MessageBox from "./message-box";
import EmptyChatState from "./empty-chat-state";
import { chatListResponse } from "./api/api";

// export type ActiveChat = {
//     candidateProfileId: number;
//     companyId: number;
//     chatRoomId: string;
//     messages: {
//         content: string;
//         senderId: number;
//         createdAt: string;
//     }[];
//     candidateProfile: {
//         fullName: string;
//     };
// };

export default function ChatPageRecruiter() {
    // const [activeChat, setActiveChat] = useState<ActiveChat | null>(null);

    return (
        // <div className="flex h-[calc(100vh-73px)] border-0 border-red-500 w-full">
        // {/* <div className="flex-1 w-full"> */}
        // {/* <ChatList onSelectChat={setActiveChat} /> */}
        // {/* </div> */}

        // {activeChat === null ? <EmptyChatState /> : <MessageBox chat={activeChat} />}
        // {/* <EmptyChatState />  */}
        // </div>

        <EmptyChatState />
    );
}
