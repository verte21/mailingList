import nodemailer from 'nodemailer';
import 'dotenv/config';

export default async function sendMailtoConfirm(userMail, hash) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  let testAccount = await nodemailer.createTestAccount();
  const confirmUrl = `http://www.localhost:${process.env.PORT}/confirm/${hash}`;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Bob from cCode " <bob@ccode.com>', // sender address
    to: userMail, // list of receivers
    subject: 'Thank you for signing up ✔', // Subject line
    text: `Thank you for signing up for our newsletter
     Confirm your email by clicking the link below ${confirmUrl}`, // plain text body
    html: `Thank you for signing up for our newsletter <br>
     Confirm your email by clicking the link below: <br>
     <a href="${confirmUrl}">${confirmUrl}</a>`, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
