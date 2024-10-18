import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newIntakes = await req.json();

    try {
        const updatedUser = await prisma.user.update({
            where: {
                email: session.user?.email as string,
            },
            data: {
                currentIntake: {
                    update: {
                        calories: newIntakes.calories,
                        proteins: newIntakes.proteins,
                        carbs: newIntakes.carbs,
                        fat: newIntakes.fat,
                        fiber: newIntakes.fiber,
                    },
                },
                coins: {
                    increment: Math.floor(newIntakes.calories / 100),
                },
            },
            select: {
                currentIntake: true,
                coins: true,
            },
        });

        return NextResponse.json(
            {
                message: "Intake updated successfully",
                currentIntake: updatedUser.currentIntake,
                coins: updatedUser.coins,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating intake:", error);
        return NextResponse.json(
            { error: "Failed to update user data" },
            { status: 500 }
        );
    }
}
