import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { SetStateAction, useState } from "react";
import { ColorOptions } from "@/lib/types";
import { shopItems } from "@/lib/shopItems";
import Image from "next/image";

interface UserProfileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onColorUpdate: (color: SetStateAction<string>) => void;
    ownedColors: string[];
    ownedPets: string[];
    onPetUpdate: (pet: SetStateAction<string>) => void;
    currentPet: string;
    onAccessoryUpdate: (accessory: SetStateAction<string>) => void;
    currentAccessory: string;
    ownedAccessories: string[];
}

export default function CustomizeDrawer({
    isOpen,
    onClose,
    onColorUpdate,
    ownedColors,
    ownedPets,
    onPetUpdate,
    currentPet,
    onAccessoryUpdate,
    currentAccessory,
    ownedAccessories,
}: Readonly<UserProfileDrawerProps>) {
    const [activeTab, setActiveTab] = useState("colors");
    const [loading, setLoading] = useState<string>("");

    const handleEquipColor = async (colorName: string) => {
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

    const handleEquipPet = async (petName: string) => {
        setLoading(petName);

        try {
            const response = await fetch("/api/user/pet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ pet: petName }),
            });

            if (!response.ok) {
                throw new Error("Failed updating pet");
            }

            onPetUpdate(petName);
        } catch (error) {
            console.log("error updating pet", error);
        } finally {
            setLoading("");
        }
    };

    const handleEquipAccessory = async (accessoryName: string) => {
        setLoading(accessoryName);

        try {
            const response = await fetch("/api/user/accessory", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ accessory: accessoryName }),
            });
            if (!response.ok) {
                throw new Error("Failed updating accessory");
            }
            onAccessoryUpdate(accessoryName);
        } catch (error) {
            console.log("error updating accessory", error);
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
                <div className="h-96 overflow-auto p-2">
                    <div className="grid grid-cols-2 gap-2">
                        {activeTab === "colors" &&
                            shopItems.colors.map(
                                (item) =>
                                    ownedColors.includes(item.name) && (
                                        <div
                                            key={item.name}
                                            className="bg-lime-50 rounded-md p-2 flex flex-col items-center capitalize h-44"
                                        >
                                            <p>{item.name}</p>
                                            <div
                                                className={`w-20 h-20 rounded-full my-2`}
                                                style={{
                                                    backgroundColor: item.color,
                                                }}
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
                                    )
                            )}
                        {activeTab === "pets" &&
                            shopItems.pets.map(
                                (item) =>
                                    ownedPets.includes(item.name) && (
                                        <div
                                            key={item.name}
                                            className="bg-lime-50 rounded-md p-2 flex flex-col items-center capitalize h-60 justify-between"
                                        >
                                            <p>{item.name}</p>
                                            <div className="h-32">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <Button
                                                className="bg-orange-950 w-full"
                                                onClick={() =>
                                                    currentPet === item.name
                                                        ? handleEquipPet("")
                                                        : handleEquipPet(
                                                              item.name
                                                          )
                                                }
                                                disabled={loading === item.name}
                                            >
                                                <span className="font-bold">
                                                    {loading === item.name
                                                        ? "Equipping"
                                                        : currentPet ===
                                                          item.name
                                                        ? "Unequip"
                                                        : "Equip"}
                                                </span>
                                            </Button>
                                        </div>
                                    )
                            )}
                        {activeTab === "accessories" &&
                            shopItems.accessories.map(
                                (item) =>
                                    ownedAccessories.includes(item.name) && (
                                        <div
                                            key={item.name}
                                            className="bg-lime-50 rounded-md p-2 flex flex-col items-center capitalize h-60 justify-between"
                                        >
                                            <p>{item.name}</p>
                                            <div className="h-32">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <Button
                                                className="bg-orange-950 w-full"
                                                onClick={() =>
                                                    currentAccessory ===
                                                    item.name
                                                        ? handleEquipAccessory(
                                                              ""
                                                          )
                                                        : handleEquipAccessory(
                                                              item.name
                                                          )
                                                }
                                                disabled={loading === item.name}
                                            >
                                                <span className="font-bold">
                                                    {loading === item.name
                                                        ? "Equipping"
                                                        : currentAccessory ===
                                                          item.name
                                                        ? "Unequip"
                                                        : "Equip"}
                                                </span>
                                            </Button>
                                        </div>
                                    )
                            )}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
