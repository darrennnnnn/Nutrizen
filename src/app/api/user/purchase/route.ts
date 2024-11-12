import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth/auth";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { itemType, itemName, price } = await req.json();

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        if (user.coins < price) {
            return NextResponse.json(
                { error: "Insufficient coins" },
                { status: 400 }
            );
        }

        // Check if user already owns the item
        const ownedItemsField = `owned${
            itemType.charAt(0).toUpperCase() + itemType.slice(1)
        }`; // Note the added 's'
        const ownedItems =
            (user[
                ownedItemsField as keyof typeof user
            ] as unknown as string[]) || [];

        if (ownedItems.includes(itemName)) {
            return NextResponse.json(
                { error: "You already own this item" },
                { status: 400 }
            );
        }

        const updatedUser = await prisma.user.update({
            where: {
                email: session.user.email,
            },
            data: {
                coins: user.coins - price,
                ownedColors:
                    itemType === "colors" ? { push: itemName } : undefined,
                ownedPets: itemType === "pets" ? { push: itemName } : undefined,
                ownedAccessories:
                    itemType === "accessories" ? { push: itemName } : undefined,
            },
            select: {
                coins: true,
                ownedColors: true,
                ownedPets: true,
                ownedAccessories: true,
            } satisfies Prisma.UserSelect,
        });

        return NextResponse.json({
            coins: updatedUser.coins,
            message: "Purchase successful",
        });
    } catch (error) {
        console.error("Purchase error:", error);
        return NextResponse.json(
            { error: "Failed to process purchase" },
            { status: 500 }
        );
    }
}
