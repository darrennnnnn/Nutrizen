"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Dashboard from "@/components/Dashboard";
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
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Pencil, Settings } from "lucide-react";
import CameraFileInput from "@/components/Menubar/CameraFileInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
    const [preview, setPreview] = useState<string | null>(null);
    const [foodData, setFoodData] = useState<NutritionInfo[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [targetCalories, setTargetCalories] = useState(2500);
    const [targetProteins, setTargetProteins] = useState(55);
    const [targetFat, setTargetFat] = useState(30);
    const [targetCarbs, setTargetCarbs] = useState(300);
    const [targetFiber, setTargetFiber] = useState(30);

    const [currentCalories, setCurrentCalories] = useState(0);
    const [currentProteins, setCurrentProteins] = useState(0);
    const [currentFat, setCurrentFat] = useState(0);
    const [currentCarbs, setCurrentCarbs] = useState(0);
    const [currentFibers, setCurrentFibers] = useState(0);

    const [totalCalories, setTotalCalories] = useState(0);
    const [totalProteins, setTotalProteins] = useState(0);
    const [totalFat, setTotalFat] = useState(0);
    const [totalCarbs, setTotalCarbs] = useState(0);
    const [totalFibers, setTotalFibers] = useState(0);

    const [tempTargets, setTempTargets] = useState({
        proteins: targetProteins,
        carbs: targetCarbs,
        fat: targetFat,
        fiber: targetFiber,
        calories: targetCalories,
    });

    const resetIntakes = () => {
        setCurrentCalories(0);
        setCurrentProteins(0);
        setCurrentFat(0);
        setCurrentCarbs(0);
        setCurrentFibers(0);
    };

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
        setPreview(imageUrl);
        setIsDialogOpen(true);
        setLoading(true);
        fetchFoodData(file);
    };

    const handleManualInput = (data: {
        protein: number;
        carbs: number;
        fat: number;
        fiber: number;
    }) => {
        const calories = data.protein * 4 + data.carbs * 4 + data.fat * 9; // Rough estimation

        setCurrentCalories((prev) => prev + calories);
        setCurrentProteins((prev) => prev + data.protein);
        setCurrentFat((prev) => prev + data.fat);
        setCurrentCarbs((prev) => prev + data.carbs);
        setCurrentFibers((prev) => prev + data.fiber);

        // Create a new NutritionInfo object for the manually entered data
        const manualNutritionInfo: NutritionInfo = {
            name: "Manual Entry",
            calories: Math.round(calories),
            proteins: data.protein,
            carbs: data.carbs,
            fiber: data.fiber,
            fat: data.fat,
        };

        // Add the manual entry to the foodData array
        setFoodData((prev) => [...prev, manualNutritionInfo]);
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
        setCurrentCalories((prev) => prev + totalCalories);
        setCurrentProteins((prev) => prev + totalProteins);
        setCurrentFat((prev) => prev + totalFat);
        setCurrentCarbs((prev) => prev + totalCarbs);
        setCurrentFibers((prev) => prev + totalFibers);

        setFoodData([]);
        setTotalCalories(0);
        setTotalProteins(0);
        setTotalFat(0);
        setTotalCarbs(0);
        setTotalFibers(0);
    };

    const calculateCalories = (
        proteins: number,
        carbs: number,
        fat: number
    ) => {
        return proteins * 4 + carbs * 4 + fat * 9;
    };

    const handleNutrientChange = (nutrient: string, value: number) => {
        setTempTargets((prev) => ({
            ...prev,
            [nutrient]: value,
        }));

        // Recalculate calories if protein, carbs, or fat changes
        if (["proteins", "carbs", "fat"].includes(nutrient)) {
            const newProteins =
                nutrient === "proteins" ? value : tempTargets.proteins;
            const newCarbs = nutrient === "carbs" ? value : tempTargets.carbs;
            const newFat = nutrient === "fat" ? value : tempTargets.fat;
            const newCalories = calculateCalories(
                newProteins,
                newCarbs,
                newFat
            );
            setTempTargets((prev) => ({ ...prev, calories: newCalories }));
        }
    };

    const handleSettingsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Update the actual target values with the temporary ones
        setTargetProteins(tempTargets.proteins);
        setTargetCarbs(tempTargets.carbs);
        setTargetFat(tempTargets.fat);
        setTargetFiber(tempTargets.fiber);
        setTargetCalories(tempTargets.calories);

        // Reset intakes only when saving changes
        resetIntakes();
        setIsDrawerOpen(false);
    };

    const alertDialogMessage = loading
        ? "Please wait while we analyze your food..."
        : foodData.length > 0
        ? "Please review the captured food and its nutritional information."
        : "No items detected. Please try again.";

    return (
        <div className="h-screen flex flex-col">
            <Dashboard
                currentCalories={currentCalories}
                currentProteins={currentProteins}
                currentFat={currentFat}
                currentCarbs={currentCarbs}
                currentFiber={currentFibers}
                targetCalories={targetCalories}
                targetProteins={targetProteins}
                targetFat={targetFat}
                targetCarbs={targetCarbs}
                targetFiber={targetFiber}
                foodData={foodData}
                coins={32}
            />
            <div className="w-full flex items-center justify-around py-2">
                {/* settings change intakes */}
                <Drawer>
                    <DrawerTrigger className="p-3">
                        <Settings />
                    </DrawerTrigger>
                    <DrawerContent>
                        <form onSubmit={handleSettingsSubmit}>
                            <DrawerHeader>
                                <DrawerTitle>
                                    Configure Your Targets
                                </DrawerTitle>
                                <DrawerDescription>
                                    Set your daily nutritional targets here.
                                    Calories are automatically calculated.
                                </DrawerDescription>
                            </DrawerHeader>
                            <div className="p-4 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="targetCalories">
                                        Calories (calculated)
                                    </Label>
                                    <p
                                        id="targetCalories"
                                        className="text-3xl font-extrabold text-[#14532D]"
                                    >
                                        {Math.round(tempTargets.calories)}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="targetProteins">
                                        Proteins (g)
                                    </Label>
                                    <Input
                                        id="targetProteins"
                                        type="number"
                                        value={tempTargets.proteins}
                                        onChange={(e) =>
                                            handleNutrientChange(
                                                "proteins",
                                                Number(e.target.value)
                                            )
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="targetCarbs">
                                        Carbs (g)
                                    </Label>
                                    <Input
                                        id="targetCarbs"
                                        type="number"
                                        value={tempTargets.carbs}
                                        onChange={(e) =>
                                            handleNutrientChange(
                                                "carbs",
                                                Number(e.target.value)
                                            )
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="targetFat">Fat (g)</Label>
                                    <Input
                                        id="targetFat"
                                        type="number"
                                        value={tempTargets.fat}
                                        onChange={(e) =>
                                            handleNutrientChange(
                                                "fat",
                                                Number(e.target.value)
                                            )
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="targetFiber">
                                        Fiber (g)
                                    </Label>
                                    <Input
                                        id="targetFiber"
                                        type="number"
                                        value={tempTargets.fiber}
                                        onChange={(e) =>
                                            handleNutrientChange(
                                                "fiber",
                                                Number(e.target.value)
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <DrawerFooter>
                                <DrawerClose>
                                    <p className="text-sm text-yellow-600 font-medium mb-4">
                                        Warning: Saving changes will reset your
                                        current intakes for the day to 0.
                                    </p>
                                    <Button type="submit" className="w-full">
                                        Save Changes
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </form>
                    </DrawerContent>
                </Drawer>
                {/* input */}
                <CameraFileInput
                    onImageCapture={handleImageCapture}
                    onManualInput={handleManualInput}
                />

                {/* edit character */}
                <Drawer>
                    <DrawerTrigger className=" p-3">
                        {" "}
                        <Pencil />
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>🚧</DrawerTitle>
                            <DrawerDescription>🚧</DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                            <Button>🚧</Button>
                            <DrawerClose>
                                <Button variant="outline">🚧</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>

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
