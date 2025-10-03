import {betterAuth} from "better-auth";
import {prismaAdapter} from 'better-auth/adapters/prisma';
import prisma from "./prisma";
import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),
    emailAndPassword: {
        enabled: true,
        resetPasswordTokenExpiresIn: 5 * 60,
        sendResetPassword: async({user, url, token}, request) => {
            await resend.emails.send({
                from: "ymovies@resend.dev",
                to: user.email,
                subject: "Reset your password",
                text: `Click the link to reset your password: ${url}`
            })
        }
    },
    socialProviders: {
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
    },
})