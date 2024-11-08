import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import React from "react";
import { GithubSignInButton } from "@/components/Auth/github-signin-button";
import { GoogleSignInButton } from "@/components/Auth/google-signin-button";

export default function LoginPage() {
    return (
        <div className="bg-gradient-to-b from-lime-100 to-emerald-100 h-screen items-center justify-center flex">
            <div className="p-8 flex flex-col gap-4">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-extrabold text-[#14532D]">
                        NUTRIZEN
                    </h1>
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-sm text-muted-foreground">
                            Track Your Nutrition, Elevate Your Wellness
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Login Here and Start Your Journey!
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <GoogleSignInButton />
                    <GithubSignInButton />
                </div>
            </div>
        </div>
    );
}
