const JsonWebToken = require("jsonwebtoken");

const auth = (req, res, next) => {
  // console.log(req.headers);

  try {
    //to get the data within accessToken...
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    //console.log(accessToken);

    //to check secret key of the acccess token and secret key....
    const jwt_payload = JsonWebToken.verify(accessToken, process.env.jwt_salt);

    //to send to dashboard....
    req.userinfo = jwt_payload;
  } catch (e) {
    res.status(401).json({
      status: "Error",
      message: "Unauthorize",
    });
    return;
  }

  next();
};

module.exports = auth;
