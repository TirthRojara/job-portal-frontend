import { Button } from "@/components/ui/button";
import About from "@/features/dashboard/recruiter/company/components/about";
import Industry from "@/features/dashboard/recruiter/company/components/industry";
import Location from "@/features/dashboard/recruiter/company/components/location";
// import Empty from "@/features/dashboard/recruiter/company/components/empty";
import MainCard from "@/features/dashboard/recruiter/company/components/main-card";
import { PencilLine } from "lucide-react";

export default function Page() {
    return (
        // when there is no company detail feel. ex- just sign up
        // <div className="flex justify-center h-[calc(100vh_-_74px)] items-center   gap-6 px-4 py-6 ">
        //     <div className="flex w-full">
        //         <Empty />
        //     </div>
        // </div>

        <div className="flex min-h-screen flex-col items-center gap-6 px-4 py-6 ">
            <div className="flex w-full max-w-5xl justify-between">
                <div>
                    <h2 className="font-semibold text-2xl sm:text-3xl">
                        Company Profile
                    </h2>
                    <p className="text-muted-foreground">
                        Manage your company information and branding
                    </p>
                </div>
                <div>
                    <Button>
                        <PencilLine /> Edit
                    </Button>
                </div>
            </div>
            <div className="w-full flex flex-col items-center gap-6 justify-center">
                <MainCard />
                <About />
                <Industry />
                <Location />
            </div>
        </div>
    );
}
