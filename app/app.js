import express from 'express';
import path from 'path';
import validator from 'validator';
import emailModel from '../db/mongoose.js';
import sendMailtoConfirm from './confirmationEmail/sendConfirmMail.js';
import crypto from 'crypto-js';
import checkHash from './confirmationEmail/checkHash.js';

const app = express();
const __dirname = path.resolve();
app.use(express.urlencoded({ extended: true }));

// engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
// public
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

app.post('/', async (req, res) => {
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
      res.sendFile(__dirname + '/views/after-signing.html');
    } catch (err) {
      res.render(__dirname + '/views/error.ejs', {
        error_message: 'Something went wrong, please try again later',
      });
      console.log(err.errors);
    }
  } else {
    res.render(__dirname + '/views/error.ejs', {
      error_message: 'Invalid email format',
    });
  }
});

app.get('/confirm/:hash', async (req, res) => {
  const { hash } = req.params;
  const result = await checkHash(hash); // returns null if not in base

  if (result) {
    res.render(__dirname + '/views/error.ejs', {
      error_message: 'Email confirmed',
    });
  } else {
    res.render(__dirname + '/views/error.ejs', {
      error_message: 'Email not in db',
    });
  }
});

app.get('*', (req, res) => {
  res.render(__dirname + '/views/error.ejs', {
    error_message: 'Page not found',
  });
});

export default app;
