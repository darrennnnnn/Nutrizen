import NutrientProgress from "./NutrientProgressBar";

interface NutrientsOverviewProps {
    currentIntake: {
        proteins: number;
        carbs: number;
        fat: number;
        fiber: number;
    };
    targets: {
        proteins: number;
        carbs: number;
        fat: number;
        fiber: number;
    };
}

export default function NutrientsOverview({
    currentIntake,
    targets,
}: Readonly<NutrientsOverviewProps>) {
    return (
        <div className="flex gap-3 w-full">
            <NutrientProgress
                name="Protein"
                current={currentIntake.proteins}
                target={targets.proteins}
                color="#6FCF97"
            />
            <NutrientProgress
                name="Carbs"
                current={currentIntake.carbs}
                target={targets.carbs}
                color="#1E8449"
            />
            <NutrientProgress
                name="Fat"
                current={currentIntake.fat}
                target={targets.fat}
                color="#229954"
            />
            <NutrientProgress
                name="Fiber"
                current={currentIntake.fiber}
                target={targets.fiber}
                color="#82E0AA"
            />
        </div>
    );
}
