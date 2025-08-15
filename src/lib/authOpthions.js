import { signInUser } from "@/app/actions/auth/signInUser";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect, { collectionNameObj } from "./dbConnect";

export const authOptions = {
  providers: [
    //email & pass
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await signInUser(credentials);
        // console.log(user);

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),

    // google login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/sign-in", // your custom login page
    error: "/sign-in", // redirect here if login fails
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account) {
        const { providerAccountId, provider } = account;
        const { email: user_email, image, name } = user;

        const userCollection = await dbConnect(
          collectionNameObj.userCollection
        );
        const existingUser = await userCollection.findOne({
          providerAccountId,
        });

        if (!existingUser) {
          const payload = {
            email:user_email,
            image,
            name,
            providerAccountId,
            provider,
          };
          await userCollection.insertOne(payload);
        }
      }
      return true;
    },
  },
};
