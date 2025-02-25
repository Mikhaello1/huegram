import nodemailer from "nodemailer";
import dotenv from "dotenv"


dotenv.config();
console.log("EMAIL_USER = " + process.env.EMAIL_USER)

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

export const sendActivationLink = async (to, link) => {
    try{
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: "Account activation on HUEGRAM",
            text: '',
            html:
                `
                    <div>
                        <h1>For activation go by the link:</h1>
                        <a href="${link}">Click here!</a>
                    </div>
                `
        })
    }
    catch(e){
        console.log(e)
    }
}