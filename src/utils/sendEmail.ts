import { createTransport } from "nodemailer";

const transport = createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

export const sendEmail = (email:string,link:string,username:string)=>{
    const option = {
        from:process.env.EMAIL,
        to:email,
        subject:"Email reset password",
        html:
        `<div>
            <h1>Hello ${username}</h1>
            <p>Click on <a href=${link}>the link</a> below to reset your password</p>
            <span style='color:red;'>please note this link will expire in 5 minutes</span>
        </div>`
        ,
    }

    return transport.sendMail(option)
}