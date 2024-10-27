import mailSender from "../lib/mailSender.js";
import { createWelcomeEmailTemplate, createCommentNotificationEmailTemplate, createConnectionAcceptedEmailTemplate } from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, profileUrl) => {
    try {
        const template = createWelcomeEmailTemplate(name, profileUrl);
        const response = await mailSender(email, "Welcome to UnLinked", template);
        console.log("Welcome Email sent successfully:", response);
    } catch (error) {
        console.error("Error sending welcome email:", error.message);
    }
};

export const sendCommentNotificationEmail = async (
    recipientEmail,
    recipientName,
    commenterName,
    postUrl,
    commentContent
) => {
    const recipient = recipientEmail;
    try{
        const template = createCommentNotificationEmailTemplate(
            recipientName,
            commenterName,
            postUrl,
            commentContent
        );
        const response = await mailSender(recipient, "New Comment on Your Post", template);
        console.log("Comment Notification Email sent successfully:", response);
    } catch(error){
        throw error;
    }
    
};

export const sendConnectionAcceptedEmail = async (senderEmail, senderName, recipientName, profileUrl) => {
    const recipient = senderEmail;
    try{
        const template = createConnectionAcceptedEmailTemplate(
            senderName,
            recipientName,
            profileUrl
        );
        const response = await mailSender(recipient, `${recipientName} has accepted your connection request}`, template);
        console.log("Connection Accepted Email sent successfully:", response);
    } catch(error){
        throw error;
    }
}
