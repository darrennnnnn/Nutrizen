import React from "react";
import { CalorieIntakeSummaryProps } from "@/lib/types";
import { Smile } from "lucide-react";

export default function CalorieIntakeSummary({
    current,
    target,
}: Readonly<CalorieIntakeSummaryProps>) {
    const percentage = Math.min(100, (current / target) * 100);
    const strokeWidth = 20;
    const radius = 80;
    const circumference = Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="w-full flex flex-col items-center">
            <div className="relative w-full pb-[60%]">
                <svg
                    className="absolute top-0 left-0 w-full h-full"
                    viewBox="0 0 200 120"
                    preserveAspectRatio="xMidYMin slice"
                >
                    <path
                        d="M20,100 A80,80 0 1,1 180,100"
                        fill="none"
                        stroke="#e6e6e6"
                        strokeWidth={strokeWidth}
                        strokeLinecap="butt"
                    />
                    <path
                        d="M20,100 A80,80 0 1,1 180,100"
                        fill="none"
                        stroke="#4CAF50"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="butt"
                    />
                    <text
                        x="100"
                        y="90"
                        textAnchor="middle"
                        fontSize="36"
                        fontWeight="bold"
                        fill="#4a4a4a"
                    >
                        {current}
                    </text>
                    <text
                        x="100"
                        y="115"
                        textAnchor="middle"
                        fontSize="14"
                        fill="#888"
                    >
                        of {target} cal
                    </text>
                </svg>
            </div>
        </div>
    );
}
