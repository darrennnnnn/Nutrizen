import ProgressBar from "../../ProgressBar";

interface NutrientProgressProps {
    name: string;
    current: number;
    target: number;
    color: string;
}

export default function NutrientProgress({
    name,
    current,
    target,
    color,
}: Readonly<NutrientProgressProps>) {
    return (
        <div className="bg-[#f3f3f3] p-2 rounded-md shadow-md w-1/4 flex flex-col items-center gap-1">
            <h1 className="font-semibold text-xs text-gray-500">{name}</h1>
            <ProgressBar value={Math.round((current / target) * 100)} color={color} />
            <p className="text-xs font-semibold text-gray-600">
                {current}/{target}
            </p>
        </div>
    );
}
