import { Button } from "@/components/ui/button";
import { FileUser, PencilLine } from "lucide-react";
import React from "react";

const role = "RECRUITER";

export default function Header() {
    return (
        role === "RECRUITER" && (
            <div className="flex justify-between w-full max-w-4xl">
                <div>
                    <Button variant={"outline"}>
                        <FileUser />
                        View Applicants
                    </Button>
                </div>
                <div>
                    <Button>
                        <PencilLine />
                        Edit
                    </Button>
                </div>
            </div>
        )
    );
}
