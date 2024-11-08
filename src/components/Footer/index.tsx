import { Shirt, Settings, Store, UserRound } from "lucide-react";
import CameraFileInput from "./CameraFileInput";

interface FooterProps {
    onSettingsClick: () => void;
    onShopClick: () => void;
    onProfileClick: () => void;
    onImageCapture: (imageUrl: string, file: File) => void;
    onManualInput: (data: {
        protein: number;
        carbs: number;
        fat: number;
        fiber: number;
    }) => void;
    onCustomizeClick: () => void;
}

export default function Footer({
    onSettingsClick,
    onShopClick,
    onProfileClick,
    onImageCapture,
    onManualInput,
    onCustomizeClick,
}: Readonly<FooterProps>) {
    return (
        <div className="w-full flex items-center justify-around py-2">
            <button onClick={onSettingsClick} className="p-3">
                <Settings />
            </button>
            <button onClick={onCustomizeClick} className="p-3">
                <Shirt />
            </button>
            <CameraFileInput
                onImageCapture={onImageCapture}
                onManualInput={onManualInput}
            />
            {/* store */}
            <button onClick={onShopClick} className="p-3">
                <Store />
            </button>
            {/* user profile */}
            <button onClick={onProfileClick} className="p-3">
                <UserRound />
            </button>
        </div>
    );
}
