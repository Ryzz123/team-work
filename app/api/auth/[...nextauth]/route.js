import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { getConnection } from "@/utils/database";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      session.user.name = sessionUser.username;
      session.user.role = sessionUser.role;
      session.user.bio = sessionUser.bio;
      session.user.profesi = sessionUser.profesi;
      session.user.website = sessionUser.website;
      session.user.instagram = sessionUser.instagram;
      session.user.github = sessionUser.github;
      return session;
    },
    async signIn({ profile }) {
      try {
        await getConnection();

        const userexists = await User.findOne({ email: profile.email });
        if (!userexists) {
          const username = profile.name.split(" ").join("");
          await User.create({
            email: profile.email,
            username: username.toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
