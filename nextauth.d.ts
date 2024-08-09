import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop
     * on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            emailVerified?: string;
            role: string;
            image?: string;
        } & DefaultSession[ 'user' ];
    }
}