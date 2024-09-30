import { NutrientSummaryProps } from "@/lib/types";
import NutrientProgress from "../NutrientProgress";

export default function NutrientSummary({
    currentProteins,
    currentFat,
    currentCarbs,
    currentFiber,
    targetProteins,
    targetFat,
    targetCarbs,
    targetFiber,
}: Readonly<NutrientSummaryProps>) {
    return (
        <div className="flex gap-3 w-full">
            <NutrientProgress
                name="Protein"
                current={currentProteins}
                target={targetProteins}
                color="#6FCF97"
            />
            <NutrientProgress
                name="Carbs"
                current={currentCarbs}
                target={targetCarbs}
                color="#1E8449 "
            />
            <NutrientProgress
                name="Fat"
                current={currentFat}
                target={targetFat}
                color="#229954 "
            />
            <NutrientProgress
                name="Fiber"
                current={currentFiber}
                target={targetFiber}
                color="#82E0AA "
            />
        </div>
    );
}
