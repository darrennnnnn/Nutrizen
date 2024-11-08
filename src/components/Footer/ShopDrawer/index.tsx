import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import SunGlasses from "../../../../public/63ffd408044a42f175317026e8f9e884.png";
import Image from "next/image";
import { FaCoins } from "react-icons/fa";

interface ShopDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const shopItems = {
    faceItems: [
        {
            name: "sunglasses",
            image: SunGlasses,
            price: 15,
        },
        {
            name: "sunglasses",
            image: SunGlasses,
            price: 15,
        },
        {
            name: "sunglasses",
            image: SunGlasses,
            price: 15,
        },
    ],
    pets: [
        {
            name: "sunglasses",
            image: SunGlasses,
            price: 15,
        },
        {
            name: "sunglasses",
            image: SunGlasses,
            price: 15,
        },
        {
            name: "sunglasses",
            image: SunGlasses,
            price: 15,
        },
    ],
};

export default function ShopDrawer({
    isOpen,
    onClose,
}: Readonly<ShopDrawerProps>) {
    return (
        <Drawer open={isOpen} onOpenChange={onClose}>
            <DrawerContent className="bg-gradient-to-t from-emerald-100 to-lime-100">
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
            </DrawerContent>
        </Drawer>
    );
}
