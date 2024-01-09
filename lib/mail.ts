import { Resend } from "resend";
import ConfirmMail from "@/components/emails/confirm-mail";
import TwoFactorEmail from "@/components/emails/two-factor-email";

const resend = new Resend(process.env.RESEND_API_KEY);
const link = process.env.APP_URL;



export const sendPasswordResetemail = async (
    email: string,
    token: string,
) => {

    const resetLink = `${link}/auth/new-password?token=${token}`

    await resend.emails.send({
        from: "Trung Nghia from NextAuth <reset@nghiapt.tech>",
        to: email,
        subject: "NextAuth by NghiaPT | Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    })
}

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `${link}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "Trung Nghia from NextAuth <confirm@nghiapt.tech>",
        to: email,
        subject: "NextAuth by NghiaPT | Confirm your email",
        react: ConfirmMail({  inviteLink: confirmLink })
    });
}

export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string
) => {

    await resend.emails.send({
        from: "Trung Nghia from NextAuth <confirm@nghiapt.tech>",
        to: email,
        subject: "NextAuth by NghiaPT | 2FA code",
        react: TwoFactorEmail({ validationCode: token })
    })
}