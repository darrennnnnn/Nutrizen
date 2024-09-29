import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const apiKey = process.env.FOODVISOR_API_KEY;
    const apiUrl = "https://vision.foodvisor.io/api/1.0/en/analysis/";

    if (!apiKey) {
        return NextResponse.json(
            { error: "API key is not set" },
            { status: 500 }
        );
    }

    try {
        const formData = await req.formData();
        const file = formData.get("image") as File | null;

        if (!file) {
            return NextResponse.json(
                { error: "No image file provided" },
                { status: 400 }
            );
        }

        const body = new FormData();
        body.append("image", file);

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Api-Key ${apiKey}`,
            },
            body: body,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
