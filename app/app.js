import express from 'express';
import path from 'path';
import webRouter from './routes/web.js';

const app = express();
app.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve();
import './db/mongoose.js';
// engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
// public
app.use(express.static('public'));

app.use(webRouter);

export default app;
