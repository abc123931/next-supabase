import { createClient } from "@supabase/supabase-js";
import { sign } from "jsonwebtoken";
import NextAuth from "next-auth";
import LineProvider from "next-auth/providers/line";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_API_URL,
  process.env.SERVICE_ROLE_KEY
);

/**
 * ここ参考
 * https://hasura.io/learn/graphql/hasura-authentication/integrations/nextjs-auth/
 */
export default NextAuth({
  providers: [
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID,
      clientSecret: process.env.LINE_CLIENT_SECRET,
      idToken: true,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const { error } = await supabase
        .from("users")
        .upsert(
          { user_id: user.id, name: user.name ?? "" },
          { onConflict: "user_id" }
        );
      if (error) {
        console.error({ error });
        throw new Error();
      }
      return true;
    },
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      const encodedToken = sign(
        {
          ...token,
          aud: "authenticated",
          role: "authenticated",
          user_metadata: {},
          app_metadata: {},
        },
        process.env.NEXTAUTH_SECRET,
        { algorithm: "HS256" }
      );
      session.token = encodedToken;
      session.user = { id: token.sub ?? "" };
      return session;
    },
  },
});
