import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { addMinutes } from "date-fns";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
        },
      },
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
      authorize: (credentials) => {
        // database look up to see if username and password match
        if (
          credentials.username === "admin@admin.com" &&
          credentials.password === "admin"
        ) {
          return {
            id: 1,
            name: "admin",
            email: "admin@admin.com",
          };
        }
        // login failed
        return null;
      },
    }),
  ],
  jwt: {
    encryption: true,
    secret: "test",
  },
  secret: process.env.secret,
  callbacks: {
    async jwt(token, account, user) {
      if (user) {
        token.id = account.id;
      }
      return token;
    },
    redirect: async (url, _baseUrl) => {
      if (url === "/profile") {
        return Promise.resolve("/");
      }
      return Promise.resolve("/");
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.email = token.token.user.email;
        session.user.name = token.token.user.name;
        session.user.image = token.token.user.image;
      }
      return session;
    },
  },
});
