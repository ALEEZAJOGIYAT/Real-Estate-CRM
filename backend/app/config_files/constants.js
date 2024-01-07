const dotenv = require("dotenv");
dotenv.config();


const node_mailer = {
    name: process.env.BLUE_HOST_DOMAIN,
    smtp: process.env.BLUE_HOST_DOMAIN,
    host: process.env.BLUE_HOST_NAME,
    // port: process.env.BLUE_HOST_SMTP_PORT,
    from: "VLOOKIN <info@devvlookin.vlookin.com>",
    subject: "OTP Verification",
}

module.exports = {node_mailer}