// components/message-card.tsx
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

export type Chat = {
    name: string;
    company: string;
    role: string;
    message: string;
    timeAgo: string;
};

type ChatCardProps = {
    chat: Chat;
};

export function ChatCard({ chat }: ChatCardProps) {
    const { name, company, role, message, timeAgo } = chat;

    return (
        // <Card className="w-full max-w-2xl mx-auto border-none bg-slate-50">
        <Card className="w-full max-w-3xl mx-auto py-4 gap-3  hover:bg-secondary">
            <CardHeader className="flex flex-row items-start justify-between gap-3 pb-1 px-4">
                {/* Left: avatar + name/company/role */}
                <div className="flex items-start gap-3 min-w-0">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-sm sm:text-base font-medium shrink-0">
                        {name.charAt(0)}
                        {name.charAt(5)}
                        {/* WM */}
                    </div>

                    <div className="min-w-0">
                        <CardTitle className="text-sm sm:text-base font-semibold leading-tight">
                            {name}
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                            {company} 
                        </CardDescription>
                    </div>
                </div>

                {/* Right: time */}
                <span className="text-xs sm:text-sm text-muted-foreground shrink-0">
                    {timeAgo}
                </span>
            </CardHeader>

            <CardContent className="pt-1 px-4">
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3">
                    {message}
                </p>
            </CardContent>
        </Card>
    );
}
