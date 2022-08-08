// user authentication with google, facebook and email/password login
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import { redirect } from "next/dist/server/api-utils";
import { PrismaClient } from "@prisma/client";

export default NextAuth({
    pages: {
        signIn: "/signin",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                    scope: "openid email profile",
                },
            },
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID as string,
            clientSecret: process.env.FACEBOOK_SECRET as string,
        }),
        CredentialProvider({
            name: "credentials",
            credentials: {
                username: {
                    label: "Email",
                    type: "email",
                    placeholder: "admin@admin.com",
                },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                const prisma = new PrismaClient();
                // database look up to see if username and password match
                console.log("authenticated");
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.username,
                    },
                });
                console.log("prism user", user);
                if (user && credentials?.password === user.passwordHash) {
                    return {
                        id: user.identifier,
                        name: user.firstname,
                        email: user.email,
                        image: user.profilePicture,
                    };
                }
                // login failed
                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    secret: process.env.JWT_SECRET,
    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token, user }) {
            session.accessToken = token.accessToken;
            session.user.id = token.sub;
            return session;
        },
        async redirect({ url, baseUrl }) {
            if (url === "profile") {
                return "/";
            }
            return "/welcome";
        },
        // async redirect({url, _baseUrl}) => {
        //   if (url === "/profile") {
        //     return Promise.resolve("/");
        //   }
        //   return Promise.resolve("/");
        // }
        // session: async ({ session, token }) => {
        //   if (token) {
        //     session.user.email = token.token.user.email;
        //     session.user.name = token.token.user.name;
        //     session.user.image = token.token.user.image;
        //   }
        //   return session;
        // },
    },
});
