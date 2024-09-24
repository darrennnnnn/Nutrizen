import { Smile } from "lucide-react";
import CalorieIntakeSummary from "./CalorieIntakeSummary";
import NutrientSummary from "./NutrientSummary";

export default function Dashboard() {
    return (
        <div className="flex-grow overflow-y-auto m-3 flex flex-col gap-3 justify-end items-center">
            <div className="flex-grow flex justify-center items-center">
                <Smile size={250} />
            </div>
            <CalorieIntakeSummary current={1400} target={2500} />
            <NutrientSummary />
        </div>
    );
}
