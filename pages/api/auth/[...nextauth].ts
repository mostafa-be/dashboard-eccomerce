import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
//import GitHubProvider from "next-auth/providers/github";
import AppleProvider from "next-auth/providers/apple";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        AppleProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        }),
    ],
    secret:process.env.SECRET,
};

export default NextAuth(authOptions)


