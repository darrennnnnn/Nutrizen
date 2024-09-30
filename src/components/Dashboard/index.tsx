import React from "react";
import { Smile } from "lucide-react";
import CalorieIntakeSummary from "./CalorieIntakeSummary";
import NutrientSummary from "./NutrientSummary";
import { DashboardProps } from "@/lib/types";
import { FaHatCowboy } from "react-icons/fa6";
import { TbChefHat } from "react-icons/tb";
import { FaRedhat } from "react-icons/fa";
import { FaCoins } from "react-icons/fa"; // Import coin icon

export default function Dashboard({
    currentCalories,
    targetCalories,
    foodData,
    coins = 0, // Add coins prop with a default value
}: Readonly<DashboardProps>) {
    console.log(foodData);
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
            {/* <NutrientSummary /> */}
        </div>
    );
}
