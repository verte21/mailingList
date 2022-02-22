import express from 'express';
import path from 'path';
import webRouter from './routes/web.js';
const app = express();
const __dirname = path.resolve();

// db connection
import './db/mongoose.js';
// engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));

// public
app.use(express.static('public'));
// router
app.use(webRouter);

export default app;
