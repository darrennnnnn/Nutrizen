import React from "react";
import Image from "next/image";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface FoodAnalysisDialogProps {
    isOpen: boolean;
    onClose: () => void;
    preview: string | null;
    foodData: {
        name: string;
        calories: number;
        proteins: number;
        carbs: number;
        fiber: number;
        fat: number;
    }[];
    loading: boolean;
    onConfirm: () => void;
}

export default function FoodAnalysisDialog({
    isOpen,
    onClose,
    preview,
    foodData,
    loading,
    onConfirm,
}: Readonly<FoodAnalysisDialogProps>) {
    const alertDialogMessage = loading
        ? "Please wait while we analyze your food..."
        : foodData.length > 0
        ? "Please review the captured food and its nutritional information."
        : "No items detected. Please try again.";

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-h-[80vh] overflow-y-auto">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {loading ? "Analyzing Food" : "Confirm Food"}
                    </AlertDialogTitle>
                </AlertDialogHeader>

                <div className="flex flex-col items-center mt-4">
                    {preview && (
                        <div className="w-full h-36 relative mb-4">
                            <Image
                                src={preview}
                                alt="Preview"
                                fill
                                style={{ objectFit: "contain" }}
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    )}

                    <div className="w-full h-48 overflow-y-auto flex flex-col gap-2">
                        {foodData.map((item) => (
                            <div
                                key={item.name}
                                className="w-full border rounded-xl p-4"
                            >
                                <div className="flex flex-col items-center justify-center">
                                    <span className="text-md text-gray-700">
                                        {item.name}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        {item.calories}cal
                                    </span>
                                </div>
                                {(
                                    [
                                        "proteins",
                                        "carbs",
                                        "fiber",
                                        "fat",
                                    ] as (keyof typeof item)[]
                                ).map((nutrient) => (
                                    <div
                                        key={nutrient}
                                        className="flex justify-between items-center mb-1"
                                    >
                                        <span className="text-sm text-gray-500">
                                            {nutrient.charAt(0).toUpperCase() +
                                                nutrient.slice(1)}
                                            :
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {item[nutrient]}g
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <AlertDialogDescription className="text-center">
                    {alertDialogMessage}
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>
                        Cancel
                    </AlertDialogCancel>
                    {!loading && (
                        <AlertDialogAction onClick={onConfirm}>
                            {foodData.length > 0 ? "Confirm" : "Retry"}
                        </AlertDialogAction>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
