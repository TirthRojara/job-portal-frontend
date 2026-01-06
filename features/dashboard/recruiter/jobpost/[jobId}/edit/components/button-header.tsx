import { Button } from "@/components/ui/button";
import { Save, Send, Trash2 } from "lucide-react";
import React from "react";

export default function ButtonHeader() {
    return (
        <div className="max-w-3xl w-full flex justify-between gap-3">
            <div>
                <Button variant={"destructive"} className="">
                    <Trash2 />
                    Delete
                </Button>
            </div>
            <div className="flex gap-3">
                <Button variant={"outline"} className="bg-muted">
                    <Save />
                    Save Draft
                </Button>
                <Button>
                    <Send />
                    Post Job
                </Button>
            </div>
        </div>
    );
}
