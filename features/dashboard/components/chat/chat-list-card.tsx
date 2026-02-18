import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import React from "react";

export default function ChatListCard() {
    return (
        <Card className="px-2 py-3 shadow-none border-none hover:bg-muted hover:border hover:shadow-sm rounded-none ">
            <div className="flex items-center gap-3   ">
                <Avatar>
                    <AvatarFallback>WJ</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                    <p className="font-semibold">William Johanson</p>
                    <p className="text-muted-foreground truncate line-clamp-1 whitespace-normal">
                        hey you will be in touched. we will contact you later.
                    </p>
                </div>
            </div>
        </Card>
    );
}
