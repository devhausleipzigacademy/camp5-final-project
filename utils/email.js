const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5ac06abdb532d9",
    pass: "3a86b1e35ca69e",
  },
});

message = {
  from: "from-example@email.com",
  to: "to-example@email.com",
  subject: "Subject",
  text: "Hello SMTP Email",
};
transporter.sendMail(message, function (err, info) {
  if (err) {
    console.log(err);
  } else {
    console.log(info);
  }
});
