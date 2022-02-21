import validator from 'validator';
import sendMailtoConfirm from '../confirmationEmail/sendConfirmMail.js';
import crypto from 'crypto-js';
import checkHash from '../confirmationEmail/checkHash.js';
import emailModel from '../db/models/email.js';

class EmailController {
  async saveEmail(req, res) {
    const { email } = req.body;

    // emailModel.findOne({ email: email })     <<<<<<<<<<<<<

    if (validator.isEmail(email)) {
      try {
        const hash = await crypto.SHA1(email).toString();

        const newMail = new emailModel({
          email: email,
          confirmHash: hash,
        });

        await newMail.save();
        sendMailtoConfirm(email, hash);
        res.render('message.ejs', {
          message: 'Thank you for signing in. Please confirm your email',
        });
      } catch (err) {
        res.render('message.ejs', {
          message: 'Something went wrong, please try again later',
        });
        console.log(err.errors);
      }
    } else {
      res.render('message.ejs', {
        message: 'Invalid email format',
      });
    }
  }

  async confirmHash(req, res) {
    const { hash } = req.params;
    const result = await checkHash(hash); // returns null if not in base

    if (result) {
      res.render('message.ejs', {
        message: 'Email confirmed',
      });
    } else {
      res.render('message.ejs', {
        message: 'Email not in db',
      });
    }
  }
}

export default new EmailController();
