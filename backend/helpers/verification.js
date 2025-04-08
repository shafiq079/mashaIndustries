const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Or use another service like SendGrid or SES
        auth: {
            user: process.env.EMAIL, // Your email address
            pass: process.env.EMAIL_PASSWORD, // Your email password or app password
        },
    });

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL, // sender address
        to: email, // recipient address
        subject: 'Email Verification',
        text: `Please verify your email by clicking on the link: ${verificationUrl}`,
    };

    // Send the email and handle errors
    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully');
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Error sending verification email');
    }
};
module.exports = sendVerificationEmail;
