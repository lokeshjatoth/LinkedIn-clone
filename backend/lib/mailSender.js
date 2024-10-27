import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const mailSender = async(email, title, body) =>{
    try{
        
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            secure: true,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })

        let info = await transporter.sendMail({
            from: '"LinkedIn Clone" <no-reply@linkedinclone.com>',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })
        //console.log("hello",process.env.MAIL_USER, process.env.MAIL_PASS); //Have to comment it out for deployment
        console.log(info);
        return info;
    }
    catch(error){
        console.log("Error while sending mail");
        console.log(error);
    }
}

export default mailSender;
