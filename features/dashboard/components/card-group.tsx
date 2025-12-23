import React, { ComponentType, SVGProps } from "react";
import { StatCard } from "./dashboard-card";

type StatItem = {
    label: string;
    count: number | string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    iconBgClassName: string;
};

type StatsGridProps = {
    items: StatItem[];
    className?: string;
};

export default function CardGroup({ items, className = "" }: StatsGridProps) {
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 px-4">
            {items.map((item) => (
                <StatCard
                    key={item.label}
                    label={item.label}
                    count={item.count}
                    icon={item.icon}
                    iconBgClassName={item.iconBgClassName}
                />
            ))}
        </div>

        // <div className="grid grid-cols-2 gap-4 md:grid-cols-4 px-4">
        //     <StatCard
        //         label="Applications"
        //         count={24}
        //         icon={FileUser}
        //         iconBgClassName="bg-rose-500"
        //     />
        //     <StatCard
        //         label="Saved jobs"
        //         count={8}
        //         icon={Bookmark}
        //         iconBgClassName="bg-emerald-500"
        //     />
        //     <StatCard
        //         label="Today Apply"
        //         count={3}
        //         icon={CalendarClock}
        //         iconBgClassName="bg-purple-500"
        //     />
        //     <StatCard
        //         label="Weekly Apply"
        //         count={5}
        //         icon={CalendarRange}
        //         iconBgClassName="bg-orange-500"
        //     />
        // </div>
    );
}
