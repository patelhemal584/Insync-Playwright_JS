const dotenv = require('dotenv');

const envName = process.env.ENV || 'uat';
dotenv.config({ path: `.env.${envName}` });

module.exports = {
  BASE_URL: process.env.BASE_URL,
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  FACILITY: process.env.FACILITY
};
