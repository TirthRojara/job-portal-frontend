'use client';
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export const test = () => {
    return (
        <>
            <main className=" flex min-h-screen flex-col items-center p-24 gap-2">
                <h1 className=" h-full flex text-red-500 text-3xl border-2">
                    Test!
                </h1>
                <div className=" flex gap-2">
                    <Button
                        variant={"outline"}
                        onClick={() => toast.success("successfull sooner")}
                    >
                        success
                    </Button>
                    <Button
                        onClick={() => toast.info("info sooner")}
                    >
                        info
                    </Button>
                    <Button
                        onClick={() => toast.warning("warning sooner")}
                    >
                        warning
                    </Button>
                    <Button
                        onClick={() => toast.error("error sooner")}
                    >
                        error
                    </Button>
                    {/* <Button
                        onClick={() => toast.info("info sooner")}
                    >
                        info
                    </Button> */}
                </div>
                {/* <Image src='/recruiter-bg.png' alt="candidate" width={64} height={64} /> */}
                <User className="size-20" />
            </main>
        </>
    );
};

export default test;
