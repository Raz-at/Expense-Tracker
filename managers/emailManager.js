const nodemailer = require("nodemailer");

const emailManager = async (to, text, html, subject) => {
  //configuration for nodemailer to send the email....
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "dc473143381787",
      pass: "c05d11df0dd7dd",
    },
  });

  await transport.sendMail({
    to: to,
    from: "info@expenseTracker.com",
    text: text,
    html: html,
    subject: subject,
  });
};

module.exports = emailManager;
