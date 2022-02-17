import bcrypt from 'bcrypt';
const salt = 10;

export default async function generateHash(userEmail) {
  await bcrypt.hash(userEmail, salt, function (err, hash) {});
}
