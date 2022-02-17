import mongoose from 'mongoose';
import emailModel from './models/email.js';
import config from '../app/config.js';

const dbcon = mongoose.connect(config.db);

export default emailModel;
