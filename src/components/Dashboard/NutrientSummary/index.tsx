import NutrientProgress from "../NutrientProgress";

export default function NutrientSummary() {
    return (
        <div className="flex gap-3 w-full">
            <NutrientProgress
                name="Protein"
                current={14}
                target={30}
                color="#FF6F61"
            />
            <NutrientProgress
                name="Carbs"
                current={14}
                target={30}
                color="#7EC8E3"
            />
            <NutrientProgress
                name="Fat"
                current={14}
                target={30}
                color="#F9E79F"
            />
            <NutrientProgress
                name="Fiber"
                current={14}
                target={30}
                color="#A3D9A5"
            />
        </div>
    );
}
