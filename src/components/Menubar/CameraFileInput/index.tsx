import React, { ChangeEvent, useRef } from "react";
import { Camera } from "lucide-react";
import { CameraFileInputProps } from "@/lib/types";

export default function CameraFileInput({
    onImageCapture,
}: Readonly<CameraFileInputProps>) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const resizeImage = (
        file: File,
        maxWidth: number,
        maxHeight: number,
        quality: number
    ): Promise<Blob> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    ctx?.drawImage(img, 0, 0, width, height);
                    canvas.toBlob(
                        (blob) => {
                            resolve(blob as Blob);
                        },
                        "image/jpeg",
                        quality
                    );
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        });
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
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

    const handleCameraClick = () => fileInputRef.current?.click();

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
            <button
                onClick={handleCameraClick}
                className="p-3 bg-[#14532D] text-white rounded-full hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                <Camera className="w-6 h-6" />
            </button>
        </>
    );
}
