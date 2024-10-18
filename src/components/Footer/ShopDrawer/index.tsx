import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface ShopDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ShopDrawer({
    isOpen,
    onClose,
}: Readonly<ShopDrawerProps>) {
    return (
        <Drawer open={isOpen} onOpenChange={onClose}>
            <DrawerContent className="bg-gradient-to-t from-emerald-100 to-lime-100">
                <DrawerHeader>
                    <DrawerTitle>🚨Coming Soon!🚨</DrawerTitle>
                    <DrawerDescription>🚧🚧🚧🚧🚧</DrawerDescription>
                </DrawerHeader>

                <DrawerFooter>
                    <DrawerClose>
                        <p className="text-sm text-yellow-600 font-medium mb-4">
                            🚧🚧🚧🚧🚧
                        </p>
                        <Button type="submit" className="w-full">
                            🚧🚧🚧🚧🚧
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
