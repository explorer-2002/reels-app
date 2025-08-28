import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials?.email });

          if (!user) {
            throw new Error("No user found with this email");
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);

          if (!isValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            email: user.email
          }
        } catch (error) {
            console.error("Auth error: ", error);
            throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.id = user.id
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },

    async redirect({ baseUrl, url }) {
      // if (url.startsWith("/")) return `${baseUrl}${url}`

      // else if (new URL(url).origin === baseUrl) return url
      console.log('baseUrl: ', baseUrl, ' url: ', url);
      // // return baseUrl
      if (url.startsWith("/")){
        console.log(`Redirecting first to ${baseUrl}${url}`);
         return `${baseUrl}${url}`
      }
      
      // Allows callback URLs on the same origin
      // else if (new URL(url).origin === baseUrl){
      //   console.log(`Redirecting second to ${url}`);
      //   console.log("Origin ", new URL(url).origin, " baseUrl ", baseUrl)
      //    return url
      // }
      
      // Default to redirecting to the base URL
      console.log(`Redirect third to ${baseUrl}`);

      return baseUrl;
    }
    
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 30*24*60*60
  },
  secret: process.env.NEXTAUTH_SECRET
};
