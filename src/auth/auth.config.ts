import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export default {
    providers: [GitHub, Google],
    callbacks: {
        authorized: async ({ auth }) => {
            return !!auth;
        },
    },
    pages: {
        signIn: "/login",
    },
} satisfies NextAuthConfig;
