const jsonwebtoken = require("jsonwebtoken");

const jwtManagers = (user) => {
  const accessToken = jsonwebtoken.sign(
    {
      _id: user._id,
      name: user.name,
    },
    process.env.jwt_salt //secret key for access token...
  );
  return accessToken;
};

module.exports = jwtManagers;
