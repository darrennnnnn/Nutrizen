import { Smile } from "lucide-react";
import { motion, useSpring, useTransform } from "framer-motion";

interface CaloriesOverviewProps {
    currentCalories: number;
    targetCalories: number;
}

export default function CaloriesOverview({
    currentCalories,
    targetCalories,
}: Readonly<CaloriesOverviewProps>) {
    const percentage = Math.min(100, (currentCalories / targetCalories) * 100);
    const strokeWidth = 20;
    const radius = 80;
    const circumference = Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <>
            <div className="relative flex-grow flex justify-center items-center pt-28">
                <Smile size={250} />
            </div>
            <div className="max-w-screen-sm w-full flex flex-col items-center pb-2">
                <div className="relative w-full pb-[60%]">
                    <svg
                        className="absolute top-0 left-0 w-full h-full"
                        viewBox="0 0 200 120"
                        preserveAspectRatio="xMidYMin slice"
                    >
                        <path
                            d="M20,100 A80,80 0 1,1 180,100"
                            fill="none"
                            stroke="#F0EDE3"
                            strokeWidth={strokeWidth}
                            strokeLinecap="butt"
                        />
                        <path
                            d="M20,100 A80,80 0 1,1 180,100"
                            fill="none"
                            stroke="#2ECC71"
                            strokeWidth={strokeWidth}
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="butt"
                            className="transition-stroke-dashoffset duration-500 ease-in-out"
                        />
                        <text
                            x="100"
                            y="90"
                            textAnchor="middle"
                            fontSize="36"
                            fontWeight="bold"
                            fill="#14532D"
                        >
                            {currentCalories}
                        </text>
                        <text
                            x="100"
                            y="105"
                            textAnchor="middle"
                            fontSize="12"
                            fill="#9E9E9E"
                        >
                            of {targetCalories} cal
                        </text>
                    </svg>
                </div>
            </div>
        </>
    );
}
