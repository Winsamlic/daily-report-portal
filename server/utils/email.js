const nodemailer = require("nodemailer");

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

exports.sendEmailToAdmin = (userId, email, token) => {
    return console.log(userId, email, token);

    try {
        const confirm = `${process.env.API_URL}/users/confirm-admin/${user}/${email}`

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
            subject: "Confirm Admin Role",
            text: `User ${user} has requested admin role. Please confirm the request by clicking the link below: ${email}`,
            html: `<p>User <strong>${user}</strong> has requested admin role. Please confirm the request by clicking the link below: <a href="${confirm}">${email}</a></p>`
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


