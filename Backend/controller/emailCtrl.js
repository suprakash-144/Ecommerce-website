const nodemailer = require("nodemailer");
const expressAsyncHandler = require("express-async-handler");

const sendEmail = expressAsyncHandler(async (data, req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Suprakash Gorai 👻" ${process.env.MAIL_ID}`, // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.htm, // html body
  });

  console.log("Message sent: %s", data.messageId);
});
module.exports = { sendEmail };
