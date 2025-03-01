import NextAuth from "@node_modules/next-auth";
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from "@utils/database";
import { User } from "@models/user";


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecert: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],

    async session({ session }) {
        const sessionUser = await User.findOne({
            email: session.user.email
        })

        session.user.id = sessionUser._id.toString();

        return session;

    },

    async signIn({ profile }) {
        try {
            await connectToDB();

            const userExists = await User.findOne({
                email: profile.email
            })

            if (!userExists) {
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(' ', '').tolowercase(),
                    image: profile.image,
                })
            }

            // check if the user already exist 

            // if not, create a new user

            return true;
        } catch (error) {
            console.log(error);
        }

    }
})

export { handler as GET, handler as POST }