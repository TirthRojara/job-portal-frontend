"use client";
import React, { useEffect } from "react";
import ChatListCard from "./chat-list-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetChatListForCandidate, useGetChatListForRecruiter } from "./api/query";
import { useAppSelector } from "@/store/index.store";
import { useGetUserData } from "../../api/query";
import { Spinner } from "@/components/ui/spinner";
import { ActiveChat } from "./chat-page-recruiter";
import { useInView } from "react-intersection-observer";

// const chatData: ActiveChat = {
//     candidateProfileId: 20,
//     companyId: 26,
//     chatRoomId: "chat_26_20",
//     messages: [{ content: "hi", senderId: 5, createdAt: "2026-01-17T16:40:05.000Z" }],
//     candidateProfile: {
//         fullName: "Tom holand",
//     },
// };

// type ChatListProps = {
// onSelectChat: (value: ActiveChat | null) => void;
// export default function ChatList({ onSelectChat }: ChatListProps) {

export default function ChatList() {
    const role = useAppSelector((state) => state.app.role);

    const { ref, inView } = useInView({
        delay: 100,
        rootMargin: "0px 0px 150px 0px", // Pre-fetch 150px before bottom
    });

    const { data: user, isPending, isError } = useGetUserData();

    const {
        data: chatListRecruiter,
        isPending: isChatListPendingRecruiter,
        isError: isChatListErrorRecruiter,
        error: chatListErrorRecruiter,
        fetchNextPage: fetchNextPageRecruiter,
        hasNextPage: hasNextPageRecruiter,
        isFetchingNextPage: isFetchingNextPageRecruiter,
    } = useGetChatListForRecruiter(role, 15, user?.data?.companyId!);

    const {
        data: chatListCandidate,
        isPending: isChatListPendingCandidate,
        isError: isChatListErrorCandidate,
        error: chatListErrorCandidate,
        fetchNextPage: fetchNextPageCandidate,
        hasNextPage: hasNextPageCandidate,
        isFetchingNextPage: isFetchingNextPageCandidate,
    } = useGetChatListForCandidate(role, 15);

    const isCandidate = role === "CANDIDATE";
    const isRecruiter = role === "RECRUITER";

    const activeData = isCandidate ? chatListCandidate : isRecruiter ? chatListRecruiter : undefined;
    const activeError = isCandidate ? chatListErrorCandidate : isRecruiter ? chatListErrorRecruiter : undefined;
    const activePending = isCandidate ? isChatListPendingCandidate : isRecruiter ? isChatListPendingRecruiter : true;
    const activeFetchNextPage = isCandidate
        ? fetchNextPageCandidate
        : isRecruiter
          ? fetchNextPageRecruiter
          : () => Promise.resolve();
    const activeHasNextPage = isCandidate ? hasNextPageCandidate : isRecruiter ? hasNextPageRecruiter : false;
    const activeIsFetchingNextPage = isCandidate
        ? isFetchingNextPageCandidate
        : isRecruiter
          ? isFetchingNextPageRecruiter
          : false;

    useEffect(() => {
        if (inView && activeHasNextPage) {
            activeFetchNextPage();
        }
    }, [inView, activeHasNextPage, activeFetchNextPage]);

    useEffect(() => {
        console.log("inView:", inView);
    }, [inView]);

    if (activePending) {
        return (
            <div className="flex-1 ">
                <ScrollArea className="h-full md:h-[calc(100vh-73px)] w-full rounded-md border  scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                    <div className="md:max-w-sm max-w-5xl min-w-sm w-full flex flex-col gap-1 h-[calc(100vh-73px)] justify-center items-center text-xl ">
                        <Spinner className="size-8" />
                    </div>
                </ScrollArea>
            </div>
        );
    }

    if (activeError?.status === 404) {
        return (
            <div className="flex-1 ">
                <ScrollArea className="h-full md:h-[calc(100vh-73px)] w-full rounded-md border  scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                    {/* <div className="md:max-w-sm max-w-5xl min-w-sm w-full flex flex-col gap-1 h-[calc(100vh-73px)]  "> */}
                    <div className="md:max-w-sm max-w-5xl min-w-sm w-full flex flex-col gap-1 h-[calc(100vh-73px)] justify-center items-center text-xl ">
                        <p>You don't have any chats yet.</p>
                    </div>
                </ScrollArea>
            </div>
        );
    }

    const chatListPage = activeData?.pages.flatMap((page) => page.data) ?? [];

    return (
        <div className="flex-1 ">
            <ScrollArea className="h-full md:h-[calc(100vh-73px)] w-full rounded-md border  scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                {/* <div className="md:max-w-sm max-w-5xl min-w-sm w-full flex flex-col gap-1 h-[calc(100vh-73px)]  "> */}
                <div className="md:max-w-sm max-w-5xl min-w-sm w-full flex flex-col gap-1  ">
                    {/* {chatList?.data?.map((chat) => (
                        <ChatListCard key={chat.chatRoomId} chatData={chat} />
                    ))} */}
                    {chatListPage.map((chat) => (
                        <ChatListCard key={chat?.chatRoomId} chatData={chat!} />
                    ))}

                    {!activeIsFetchingNextPage && activeHasNextPage && <div ref={ref} className="h-4 w-full bg-transparent" />}

                    {activeIsFetchingNextPage && (
                        <div className="flex justify-center py-4">
                            <Spinner className="size-6" />
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}
