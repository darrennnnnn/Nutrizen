import Menubar from "@/components/Menubar";
import ProgressBar from "@/components/ProgressBar";
import { Smile } from "lucide-react";

export default function Home() {
    return (
        <div className="h-screen flex flex-col">
            <main className="flex-grow overflow-y-auto m-3 flex flex-col gap-3 justify-end items-center">
                <div className="flex-grow flex justify-center items-center bg-red-400">
                    <Smile size={250} />
                </div>
                <div className="bg-[#f3f3f3] p-2 rounded-md shadow-md w-full flex flex-col items-center">
                    <h1 className="font-semibold text-xl">
                        Daily Calories Intake
                    </h1>
                    <p className="text-2xl font-bold">1400/2500</p>
                </div>
                <div className="flex gap-3 w-full">
                    <div className="bg-[#f3f3f3] p-2 rounded-md shadow-md w-1/4 flex flex-col items-center gap-1">
                        <h1 className="font-semibold text-xs text-gray-500">
                            Protein
                        </h1>
                        <ProgressBar value={23} color="red" />
                        <p className="text-xs font-extrabold text-gray-600">
                            14/30
                        </p>
                    </div>
                    <div className="bg-[#f3f3f3] p-2 rounded-md shadow-md w-1/4 flex flex-col items-center gap-1">
                        <h1 className="font-semibold text-xs text-gray-500">
                            Carbs
                        </h1>
                        <ProgressBar value={23} color="blue" />
                        <p className="text-xs font-extrabold text-gray-600">
                            14/30
                        </p>
                    </div>
                    <div className="bg-[#f3f3f3] p-2 rounded-md shadow-md w-1/4 flex flex-col items-center gap-1">
                        <h1 className="font-semibold text-xs text-gray-500">
                            Fat
                        </h1>
                        <ProgressBar value={23} color="green" />
                        <p className="text-xs font-extrabold text-gray-600">
                            14/30
                        </p>
                    </div>
                    <div className="bg-[#f3f3f3] p-2 rounded-md shadow-md w-1/4 flex flex-col items-center gap-1">
                        <h1 className="font-semibold text-xs text-gray-500">
                            Fiber
                        </h1>
                        <ProgressBar value={23} color="yellow" />
                        <p className="text-xs font-extrabold text-gray-600">
                            14/30
                        </p>
                    </div>
                </div>
            </main>
            <Menubar />
        </div>
    );
}
