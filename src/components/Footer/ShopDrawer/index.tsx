import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaCoins } from "react-icons/fa";
import { useState } from "react";
import { shopItems } from "@/lib/shopItems";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

interface ShopDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    coins: number;
    onPurchase: (newCoins: number) => void;
    ownedColors: string[];
    ownedPets: string[];
}

export default function ShopDrawer({
    isOpen,
    onClose,
    coins,
    onPurchase,
    ownedColors,
    ownedPets,
}: Readonly<ShopDrawerProps>) {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState("colors");
    const [loading, setLoading] = useState("");
    const { toast } = useToast();

    const handlePurchase = async (
        itemType: string,
        itemName: string,
        price: number
    ) => {
        if (!session) {
            toast({
                variant: "destructive",
                title: "Authentication Required",
                description: "Please sign in to make purchases",
            });
            return;
        }

        setLoading(itemName);

        try {
            const response = await fetch("/api/user/purchase", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    itemType,
                    itemName,
                    price,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to purchase item");
            }

            onPurchase(data.coins);
            toast({
                title: "Purchase Successful",
                description: `You've purchased ${itemName}!`,
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Purchase Failed",
                description:
                    error instanceof Error
                        ? error.message
                        : "Failed to purchase item",
            });
        } finally {
            setLoading("");
        }
    };

    return (
        <Drawer open={isOpen} onOpenChange={onClose}>
            <DrawerContent className="bg-gradient-to-t from-emerald-100 to-lime-100">
                <DrawerHeader>
                    <DrawerTitle className="flex items-center gap-3 justify-center">
                        Buy stuff to customize your Avatar!
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
                            shopItems.colors.map((item) => (
                                <div
                                    key={item.name}
                                    className="bg-lime-50 rounded-md p-2 flex flex-col items-center capitalize h-44"
                                >
                                    <p>{item.name}</p>
                                    <div
                                        className={`w-20 h-20 rounded-full my-2`}
                                        style={{ backgroundColor: item.color }}
                                    ></div>
                                    <Button
                                        className="bg-orange-950 w-full"
                                        onClick={() =>
                                            handlePurchase(
                                                activeTab,
                                                item.name,
                                                item.price
                                            )
                                        }
                                        disabled={
                                            loading === item.name ||
                                            coins < item.price ||
                                            ownedColors.includes(item.name)
                                        }
                                    >
                                        {ownedColors.includes(item.name) ? (
                                            <span className="font-bold">
                                                Owned
                                            </span>
                                        ) : (
                                            <>
                                                <FaCoins className="mr-1" />
                                                <span className="font-bold">
                                                    {loading === item.name
                                                        ? "Purchasing..."
                                                        : item.price}
                                                </span>
                                            </>
                                        )}
                                    </Button>
                                </div>
                            ))}
                        {activeTab === "pets" &&
                            shopItems.pets.map((item) => (
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
                                            handlePurchase(
                                                activeTab,
                                                item.name,
                                                item.price
                                            )
                                        }
                                        disabled={
                                            loading === item.name ||
                                            coins < item.price ||
                                            ownedPets.includes(item.name)
                                        }
                                    >
                                        {ownedPets.includes(item.name) ? (
                                            <span className="font-bold">
                                                Owned
                                            </span>
                                        ) : (
                                            <>
                                                <FaCoins className="mr-1" />
                                                <span className="font-bold">
                                                    {loading === item.name
                                                        ? "Purchasing..."
                                                        : item.price}
                                                </span>
                                            </>
                                        )}
                                    </Button>
                                </div>
                            ))}
                        {activeTab === "accessories" &&
                            shopItems.accessories.map((item) => (
                                <div
                                    key={item.name}
                                    className="bg-lime-50 rounded-md p-2 flex flex-col items-center capitalize h-60 justify-between"
                                >
                                    <p>{item.name}</p>
                                    <Image src={item.image} alt={item.name} />
                                    <Button
                                        className="bg-orange-950 w-full"
                                        onClick={() =>
                                            handlePurchase(
                                                activeTab,
                                                item.name,
                                                item.price
                                            )
                                        }
                                        disabled={
                                            loading === item.name ||
                                            coins < item.price
                                        }
                                    >
                                        <FaCoins className="mr-1" />
                                        <span className="font-bold">
                                            {loading === item.name
                                                ? "Purchasing..."
                                                : item.price}
                                        </span>
                                    </Button>
                                </div>
                            ))}
                    </div>
                </div>
            </DrawerContent>
            {/* <DrawerContent className="bg-gradient-to-t from-emerald-100 to-lime-100">
                <DrawerHeader>
                    <DrawerTitle>Shop</DrawerTitle>
                    <DrawerDescription>🚧🚧🚧🚧🚧</DrawerDescription>
                </DrawerHeader>
                <div className="max-h-96 overflow-auto p-2">
                    <div className="grid grid-cols-2 gap-2">
                        {shopItems["faceItems"].map((item) => (
                            <div
                                key={item.name}
                                className="bg-lime-50 rounded-md p-2 flex flex-col items-center"
                            >
                                <p>{item.name}</p>
                                <Image src={item.image} alt={item.name} />
                                <Button className="bg-orange-950 w-full">
                                    <FaCoins className="mr-1" />
                                    <span className="font-bold">
                                        {item.price}
                                    </span>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </DrawerContent> */}
        </Drawer>
    );
}
