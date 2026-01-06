import React from "react";
import ApplicantsCard from "./components/appicants-card";

export default function Page() {
    return (
        <div className="flex flex-col justify-centers items-center gap-6 px-4 py-6">
           <ApplicantsCard />
           <ApplicantsCard />
           <ApplicantsCard />
           <ApplicantsCard />
           <ApplicantsCard />
        </div>
    );
}
