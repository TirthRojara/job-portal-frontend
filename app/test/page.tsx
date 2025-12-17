import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Image from "next/image";

export const test = () => {
    return (
        <>
            <main className=" flex min-h-screen flex-col items-center p-24 gap-2">
                <h1 className=" h-full flex text-red-500 text-3xl border-2">
                    Test!
                </h1>
                <div className=" flex gap-2">
                    {/* <Button className="bg-emerald-100" variant={"outline"}>
                        Full-time
                    </Button> */}
                    {/* <Button variant={"outline"}>View</Button> */}
                    {/* <Button className="bg-emerald-600">Quick Apply</Button> */}
                    <Button  variant={"outline"}>View</Button>
                    {/* <Button>Quick Apply</Button> */}
                </div>
                {/* <Image src='/recruiter-bg.png' alt="candidate" width={64} height={64} /> */}
                <User className="size-20"/>
            </main>
        </>
    );
};

export default test;
