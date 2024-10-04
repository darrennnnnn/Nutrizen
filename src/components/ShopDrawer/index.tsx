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
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Configure Your Targets</DrawerTitle>
                    <DrawerDescription>
                        Set your daily nutritional targets here. Calories are
                        automatically calculated.
                    </DrawerDescription>
                </DrawerHeader>

                <DrawerFooter>
                    <DrawerClose>
                        <p className="text-sm text-yellow-600 font-medium mb-4">
                            Warning: Saving changes will reset your current
                            intakes for the day to 0.
                        </p>
                        <Button type="submit" className="w-full">
                            Save Changes
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
