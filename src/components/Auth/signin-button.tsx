import { signIn } from "@/auth/auth";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";

export function SignInButton() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("github", { redirectTo: "/" });
            }}
        >
            <Button
                size={"lg"}
                type="submit"
                className="w-full bg-orange-950 flex items-center justify-center gap-2"
            >
                <FaGithub size={20} />
                <p>Sign Up using GitHub</p>
            </Button>
        </form>
    );
}
