import express from 'express';
import path from 'path';
import validator from 'validator';
import emailModel from '../db/mongoose.js';
import sendMailtoConfirm from './mailAuth.js';
import bcrypt from 'bcrypt';

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
      console.log('here');

      const hash = await bcrypt.hashSync(email, 10);

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

app.get('*', (req, res) => {
  res.render(__dirname + '/views/error.ejs', {
    error_message: 'Page not found',
  });
});

export default app;
