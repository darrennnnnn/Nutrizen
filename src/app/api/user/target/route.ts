import { auth } from "@/auth/auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newTargets = await req.json();

    try {
        const updatedUser = await prisma.user.update({
            where: {
                email: session.user?.email as string,
            },
            data: {
                target: {
                    update: {
                        calories: newTargets.calories,
                        proteins: newTargets.proteins,
                        carbs: newTargets.carbs,
                        fat: newTargets.fat,
                        fiber: newTargets.fiber,
                    },
                },
                currentIntake: {
                    update: {
                        calories: 0,
                        proteins: 0,
                        carbs: 0,
                        fat: 0,
                        fiber: 0,
                    },
                },
            },
            select: {
                target: true,
                currentIntake: true,
            },
        });
        return NextResponse.json({
            message: "Targets updated successfully",
            targets: updatedUser.target,
            currentIntake: updatedUser.currentIntake,
        });
    } catch (error) {
        console.error("Error updating targets:", error);
        return NextResponse.json(
            { error: "Failed to update user data" },
            { status: 500 }
        );
    }
}
