"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React, { useEffect } from "react";
import Messages from "./messages";
import { ScrollArea } from "@/components/ui/scroll-area";
import TypeBar from "./type-bar";
import { ActiveChat } from "./chat-page-recruiter";
import { useAppSelector } from "@/store/index.store";
import { useSocket } from "@/provider/socket.provider";
import { useParams } from "next/navigation";

// export default function MessageBox({ chat }: { chat: ActiveChat }) {
export default function MessageBox() {
    const params = useParams();
    const chatRoomId = params.chatroomId as string;

    const socket = useSocket();

    const token = useAppSelector((state) => state.app.accessToken);
    const activeChat = useAppSelector((state) => state.app.activeChat);

    const [_, companyIdStr, candidateIdStr] = chatRoomId.split("_");

    const companyId = Number(companyIdStr);
    const candidateProfileId = Number(candidateIdStr);

    useEffect(() => {
        if (!socket) return;

        // 🔵 Join room
        socket.emit("joinChat", { token, companyId, candidateProfileId });

        // 🔵 Listen for new message
        // const handleNewMessage = (newMessage: any) => {
        // queryClient.setQueryData(["chat", chatRoomId], (oldData: any) => {
        //     if (!oldData) return oldData;

        //     return {
        //         ...oldData,
        //         messages: [...(oldData.messages || []), newMessage],
        //     };
        // });
        // };

        // socket.on("newMessage", handleNewMessage);

        socket.on("error", (error) => {
            alert("Socket error: " + error);
        });

        // return () => {
        //     socket.disconnect();
        // };

        return () => {
            // 🔴 Leave room
            socket.emit("leaveChat", { companyId, candidateProfileId });

            // socket.off("newMessage", handleNewMessage);
        };
        // }, [socket, companyId, candidateProfileId, chatRoomId, queryClient]);
    }, [socket, companyId, candidateProfileId, chatRoomId]);

    return (
        <div className="flex flex-col h-[calc(100vh-73px)] w-full overflow-hidden">
            {/* top-bar */}
            <div className="bg-white dark:bg-card w-full p-3 shadow-2xl flex-none z-10">
                <div className="flex items-center gap-3   ">
                    <Avatar className=" md:size-15 size-12 ">
                        <AvatarFallback className="bg-blue-400 text-white md:text-2xl text-lg font-semibold">WJ</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                        <p className="md:text-2xl text-lg  font-semibold">William Johanson</p>
                    </div>
                </div>
            </div>

            {/* messages */}
            <div className="flex-1 min-h-0 ">
                <ScrollArea className=" h-full w-full rounded-md border-0  scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                    <Messages chat={activeChat!} /> {/* ======================================================*/}
                </ScrollArea>
            </div>

            {/* typing bar */}
            <div className="flex-none ">
                <TypeBar />
            </div>
        </div>
    );
}
