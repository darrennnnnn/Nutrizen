import { Menu, User } from "lucide-react";
import CameraFileInput from "./CameraFileInput";

export default function Menubar() {
    return (
        <div className="border border-t-2 w-full flex items-center justify-around py-2">
            <Menu />
            <CameraFileInput />
            <User />
        </div>
    );
}
