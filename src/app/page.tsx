"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Dashboard from "@/components/Dashboard";
import Menubar from "@/components/Menubar";
import { FoodApiResponse, NutritionInfo } from "@/lib/types";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Home() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [foodData, setFoodData] = useState<NutritionInfo[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [totalCalories, setTotalCalories] = useState(0);
    const [totalProteins, setTotalProteins] = useState(0);
    const [totalFat, setTotalFat] = useState(0);
    const [totalCarbs, setTotalCarbs] = useState(0);
    const [totalFibers, setTotalFibers] = useState(0);

    useEffect(() => {
        if (foodData.length > 0) {
            let newTotalCalories = 0;
            let newTotalProteins = 0;
            let newTotalFat = 0;
            let newTotalCarbs = 0;
            let newTotalFibers = 0;

            foodData.forEach((item) => {
                newTotalCalories += item.calories;
                newTotalProteins += item.proteins;
                newTotalFat += item.fat;
                newTotalCarbs += item.carbs;
                newTotalFibers += item.fiber;
            });

            setTotalCalories(newTotalCalories);
            setTotalProteins(newTotalProteins);
            setTotalFat(newTotalFat);
            setTotalCarbs(newTotalCarbs);
            setTotalFibers(newTotalFibers);
        } else {
            setTotalCalories(0);
            setTotalProteins(0);
            setTotalFat(0);
            setTotalCarbs(0);
            setTotalFibers(0);
        }
    }, [foodData]);

    const handleImageCapture = (imageUrl: string, file: File) => {
        setSelectedFile(file);
        setPreview(imageUrl);
        setIsDialogOpen(true);
        setLoading(true);
        fetchFoodData(file);
    };

    const fetchFoodData = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append("image", file);

            const res = await fetch("/api/analyzeItem", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            const processedFoodData = data.items.map(
                (item: FoodApiResponse) => {
                    const foodInfo = item.food[0].food_info;
                    const servingRatio = foodInfo.g_per_serving / 100;
                    return {
                        name: foodInfo.display_name,
                        calories: Math.round(
                            foodInfo.nutrition.calories_100g * servingRatio
                        ),
                        proteins: Math.round(
                            foodInfo.nutrition.proteins_100g * servingRatio
                        ),
                        carbs: Math.round(
                            foodInfo.nutrition.carbs_100g * servingRatio
                        ),
                        fiber: Math.round(
                            foodInfo.nutrition.fibers_100g * servingRatio
                        ),
                        fat: Math.round(
                            foodInfo.nutrition.fat_100g * servingRatio
                        ),
                    };
                }
            );
            setFoodData(processedFoodData);
        } catch (error) {
            console.error("Error fetching food data:", error);
            setFoodData([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setPreview(null);
        setFoodData([]);
    };

    const handleConfirm = () => {
        setIsDialogOpen(false);
    };

    const alertDialogMessage = loading
        ? "Please wait while we analyze your food..."
        : foodData.length > 0
        ? "Please review the captured food and its nutritional information."
        : "No items detected. Please try again.";

    return (
        <div className="h-screen flex flex-col">
            <Dashboard
                currentCalories={2300}
                targetCalories={2500}
                foodData={foodData}
                coins={32}
            />
            <Menubar onImageCapture={handleImageCapture} />

            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                                        ] as (keyof NutritionInfo)[]
                                    ).map((nutrient) => (
                                        <div
                                            key={nutrient}
                                            className="flex justify-between items-center mb-1"
                                        >
                                            <span className="text-sm text-gray-500">
                                                {nutrient
                                                    .charAt(0)
                                                    .toUpperCase() +
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
                        <AlertDialogCancel onClick={handleDialogClose}>
                            Cancel
                        </AlertDialogCancel>
                        {!loading && (
                            <AlertDialogAction onClick={handleConfirm}>
                                {foodData.length > 0 ? "Confirm" : "Retry"}
                            </AlertDialogAction>
                        )}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
