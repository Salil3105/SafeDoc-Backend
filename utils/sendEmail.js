const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
    try {
        let testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 465,
            secure: true , // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        })

        // now send email 
        await transporter.sendMail({
            from: process.env.USER,
            to: 'salilchandwadkar31@gmail.com',
            subject: 'Fees Regarding Mail',
            text: 'When you get this mail, it means you have paid your fees',
            html: '<b>' + text + '</b>'
        });
        console.log("email send successfully");

    } catch (error) {
        console.log('Email not sent');
        console.log("Error : ", error);
    }
}

module.exports = sendEmail;