const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const jwtManagers = require("../../../managers/jwtManagers");

const login = async (req, res) => {
  const userModel = mongoose.model("users");

  const { email, password } = req.body;

  //to check email in model
  const getuser = await userModel.findOne({
    email: email,
  });

  // console.log(getuser);
  if (!getuser) throw "email doesnt exist";

  //to check hashed password
  const comparepassword = await bcrypt.compare(password, getuser.password);
  if (!comparepassword) throw "password do not match";
  //...

  //to generate access token....
  const accessToken = jwtManagers(getuser);
  //......

  res.status(200).json({
    status: "Success",
    message: "login Successful!!",
    accessToken: accessToken,
  });
};

module.exports = login;
