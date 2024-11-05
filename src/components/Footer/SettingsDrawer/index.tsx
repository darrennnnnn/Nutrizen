import { useState } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SettingsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    currentTargets: NutritionTargets;
    onSubmit: (targets: NutritionTargets) => void;
}

interface NutritionTargets {
    calories: number;
    proteins: number;
    carbs: number;
    fat: number;
    fiber: number;
}

export default function SettingsDrawer({
    isOpen,
    onClose,
    currentTargets,
    onSubmit,
}: Readonly<SettingsDrawerProps>) {
    const [tempTargets, setTempTargets] = useState(currentTargets);

    const handleNutrientChange = (
        nutrient: keyof Omit<NutritionTargets, "calories">,
        value: number
    ) => {
        setTempTargets((prev) => ({
            ...prev,
            [nutrient]: value,
        }));

        if (["proteins", "carbs", "fat"].includes(nutrient)) {
            const newProteins =
                nutrient === "proteins" ? value : tempTargets.proteins;
            const newCarbs = nutrient === "carbs" ? value : tempTargets.carbs;
            const newFat = nutrient === "fat" ? value : tempTargets.fat;
            const newCalories = newProteins * 4 + newCarbs * 4 + newFat * 9;
            setTempTargets((prev) => ({
                ...prev,
                calories: Math.round(newCalories),
            }));
        }
    };

    const handleSettingsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(tempTargets);
    };

    return (
        <Drawer open={isOpen} onOpenChange={onClose}>
            <DrawerContent className="bg-gradient-to-t from-emerald-100 to-lime-100">
                <form onSubmit={handleSettingsSubmit}>
                    <DrawerHeader>
                        <DrawerTitle>Configure Your Targets</DrawerTitle>
                        <DrawerDescription>
                            Set your daily nutritional targets here.{" "}
                            <span className="font-bold">Calories are automatically calculated.</span>
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
                        {(["proteins", "carbs", "fat", "fiber"] as const).map(
                            (nutrient) => (
                                <div key={nutrient} className="space-y-2">
                                    <Label
                                        htmlFor={`target${
                                            nutrient.charAt(0).toUpperCase() +
                                            nutrient.slice(1)
                                        }`}
                                    >
                                        {nutrient.charAt(0).toUpperCase() +
                                            nutrient.slice(1)}{" "}
                                        (g)
                                    </Label>
                                    <Input
                                        className="bg-lime-50"
                                        id={`target${
                                            nutrient.charAt(0).toUpperCase() +
                                            nutrient.slice(1)
                                        }`}
                                        type="number"
                                        value={tempTargets[nutrient]}
                                        onChange={(e) =>
                                            handleNutrientChange(
                                                nutrient,
                                                Number(e.target.value)
                                            )
                                        }
                                    />
                                </div>
                            )
                        )}
                    </div>
                    <DrawerFooter>
                        <DrawerClose>
                            <p className="text-sm text-red-600 font-medium mb-4">
                                Warning: Saving changes will reset your current
                                intakes for the day to 0.
                            </p>
                            <Button
                                type="submit"
                                className="w-full bg-orange-950"
                            >
                                Save Changes
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    );
}
