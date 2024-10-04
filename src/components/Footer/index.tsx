import { Settings, Store } from "lucide-react";
import CameraFileInput from "../CameraFileInput";

interface FooterProps {
    onSettingsClick: () => void;
    onShopClick: () => void;
    onImageCapture: (imageUrl: string, file: File) => void;
    onManualInput: (data: {
        protein: number;
        carbs: number;
        fat: number;
        fiber: number;
    }) => void;
}

export default function Footer({
    onSettingsClick,
    onShopClick,
    onImageCapture,
    onManualInput,
}: Readonly<FooterProps>) {
    return (
        <div className="w-full flex items-center justify-around py-2">
            <button onClick={onSettingsClick} className="p-3">
                <Settings />
            </button>
            <CameraFileInput
                onImageCapture={onImageCapture}
                onManualInput={onManualInput}
            />
            <button onClick={onShopClick} className="p-3">
                <Store />
            </button>
        </div>
    );
}
