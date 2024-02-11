const { generateRandomNumberString } = require("./generate-code");
const { sendConfirmationEmail, sendEmailToAdmin } = require("./email");

module.exports = {
    generateRandomNumberString,
    sendConfirmationEmail, sendEmailToAdmin
};
