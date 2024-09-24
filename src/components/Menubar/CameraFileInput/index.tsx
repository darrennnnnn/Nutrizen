"use client";

import React, { ChangeEvent, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface NutritionInfo {
    name: string;
    calories: number;
    proteins: number;
    carbs: number;
    fiber: number;
    fat: number;
}

const CameraButton = ({ onClick }: { onClick: () => void }) => (
    <button
        onClick={onClick}
        className="p-3 bg-black text-white rounded-full hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
        <Camera className="w-6 h-6" />
    </button>
);

const NutritionDisplay = ({ info }: { info: NutritionInfo }) => (
    <div className="max-w-xs w-full">
        <div className="flex flex-col items-center justify-center">
            <span className="text-md text-gray-700">{info.name}</span>
            <span className="text-sm text-gray-600">{info.calories}cal</span>
        </div>
        {(["proteins", "carbs", "fiber", "fat"] as (keyof NutritionInfo)[]).map(
            (nutrient) => (
                <div
                    key={nutrient}
                    className="flex justify-between items-center mb-1"
                >
                    <span className="text-sm text-gray-500">
                        {nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}:
                    </span>
                    <span className="text-sm text-gray-500">
                        {info[nutrient]}g
                    </span>
                </div>
            )
        )}
    </div>
);

interface AmountControlProps {
    amount: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

const AmountControl = ({
    amount,
    onIncrease,
    onDecrease,
}: AmountControlProps) => (
    <div className="w-full mt-4">
        <span className="flex justify-center text-md text-gray-700">
            Amount
        </span>
        <div className="flex justify-between items-center">
            <Button variant="outline" size="icon" onClick={onIncrease}>
                +
            </Button>
            <span className="text-sm text-gray-500">{amount}</span>
            <Button variant="outline" size="icon" onClick={onDecrease}>
                -
            </Button>
        </div>
    </div>
);

export default function CameraFileInput() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [amount, setAmount] = useState(1);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setIsDialogOpen(true);
        }
    };

    const handleCameraClick = () => fileInputRef.current?.click();
    const handleCancel = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setIsDialogOpen(false);
    };

    const handleConfirm = () => {
        setIsDialogOpen(false);
        console.log("Image confirmed:", selectedFile?.name);
    };

    const handleIncreaseAmount = () => setAmount((prev) => prev + 1);
    const handleDecreaseAmount = () =>
        setAmount((prev) => Math.max(1, prev - 1));

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const nutritionInfo: NutritionInfo = {
        name: "Steak",
        calories: 160,
        proteins: 4,
        carbs: 3,
        fiber: 2,
        fat: 1,
    };

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
            />
            <CameraButton onClick={handleCameraClick} />

            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent className="max-h-[80vh] overflow-y-auto">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Image</AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="flex flex-col items-center">
                        {previewUrl && (
                            <div className="w-full h-48 relative mb-4">
                                <Image
                                    src={previewUrl}
                                    alt="Preview"
                                    fill
                                    style={{ objectFit: "contain" }}
                                    className="rounded-lg shadow-lg"
                                />
                            </div>
                        )}
                    </div>

                    <NutritionDisplay info={nutritionInfo} />
                    <AmountControl
                        amount={amount}
                        onIncrease={handleIncreaseAmount}
                        onDecrease={handleDecreaseAmount}
                    />

                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancel}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirm}>
                            OK
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
