require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.GATSBY_SENDGRID);

module.exports = (req, res) => {
  const { body } = req;
  const msg = {
    to: "njabevents@gmail.com",
    from: "njabevents@gmail.com",
    subject: "Sending with Twilio SendGrid is Fun",
    html: `<p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p>
        <strong>Inquiry:</strong> ${body.body}
      </p>`,
  };
  sgMail.send(msg).then(() => {
    res.status(200).send(`Sent email: ${JSON.stringify(body)}`);
  });
};
