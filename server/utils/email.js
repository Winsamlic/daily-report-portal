const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

exports.sendConfirmationEmail = (email, confirmationCode) => {

    try {

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'hannah.renner@ethereal.email',
                pass: 'C3sBPV5g5PgXgSkr8n'
            }
        });

        const mailOptions = {
            from: '"Your App" <magla@co.mw>',
            to: "hannah.renner@ethereal.email",
            subject: "Confirm Your Email",
            text: `Your confirmation code is: ${confirmationCode}`,
            html: `<p>Your confirmation code is: <strong>${confirmationCode}</strong></p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending confirmation email:", error);
            } else {
                // console.log("Confirmation email sent:", info.response);
            }
        });
    } catch (error) {
        console.log(error);
    }
}



exports.sendEmailToAdmin = async (user, email) => {
    // {
    //     id: 10,
    //         username: 'Winston Lichucha',
    //             email: 'wsl2@gmail.com',
    //                 iat: 1707670593,
    //                     exp: 1711126593
    // } admin @eo.co.mz

    const token = jwt.sign({ user, admin: email }, process.env.JWT_SECRET, { expiresIn: "30m" });


    try {
        const confirm = `${process.env.API_URL}/users/confirm-admin/${token}`

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'hannah.renner@ethereal.email',
                pass: 'C3sBPV5g5PgXgSkr8n'
            }
        });

        const mailOptions = {
            from: '"Your App" <magla@co.mw>',
            to: email,
            subject: "Confirm Admin Role",
            text: `User ${user.email} has requested admin role. Please confirm the request by clicking the link below: ${email}`,
            html: `<p>User <strong>${user.username}</strong> has requested admin role. Please confirm the request by clicking the link below: <a href="${confirm}">${email}</a></p>`
        };
        return mailOptions

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending confirmation email:", error);
            } else {
                // console.log("Confirmation email sent:", info.response);
            }
        });
    } catch (error) {
        console.log(error);
    }
}


