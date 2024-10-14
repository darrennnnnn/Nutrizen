import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth/auth";

export async function GET() {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user?.email as string },
            include: { currentIntake: true, target: true },
        });
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }
        if (!user.currentIntake) {
            user.currentIntake = await prisma.intake.create({
                data: { userId: user.id },
            });
        }

        if (!user.target) {
            user.target = await prisma.targets.create({
                data: { userId: user.id },
            });
        }

        return NextResponse.json({
            currentIntake: user.currentIntake,
            targets: user.target,
            coins: user.coins,
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json(
            { error: "Failed to fetch user data" },
            { status: 500 }
        );
    }
}
