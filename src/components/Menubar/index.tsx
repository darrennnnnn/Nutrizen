import { Pencil, Settings } from "lucide-react";
import CameraFileInput from "./CameraFileInput";
import { MenubarProps } from "@/lib/types";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";

export default function Menubar({ onImageCapture }: Readonly<MenubarProps>) {
    return (
        <div className="border border-t-2 w-full flex items-center justify-around py-2">
            <Drawer>
                <DrawerTrigger>
                    {" "}
                    <Settings />
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Configure Your Intakes</DrawerTitle>
                        <DrawerDescription>
                            This action will reset your current intakes.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <CameraFileInput onImageCapture={onImageCapture} />
            <Pencil />
        </div>
    );
}
