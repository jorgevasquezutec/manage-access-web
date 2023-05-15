import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "@/lib/db"


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db as any),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials, req) {

                const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
                // console.log("user", user)
                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user
                }
                // console.log("error", user)
                throw new Error(user.error)

                // return throw  Error("Invalid credentials")
                // Return null if user data could not be retrieved
                return null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.name = user.name
                token.email = user.email
                token.picture = user.image
            }

            return token
        },
        async session({ session, token }) {
            if (token) {
                // @ts-ignore
                session.user.id = token.id
                // @ts-ignore
                session.user.name = token.name
                // @ts-ignore
                session.user.email = token.email
                // @ts-ignore
                session.user.image = token.picture
            }
            console.log("session", session)
            return session
        },
    },

}  
