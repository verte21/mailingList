import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const mailingListSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
  confirmHash: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const emailModel = new mongoose.model('email', mailingListSchema);

export default emailModel;
