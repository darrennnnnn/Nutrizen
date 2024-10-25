import React, { useRef, useState, ChangeEvent } from "react";
import { Plus, Camera, FilePen } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface NutrientInput {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
}

interface CameraFileInputProps {
    onImageCapture: (imageUrl: string, file: File) => void;
    onManualInput: (data: NutrientInput) => void;
}

export default function CameraFileInput({
    onImageCapture,
    onManualInput,
}: Readonly<CameraFileInputProps>) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showOptions, setShowOptions] = useState(false);
    const [showManualInputDialog, setShowManualInputDialog] = useState(false);
    const [manualInput, setManualInput] = useState<NutrientInput>({
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
    });

    const resizeImage = (
        file: File,
        maxWidth: number,
        maxHeight: number,
        quality: number
    ): Promise<Blob> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = handleReaderLoad(
                resolve,
                maxWidth,
                maxHeight,
                quality
            );
            reader.readAsDataURL(file);
        });
    };

    const handleReaderLoad =
        (
            resolve: (value: Blob | PromiseLike<Blob>) => void,
            maxWidth: number,
            maxHeight: number,
            quality: number
        ) =>
        (e: ProgressEvent<FileReader>) => {
            const img = new Image();
            img.onload = handleImageLoad(
                resolve,
                img,
                maxWidth,
                maxHeight,
                quality
            );
            img.src = e.target?.result as string;
        };

    const handleImageLoad =
        (
            resolve: (value: Blob | PromiseLike<Blob>) => void,
            img: HTMLImageElement,
            maxWidth: number,
            maxHeight: number,
            quality: number
        ) =>
        () => {
            const canvas = document.createElement("canvas");
            let width = img.width;
            let height = img.height;
            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0, width, height);
            canvas.toBlob(
                (blob) => {
                    if (blob) resolve(blob);
                },
                "image/jpeg",
                quality
            );
        };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const resizedBlob = await resizeImage(file, 1200, 1200, 0.7);
                const resizedFile = new File([resizedBlob], file.name, {
                    type: "image/jpeg",
                });
                const imageUrl = URL.createObjectURL(resizedBlob);
                onImageCapture(imageUrl, resizedFile);
            } catch (error) {
                console.error("Error resizing image:", error);
            }
        }
    };

    const handlePlusClick = () => setShowOptions(!showOptions);

    const handleCameraClick = () => {
        fileInputRef.current?.click();
        setShowOptions(false);
    };

    const handleFilePenClick = () => {
        setShowManualInputDialog(true);
        setShowOptions(false);
    };

    const handleManualInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setManualInput((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    };

    const handleManualInputSubmit = () => {
        onManualInput(manualInput);
        setShowManualInputDialog(false);
        setManualInput({ protein: 0, carbs: 0, fat: 0, fiber: 0 });
    };

    return (
        <div className="relative">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
            />
            <button
                onClick={handlePlusClick}
                className={`p-3 ${
                    showOptions ? "bg-green-950" : "bg-[#14532D]"
                }  text-white rounded-full transition-all duration-300 ease-in-out`}
            >
                <Plus
                    className={`w-7 h-7 transition-transform duration-300 ${
                        showOptions ? "rotate-45" : ""
                    }`}
                />
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 flex space-x-2">
                <button
                    onClick={handleCameraClick}
                    className={`p-2 bg-[#14532D] text-white rounded-full transition-all duration-300 ease-in-out ${
                        showOptions
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                >
                    <Camera className="w-6 h-6" />
                </button>
                <button
                    onClick={handleFilePenClick}
                    className={`p-2 bg-[#14532D] text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out ${
                        showOptions
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                >
                    <FilePen className="w-6 h-6" />
                </button>
            </div>

            <AlertDialog
                open={showManualInputDialog}
                onOpenChange={setShowManualInputDialog}
            >
                <AlertDialogContent className="bg-gradient-to-t from-emerald-100 to-lime-100">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Manual Nutrient Input
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Enter the nutritional information manually:
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        {(["protein", "carbs", "fat", "fiber"] as const).map(
                            (nutrient) => (
                                <div
                                    key={nutrient}
                                    className="flex flex-col space-y-2"
                                >
                                    <Label htmlFor={nutrient}>
                                        {nutrient.charAt(0).toUpperCase() +
                                            nutrient.slice(1)}{" "}
                                        (g)
                                    </Label>
                                    <Input
                                        id={nutrient}
                                        name={nutrient}
                                        type="number"
                                        min="0"
                                        step="0.1"
                                        value={manualInput[nutrient]}
                                        onChange={handleManualInputChange}
                                        className="bg-lime-50"
                                    />
                                </div>
                            )
                        )}
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleManualInputSubmit} className="bg-orange-950">
                            Submit
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
