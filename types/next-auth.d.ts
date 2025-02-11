import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
  }

  interface JWT {
    accessToken?: string;
  }
}
