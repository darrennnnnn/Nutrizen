import { auth } from "@/auth/auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newColor = await req.json();

    try {
        const updatedUser = await prisma.user.update({
            where: {
                email: session.user?.email as string,
            },
            data: {
                color: newColor.color,
            },
        });

        return NextResponse.json({
            message: "Color updated successfully",
            color: updatedUser.color,
        });
    } catch (error) {
        console.error("Error updating color:", error);
        return NextResponse.json(
            { error: "Failed to update user data" },
            { status: 500 }
        );
    }
}
