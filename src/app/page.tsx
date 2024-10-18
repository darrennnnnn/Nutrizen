"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import CaloriesOverview from "@/components/Status/CaloriesOverview";
import NutrientsOverview from "@/components/Status/NutrientsOveview";
import Footer from "@/components/Footer";
import FoodAnalysisDialog from "@/components/Footer/FoodAnalysisDialog";
import SettingsDrawer from "@/components/Footer/SettingsDrawer";
import { FoodApiResponse } from "@/lib/types";
import ShopDrawer from "@/components/Footer/ShopDrawer";
import UserProfileDrawer from "@/components/Footer/UserProfileDrawer";
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session } = useSession();
    const [currentIntake, setCurrentIntake] = useState({
        calories: 0,
        proteins: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
    });

    const [targets, setTargets] = useState({
        calories: 2500,
        proteins: 55,
        carbs: 300,
        fat: 30,
        fiber: 30,
    });

    const [coins, setCoins] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);
    const [isShopDrawerOpen, setIsShopDrawerOpen] = useState(false);
    const [isUserProfileDrawerOpen, setIsUserProfileDrawerOpen] =
        useState(false);

    const [preview, setPreview] = useState<string | null>(null);
    const [foodData, setFoodData] = useState<
        {
            name: string;
            calories: number;
            proteins: number;
            carbs: number;
            fiber: number;
            fat: number;
        }[]
    >([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (session) {
            fetchUserData();
        }
    }, [session]);

    const fetchUserData = async () => {
        try {
            const res = await fetch("/api/user/data");
            const data = await res.json();
            setCurrentIntake(data.currentIntake);
            setTargets(data.targets);
            setCoins(data.coins);
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageCapture = (imageUrl: string, file: File) => {
        setPreview(imageUrl);
        setIsDialogOpen(true);
        setLoading(true);
        setFoodData([]);
        fetchFoodData(file);
    };

    const handleManualInput = async (data: {
        protein: number;
        carbs: number;
        fat: number;
        fiber: number;
    }) => {
        const calories = data.protein * 4 + data.carbs * 4 + data.fat * 9;
        const newIntakes = {
            calories: currentIntake.calories + calories,
            proteins: currentIntake.proteins + data.protein,
            carbs: currentIntake.carbs + data.carbs,
            fat: currentIntake.fat + data.fat,
            fiber: currentIntake.fiber + data.fiber,
        };

        try {
            const res = await fetch("/api/user/intake", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newIntakes),
            });
            const data = await res.json();
            setCurrentIntake(data.currentIntake);
            setCoins(data.coins);
        } catch (error) {
            console.log(error);
        }

        setFoodData((prev) => [
            ...prev,
            {
                name: "Manual Entry",
                calories: Math.round(calories),
                proteins: data.protein,
                carbs: data.carbs,
                fiber: data.fiber,
                fat: data.fat,
            },
        ]);
    };

    const handleConfirm = async () => {
        setIsDialogOpen(false);
        const newIntakes = {
            calories:
                currentIntake.calories +
                foodData.reduce((sum, item) => sum + item.calories, 0),
            proteins:
                currentIntake.proteins +
                foodData.reduce((sum, item) => sum + item.proteins, 0),
            carbs:
                currentIntake.carbs +
                foodData.reduce((sum, item) => sum + item.carbs, 0),
            fat:
                currentIntake.fat +
                foodData.reduce((sum, item) => sum + item.fat, 0),
            fiber:
                currentIntake.fiber +
                foodData.reduce((sum, item) => sum + item.fiber, 0),
        };

        try {
            const res = await fetch("/api/user/intake", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newIntakes),
            });
            const data = await res.json();
            setCurrentIntake(data.currentIntake);
            setCoins(data.coins);
        } catch (error) {
            console.error(error);
        }
        setFoodData([]);
    };

    const handleSettingsSubmit = async (newTargets: {
        calories: number;
        proteins: number;
        carbs: number;
        fat: number;
        fiber: number;
    }) => {
        try {
            const res = await fetch("/api/user/target", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTargets),
            });
            const data = await res.json();
            setTargets(data.targets);
            setCurrentIntake(data.currentIntake);
        } catch (error) {
            console.error("Error updating targets:", error);
        }
        setIsSettingsDrawerOpen(false);
    };

    const fetchFoodData = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append("image", file);
            const res = await fetch("/api/analyzeItem", {
                method: "POST",
                body: formData,
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
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

    return (
        <div className="h-screen flex flex-col">
            <Header coins={coins} />
            <div className="flex-grow overflow-y-auto m-3 flex flex-col justify-end items-center relative">
                <CaloriesOverview
                    currentCalories={currentIntake.calories}
                    targetCalories={targets.calories}
                />
                <NutrientsOverview
                    currentIntake={currentIntake}
                    targets={targets}
                />
            </div>
            <Footer
                onSettingsClick={() => setIsSettingsDrawerOpen(true)}
                onShopClick={() => setIsShopDrawerOpen(true)}
                onProfileClick={() => setIsUserProfileDrawerOpen(true)}
                onImageCapture={handleImageCapture}
                onManualInput={handleManualInput}
            />
            <FoodAnalysisDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                preview={preview}
                foodData={foodData}
                loading={loading}
                onConfirm={handleConfirm}
            />
            <SettingsDrawer
                isOpen={isSettingsDrawerOpen}
                onClose={() => setIsSettingsDrawerOpen(false)}
                currentTargets={targets}
                onSubmit={handleSettingsSubmit}
            />
            <ShopDrawer
                isOpen={isShopDrawerOpen}
                onClose={() => setIsShopDrawerOpen(false)}
            />
            <UserProfileDrawer
                isOpen={isUserProfileDrawerOpen}
                onClose={() => setIsUserProfileDrawerOpen(false)}
            />
        </div>
    );
}
