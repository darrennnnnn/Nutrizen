"use client";

import React, { SetStateAction, useEffect, useState } from "react";
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
import { LoaderCircle } from "lucide-react";
import CustomizeDrawer from "@/components/Footer/CustomizeDrawer";

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

    const [loading, setLoading] = useState(false);
    const [coins, setCoins] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);
    const [isShopDrawerOpen, setIsShopDrawerOpen] = useState(false);
    const [isUserProfileDrawerOpen, setIsUserProfileDrawerOpen] =
        useState(false);
    const [isCustomizeDrawerOpen, setIsCustomizeDrawerOpen] = useState(false);

    const [color, setColor] = useState("yellow");
    const [pet, setPet] = useState("");
    const [accessory, setAccessory] = useState("");

    const [ownedColors, setOwnedColors] = useState<string[]>(["green"]);
    const [ownedPets, setOwnedPets] = useState<string[]>([""]);
    const [ownedAccessories, setOwnedAccessories] = useState<string[]>([""]);

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

    const handleColorUpdate = async (newColor: SetStateAction<string>) => {
        setColor(newColor);
        await fetchUserData();
    };

    const handlePetUpdate = async (newPet: SetStateAction<string>) => {
        setPet(newPet);
        await fetchUserData();
    };

    const handleAccessoryUpdate = async (
        newAccessory: SetStateAction<string>
    ) => {
        setAccessory(newAccessory);
        await fetchUserData();
    };

    const handlePurchase = async (newCoins: number) => {
        setCoins(newCoins);
        await fetchUserData();
    };

    useEffect(() => {
        if (session) {
            fetchUserData();
        }
    }, [session, color]);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/user/data");
            const data = await res.json();
            setCurrentIntake(data.currentIntake);
            setTargets(data.targets);
            setCoins(data.coins);
            setColor(data.color);
            setPet(data.pet);
            setAccessory(data.accessory)
            setOwnedColors(data.ownedColors || ["green"]);
            setOwnedPets(data.ownedPets || [""]);
            setOwnedAccessories(data.ownedAccessories || [""]);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
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

        const prevIntake = currentIntake;
        const prevFoodData = [...foodData];
        const optimisticFoodEntry = {
            name: "Manual Entry",
            calories: Math.round(calories),
            proteins: data.protein,
            carbs: data.carbs,
            fiber: data.fiber,
            fat: data.fat,
        };

        setCurrentIntake(newIntakes);
        setFoodData((prev) => [...prev, optimisticFoodEntry]);

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

            // revert changes
            setCurrentIntake(prevIntake);
            setFoodData(prevFoodData);
        }
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

        const prevIntake = currentIntake;
        const prevFoodData = [...foodData];
        setCurrentIntake(newIntakes);
        setFoodData([]);

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

            //revert changes
            setCurrentIntake(prevIntake);
            setFoodData(prevFoodData);
        }
    };

    const handleSettingsSubmit = async (newTargets: {
        calories: number;
        proteins: number;
        carbs: number;
        fat: number;
        fiber: number;
    }) => {
        const prevTargets = targets;
        setTargets(newTargets);

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
            setTargets(prevTargets);
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
        <div className="h-svh flex flex-col">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-orange-950 bg-opacity-20 z-50">
                    <LoaderCircle
                        strokeWidth={4}
                        color="#14532D"
                        size={50}
                        className="duration-[1200] animate-spin"
                    />
                </div>
            )}
            <Header coins={coins} />
            <div className="flex-grow overflow-y-auto m-3 flex flex-col justify-end items-center relative overflow-hidden">
                <CaloriesOverview
                    characterColor={color}
                    currentCalories={currentIntake.calories}
                    targetCalories={targets.calories}
                    pet={pet}
                    accessory={accessory}
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
                onCustomizeClick={() => setIsCustomizeDrawerOpen(true)}
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
                coins={coins}
                onPurchase={handlePurchase}
                ownedColors={ownedColors}
                ownedPets={ownedPets}
                ownedAccessories={ownedAccessories}
            />
            <CustomizeDrawer
                isOpen={isCustomizeDrawerOpen}
                onClose={() => setIsCustomizeDrawerOpen(false)}
                onColorUpdate={handleColorUpdate}
                ownedColors={ownedColors}
                ownedPets={ownedPets}
                onPetUpdate={handlePetUpdate}
                currentPet={pet}
                onAccessoryUpdate={handleAccessoryUpdate}
                currentAccessory={accessory}
                ownedAccessories={ownedAccessories}
            />
            {session && (
                <UserProfileDrawer
                    isOpen={isUserProfileDrawerOpen}
                    onClose={() => setIsUserProfileDrawerOpen(false)}
                    userData={session}
                />
            )}
        </div>
    );
}
