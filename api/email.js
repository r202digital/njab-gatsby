require("dotenv").config();
const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.GATSBY_SENDGRID);

module.exports = (req, res) => {
  const { body } = req;
  //   const msg = {
  //     to: "team.r202creatives@gmail.com",
  //     from: "test@notjustaboxevents.com",
  //     subject: "Sending with Twilio SendGrid is Fun",
  //     text: "and easy to do anywhere, even with Node.js",
  //     html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  //   };
  res
    .status(200)
    .send(
      `${process.env.GATSBY_SENDGRID} ${process.env.SENDGRID_API}- Sent email: ${body}`
    );
  //   sgMail.send(msg).then(() => {
  //     res
  //       .status(200)
  //       .send(`${process.env.GATSBY_SENDGRID} - Sent email: ${body}`);
  //   });
};