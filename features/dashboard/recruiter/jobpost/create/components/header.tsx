import { Button } from "@/components/ui/button";
import { Save, Send } from "lucide-react";
import React from "react";

export default function Header() {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between max-w-3xl w-full sm:items-center gap-5">
            <div className="flex flex-col">
                <p className="text-2xl font-bold">Create New Post</p>
                <p>Post a new position to attract top talent</p>
            </div>
            <div className="sm:flex sm:gap-3 sm:block hidden">
                <Button variant={"outline"} className="bg-muted">
                    <Save />
                    Save as Draft
                </Button>
                <Button>
                    <Send />
                    Post Job
                </Button>
            </div>
        </div>
    );
}
