"use client";

import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { Send, SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSocket } from "@/provider/socket/socket.context";
import { useParams } from "next/navigation";

// Define the form data structure
type FormValues = {
    message: string;
};

export default function ChatInput({ chatId }: { chatId: number }) {
    const params = useParams();
    const chatRoomId = params.chatroomId as string;
    const socket = useSocket();
    const { register, handleSubmit, reset, setFocus } = useForm<FormValues>();

    const [_, companyIdStr, candidateIdStr] = chatRoomId.split("_");

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        if (data.message.trim().length === 0) return;
        console.log("Message sent:", data.message);

        if (!socket) {
            console.log("Connecting to chat...");
            return;
        }

        // socket.emit("sendMessage", { chatRoomId, message: { content: data.message } }, (response: any) => {
        socket.emit("sendMessage", { chatRoomId, chatId, message: { content: data.message } }, (response: any) => {
            if (response?.error) {
                alert("Message send failed: " + response.error);
            }
        });

        reset();
        // Optional: Focus back on input after sending
        setTimeout(() => setFocus("message"), 10);
    };

    // Handle Enter key to submit (Shift+Enter for new line)
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    return (
        <div className="flex w-full items-center justify-center px-4  md:px-7 py-3">
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-7xl items-end gap-2">
                {/* Input Wrapper - Grows with text */}
                <div className="flex gap-2 border-0 border-red-500 items-end relative flex-1 rounded-2xl bg-white dark:bg-card shadow-sm pl-3 pr-2 py-1">
                    <TextareaAutosize
                        {...register("message")}
                        onKeyDown={handleKeyDown}
                        minRows={1}
                        maxRows={6} // Limits height before scrollbar appears
                        placeholder="Type a message"
                        className={cn(
                            " border-red-500 flex w-full resize-none rounded-2xl border-0 bg-transparent px-3 py-3 text-base text-gray-900 dark:text-white dark:placeholder:text-white/50 placeholder:text-gray-500 focus:ring-0 focus:outline-none focus-visible:ring-0",
                            // Custom Scrollbar Styling to match Shadcn/WhatsApp look
                            "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400",
                        )}
                        style={{
                            // Explicit inline styles to ensure scrollbar customization works in all environments
                            scrollbarWidth: "thin",
                            scrollbarColor: "#cbd5e1 transparent",
                        }}
                    />

                    {/* Send Button - Anchored to bottom (items-end in parent) */}
                    <Button
                        type="submit"
                        size="icon"
                        className="mb-1 h-10 w-10 shrink-0 rounded-xl shadow-sm transition-all  active:scale-95"
                    >
                        <SendHorizontal className=" h-5 w-5" />
                        <span className="sr-only">Send</span>
                    </Button>
                </div>
            </form>
        </div>
    );
}
