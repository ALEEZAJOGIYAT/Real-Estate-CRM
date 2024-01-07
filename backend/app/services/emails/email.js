const NODEMAILER = require("nodemailer");
const dotenv = require("dotenv");
const constants = require("../../config_files/constants")
dotenv.config();


async function sendEmail({ to, html }) {
  try {
    console.log(process.env.EMAIL, 'checking config')
    let NodemailerTransporter = await NODEMAILER.createTransport({
      name: constants.node_mailer.name,
      smtp: constants.node_mailer.name,
      host: constants.node_mailer.host,
      port: 465,
      auth: {
        user: process.env.BLUE_HOST_EMAIL,
        pass: process.env.BLUE_HOST_EMAIL_PASSWORD,
      },
      secure : true
    });

    let mailOptions = {
      to: to,
      from: "VLOOKIN <info@devvlookin.vlookin.com>",
      subject: "OTP Verification",
      html: html,
    };

    let sendEmailResponse = await NodemailerTransporter.sendMail(mailOptions);
    console.log(sendEmailResponse);
    return sendEmailResponse;
  } catch (err) {
    throw err;
  }
}

module.exports = { sendEmail };
