import type { Metadata } from "next";
import "./globals.css";
import { Lexend } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";

const space = Lexend({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Nutrizen",
    description: "Gamify your nutrition journey!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <SessionProvider>
                <body
                    className={`${space.className} bg-gradient-to-b from-lime-100 to-emerald-100`}
                >
                    {children}
                    <Toaster />
                </body>
            </SessionProvider>
        </html>
    );
}
