import { Smile } from "lucide-react";
import CalorieIntakeSummary from "./CalorieIntakeSummary";
import NutrientSummary from "./NutrientSummary";
import { DashboardProps } from "@/lib/types";

export default function Dashboard({
    currentCalories,
    targetCalories,
    foodData,
}: Readonly<DashboardProps>) {
    console.log(foodData);
    return (
        <div className="flex-grow overflow-y-auto m-3 flex flex-col gap-3 justify-end items-center">
            <div className="flex-grow flex justify-center items-center">
                <Smile size={250} />
            </div>
            <CalorieIntakeSummary
                current={currentCalories}
                target={targetCalories}
            />
            <NutrientSummary />
        </div>
    );
}
