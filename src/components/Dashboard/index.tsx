import React from "react";
import { Smile } from "lucide-react";
import CalorieIntakeSummary from "./CalorieIntakeSummary";
import NutrientSummary from "./NutrientSummary";
import { DashboardProps } from "@/lib/types";
import { FaCoins } from "react-icons/fa";

export default function Dashboard({
    currentCalories,
    currentProteins,
    currentFat,
    currentCarbs,
    currentFiber,
    targetCalories,
    targetProteins,
    targetFat,
    targetCarbs,
    targetFiber,
    coins,
}: Readonly<DashboardProps>) {
    return (
        <div className="flex-grow overflow-y-auto m-3 flex flex-col justify-end items-center relative">
            {/* Coin Badge */}
            <div className="absolute top-0 right-0 bg-yellow-400 text-white rounded-full px-4 py-2 flex items-center shadow-md">
                <FaCoins className="mr-1" />
                <span className="font-bold">{coins}</span>
            </div>

            <div className=" relative flex-grow flex justify-center items-center pt-28">
                <Smile size={250} />
            </div>
            <CalorieIntakeSummary
                current={currentCalories}
                target={targetCalories}
            />
            <NutrientSummary
                currentProteins={currentProteins}
                currentFat={currentFat}
                currentCarbs={currentCarbs}
                currentFiber={currentFiber}
                targetProteins={targetProteins}
                targetFat={targetFat}
                targetCarbs={targetCarbs}
                targetFiber={targetFiber}
            />
        </div>
    );
}
