import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        await prisma.intake.updateMany({
            data: {
                calories: 0,
                proteins: 0,
                carbs: 0,
                fat: 0,
                fiber: 0,
            },
        });

        return NextResponse.json(
            { message: "All intakes reset successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error resetting intakes:", error);
        return NextResponse.json(
            { error: "Failed to reset intakes" },
            { status: 500 }
        );
    }
}
