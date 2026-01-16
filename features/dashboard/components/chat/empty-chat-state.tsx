import { MessageSquare, MessagesSquare } from "lucide-react";

export default function EmptyChatState() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-background p-8 text-center animate-in fade-in-50">
            {/* Icon Container with subtle background blob */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50">
                <MessagesSquare className="h-10 w-10 text-muted-foreground" />
            </div>

            {/* Main Text */}
            <h3 className="mt-6 text-xl font-semibold tracking-tight">
                Select a conversation
            </h3>

            {/* Subtext */}
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                Choose a contact from the sidebar to start messaging or view
                your conversation history.
            </p>
        </div>
    );
}
