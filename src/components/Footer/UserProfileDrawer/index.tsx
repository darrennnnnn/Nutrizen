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

interface UserProfileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function UserProfileDrawer({
    isOpen,
    onClose,
}: Readonly<UserProfileDrawerProps>) {
    return (
        <Drawer open={isOpen} onOpenChange={onClose}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>🚨User Profile Coming Soon!🚨</DrawerTitle>
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
