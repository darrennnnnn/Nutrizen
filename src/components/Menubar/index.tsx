import { Menu, User } from "lucide-react";
import CameraFileInput from "./CameraFileInput";
import { MenubarProps } from "@/lib/types";

export default function Menubar({ onImageCapture }: Readonly<MenubarProps>) {
    return (
        <div className="border border-t-2 w-full flex items-center justify-around py-2">
            <Menu />
            <CameraFileInput onImageCapture={onImageCapture} />
            <User />
        </div>
    );
}
