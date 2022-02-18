import emailModel from '../../db/mongoose.js';
import crypto from 'crypto-js';

async function checkHash(hash) {
  const query = { confirmHash: hash };
  return await emailModel.findOneAndUpdate(query, {
    active: true,
    $unset: { confirmHash: hash },
  });
}

export default checkHash;
