// import { IconBell } from "@tabler/icons-react"
import { MessageSquareText, RefreshCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";

export function EmptyChat() {
    return (
        // <Empty className="bg-blue-300 ">
        <Empty className="bg-muted  h-full flex flex-col items-center justify-center">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <MessageSquareText />
                </EmptyMedia>
                <EmptyTitle>No Chats</EmptyTitle>
                <EmptyDescription>New chats will appear here.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button variant="outline" size="sm">
                    <RefreshCcwIcon />
                    Refresh
                </Button>
            </EmptyContent>
        </Empty>
    );
}
