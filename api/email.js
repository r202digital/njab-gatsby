require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.GATSBY_SENDGRID);

module.exports = (req, res) => {
  const { body } = req;
  //   const msg = {
  //     to: "team.r202creatives@gmail.com",
  //     from: "test@notjustaboxevents.com",
  //     subject: "Sending with Twilio SendGrid is Fun",
  //     text: "and easy to do anywhere, even with Node.js",
  //     html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  //   };
  const msg = {
    to: "team.r202creatives@gmail.com",
    from: "njabevents@gmail.com",
    subject: "Sending with Twilio SendGrid is Fun",
    html: `<p><strong>Name:</strong> NJAB SAMPLE</p>
      <p><strong>Email:</strong> njab@gmail.com</p>
      <p>
        <strong>Inquiry:</strong> Sample blabla
      </p>`,
  };
  sgMail.send(msg).then(() => {
    res
      .status(200)
      .send(
        `${process.env.GATSBY_SENDGRID} - Sent email: ${JSON.stringify(body)}`
      );
  });
};
