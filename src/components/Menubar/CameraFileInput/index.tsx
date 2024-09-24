"use client";

import Image from "next/image";
import { ChangeEvent, useState, useEffect, useRef } from "react";
import { Camera } from "lucide-react";

export default function CameraFileInput() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null);
        }
    };

    const handleCameraClick = () => {
        fileInputRef.current?.click();
    };

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

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
                className="p-3 bg-black text-white rounded-full hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                <Camera className="w-6 h-6" />
            </button>
            {/* {selectedFile && (
                <div className="mt-4">
                    <p className="mb-2">Selected file: {selectedFile.name}</p>
                    {previewUrl && (
                        <Image
                            width={300}
                            height={300}
                            src={previewUrl}
                            alt="Preview"
                            className="max-w-full h-auto rounded-lg shadow-lg"
                        />
                    )}
                </div>
            )} */}
        </>
    );
}
