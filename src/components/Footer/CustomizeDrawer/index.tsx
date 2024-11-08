import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { SetStateAction, useState } from "react";
import { ColorOptions } from "@/lib/types";

interface UserProfileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onColorUpdate: (color: SetStateAction<ColorOptions>) => void;
}

const colors = [
    {
        name: "blue",
        color: "bg-[#92DBFF]",
    },
    {
        name: "brown",
        color: "bg-[#BE7C5B]",
    },
    {
        name: "cyan",
        color: "bg-[#80FFB9]",
    },
    {
        name: "green",
        color: "bg-[#B7FF80]",
    },
    {
        name: "orange",
        color: "bg-[#FFBE6F]",
    },
    {
        name: "pink",
        color: "bg-[#FF94FA]",
    },
    {
        name: "purple",
        color: "bg-[#8F8FFF]",
    },
    {
        name: "red",
        color: "bg-[#FF7878]",
    },
    {
        name: "white",
        color: "bg-white",
    },
    {
        name: "yellow",
        color: "bg-[#FFED80]",
    },
];

export default function CustomizeDrawer({
    isOpen,
    onClose,
    onColorUpdate,
}: Readonly<UserProfileDrawerProps>) {
    const [activeTab, setActiveTab] = useState("colors");
    const [loading, setLoading] = useState<SetStateAction<ColorOptions>>("");

    const handleEquipColor = async (
        colorName: SetStateAction<
            | "yellow"
            | "blue"
            | "brown"
            | "cyan"
            | "green"
            | "orange"
            | "pink"
            | "purple"
            | "red"
            | "white"
            | ""
        >
    ) => {
        setLoading(colorName);

        try {
            const response = await fetch("/api/user/color", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ color: colorName }),
            });

            if (!response.ok) {
                throw new Error("Failed updating color");
            }

            onColorUpdate(colorName);
        } catch (error) {
            console.log("error updating color", error);
        } finally {
            setLoading("");
        }
    };

    return (
        <Drawer open={isOpen} onOpenChange={onClose}>
            <DrawerContent className="bg-gradient-to-t from-emerald-100 to-lime-100">
                <DrawerHeader>
                    <DrawerTitle className="flex items-center gap-3 justify-center">
                        Customize your Avatar!
                    </DrawerTitle>
                </DrawerHeader>
                <div
                    id="scrollbar"
                    className="flex gap-2 items-center justify-center bg-emerald-100 py-4"
                >
                    <button
                        onClick={() => setActiveTab("colors")}
                        className="bg-lime-50 px-4 py-2 border-solid border-[#9E9E9E] rounded-md border-2"
                    >
                        Colors
                    </button>
                    <button
                        onClick={() => setActiveTab("pets")}
                        className="bg-lime-50 px-4 py-2 border-solid border-[#9E9E9E] rounded-md border-2"
                    >
                        Pets
                    </button>
                    <button
                        onClick={() => setActiveTab("accessories")}
                        className="bg-lime-50 px-4 py-2 border-solid border-[#9E9E9E] rounded-md border-2"
                    >
                        Accessories
                    </button>
                </div>
                <div className="max-h-96 overflow-auto p-2">
                    <div className="grid grid-cols-2 gap-2">
                        {activeTab === "colors" &&
                            colors.map((item) => (
                                <div
                                    key={item.name}
                                    className="bg-lime-50 rounded-md p-2 flex flex-col items-center capitalize"
                                >
                                    <p>{item.name}</p>
                                    <div
                                        className={`w-20 h-20 rounded-full ${item.color} my-2`}
                                    ></div>
                                    <Button
                                        className="bg-orange-950 w-full"
                                        onClick={() =>
                                            handleEquipColor(
                                                item.name as ColorOptions
                                            )
                                        }
                                        disabled={loading === item.name}
                                    >
                                        <span className="font-bold">
                                            {loading === item.name
                                                ? "Equipping"
                                                : "Equip"}
                                        </span>
                                    </Button>
                                </div>
                            ))}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
