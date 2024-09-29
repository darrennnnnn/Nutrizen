import { CalorieIntakeSummaryProps } from "@/lib/types";

export default function CalorieIntakeSummary({
    current,
    target,
}: Readonly<CalorieIntakeSummaryProps>) {
    return (
        <div className="bg-[#f3f3f3] p-2 rounded-md shadow-md w-full flex flex-col items-center">
            <h1 className="font-semibold text-xl">Daily Calories Intake</h1>
            <p className="text-2xl font-bold">
                {current}/{target}
            </p>
        </div>
    );
}
