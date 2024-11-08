import { signIn } from "@/auth/auth";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";

export function GoogleSignInButton() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/" });
            }}
        >
            <Button
                size={"lg"}
                className="w-full bg-orange-950 flex items-center justify-center gap-2"
            >
                <FaGoogle size={20} />
                <p>Sign Up using Google</p>
            </Button>
        </form>
    );
}
