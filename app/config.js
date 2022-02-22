import 'dotenv/config';

export default {
  port: process.env.PORT || 3000,
  db: process.env.DATABASE,
  email_host: process.env.EMAIL_HOST,
  email_port: process.env.EMAIL_PORT,
  email_auth_user: process.env.EMAIL_AUTH_USER,
  email_auth_pass: process.env.EMAIL_AUTH_PASS,
};
