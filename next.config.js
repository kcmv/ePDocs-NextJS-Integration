require('dotenv').config();
module.exports = {
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    prod_db: process.env.prod_db,
    prod_username: process.env.prod_username,
    prod_password: process.env.prod_password,
    prod_host: process.env.prod_host,
    ep_life_login: process.env.ep_life_login,
    XAPIKEY: process.env.XAPIKEY,
    Authorization: process.env.Authorization,
    accountName: process.env.accountName,
    accountKey: process.env.accountKey,
    containerName: process.env.containerName,
  },
};
