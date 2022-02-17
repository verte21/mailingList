import 'dotenv/config';

export default {
  port: process.env.PORT || 3000,
  db: process.env.DATABASE,
};
