"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
    loading?: boolean;
    onClick?: () => void;
    className?: string;
};

export function GenerateAIButton({ loading, onClick, className }: Props) {
    return (
        <Button
            type="button"
            onClick={onClick}
            disabled={loading}
            className={cn(
                "relative overflow-hidden flex items-center gap-2",
                "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
                "text-white border-0",
                "w-45 h-7",
                className,
            )}
        >
            {/* ✨ Animated background shimmer */}
            {loading && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.2,
                        ease: "linear",
                    }}
                />
            )}

            {/* ✨ Icon animation */}
            <motion.div
                animate={loading ? { rotate: 360 } : { rotate: 0 }}
                transition={{
                    repeat: loading ? Infinity : 0,
                    duration: 2,
                    ease: "linear",
                }}
            >
                <Sparkles className="w-4 h-4" />
            </motion.div>

            {/* ✨ Text */}
            <span className="relative z-10">{loading ? "Generating..." : "Generate with AI"}</span>
        </Button>
    );
}

// export function GenerateAIButton({ loading = false, onClick, className }: Props) {
//     return (
//         <Button
//             onClick={onClick}
//             disabled={loading}
//             className={cn(
//                 "relative overflow-hidden flex items-center justify-center gap-2",
//                 "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
//                 "text-white border-0",
//                 "w-45 h-7",
//                 className
//             )}
//         >
//             {/* 🔥 Keep original content hidden but reserving space */}
//             <span className={cn("flex items-center gap-2", loading && "opacity-0")}>
//                 <Sparkles className="w-4 h-4" />
//                 Generate with AI
//             </span>

//             {/* 🔥 Overlay loading */}
//             {loading && (
//                 <div className="absolute inset-0 flex items-center justify-center">
//                     <GenerateAILoading />
//                 </div>
//             )}
//         </Button>
//     );
// }

// export function GenerateAILoading() {
//     return (
//         <>
//             <Button
//                 disabled
//                 className={cn(
//                     "relative overflow-hidden flex items-center gap-2",
//                     "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
//                     "text-white border-0 w-45 h-7",
//                 )}
//             >
//                 <motion.div
//                     className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
//                     initial={{ x: "-100%" }}
//                     animate={{ x: "100%" }}
//                     transition={{
//                         repeat: Infinity,
//                         duration: 1.2,
//                         ease: "linear",
//                     }}
//                 />

//                 {/* ✨ Text */}
//                 <span className="relative z-10">Generating... </span>
//             </Button>
//         </>
//     );
// }
