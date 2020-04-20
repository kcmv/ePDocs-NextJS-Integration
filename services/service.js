const fetch = require('node-fetch');

const getUserProfile = async (session_code) => {
  try {
    const profile = await fetch(`${process.env.ep_profile}`, {
      method: 'post',
      body: `session_code=${session_code}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-API-KEY': `${process.env.XAPIKEY}`,
        Authorization: `${process.env.Authorization}`,
      },
    });
    return await profile.json();
  } catch (error) {
    throw new Error(error);
  }
};

const checkEpLifeAccount = async (email, password) => {
  try {
    const result = await fetch(`${process.env.ep_life_login}`, {
      method: 'post',
      body: `account=${email}&password=${password}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-API-KEY': `${process.env.XAPIKEY}`,
        Authorization: `${process.env.Authorization}`,
      },
    });
    return await result.json();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getUserProfile, checkEpLifeAccount };
