const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManagers = require("../../../managers/jwtManagers");
const emailManager = require("../../../managers/emailManager");

const register = async (req, res) => {
  const userModel = mongoose.model("users");
  const { email, password, confirm_password, balance, name } = req.body; //get from postman

  //validations..
  if (password.length < 6) throw "password must be longer than 6 characters";
  if (password !== confirm_password) throw "password doesnt match";

  const getDuplicateName = await userModel.findOne({
    name: name,
  });
  if (getDuplicateName) throw "name already exist!! choose another one....";
  const getDuplicateEmail = await userModel.findOne({
    email: email,
  });
  if (getDuplicateEmail) throw "Email alredy exist";
  ///....

  //hashing password
  const hashedpassword = await bcrypt.hash(password, 12);

  //add to database..
  const createdUser = await userModel.create({
    name: name,
    password: hashedpassword,
    email: email,
    balance: balance,
  });
  ///.....

  //creating accessToken......
  const accessToken = jwtManagers(createdUser);
  ////....

  //to send email.....
  await emailManager(
    createdUser.email,
    "Welcome to expense traker. We hope you can manage your income and expenses.",
    "<h1>Welcome to expense traker!!!</h1>.<br/><br/><h2> We hope you can manage your income and expenses.</h2>",
    "Welcome to Expense Traker!!!"
  );
  //...

  res.status(201).json({
    status: "User register successfully!!!",
    accessToken: accessToken,
  });
};

module.exports = register;
