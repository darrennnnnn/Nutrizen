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
import { Session } from "next-auth";
import Image from "next/image";

interface UserProfileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    userData: Session;
}

export default function UserProfileDrawer({
    isOpen,
    onClose,
    userData,
}: Readonly<UserProfileDrawerProps>) {
    return (
        <Drawer open={isOpen} onOpenChange={onClose}>
            <DrawerContent className="bg-gradient-to-t from-emerald-100 to-lime-100">
                <DrawerHeader>
                    <DrawerTitle className="flex items-center gap-3">
                        <Image
                            src={userData.user?.image ?? ""}
                            alt="User profile image"
                            width={100}
                            height={100}
                        />
                        <div className="flex flex-col items-start text-base">
                            <p>{userData.user?.name}</p>{" "}
                            <p className="text-[#9E9E9E] text-sm">
                                {userData.user?.email}
                            </p>{" "}
                        </div>
                    </DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                </DrawerHeader>

                <DrawerFooter>
                    <DrawerClose>
                        <p className="text-sm text-yellow-600 font-medium mb-4">
                            {userData?.user?.name}
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
