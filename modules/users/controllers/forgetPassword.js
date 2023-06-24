const mongoose = require("mongoose");
const emailManager = require("../../../managers/emailManager");

const forgetPassword = async (req, res) => {
  const userModel = mongoose.model("users");

  const { email } = req.body;
  if (!email) throw "email is not provided";

  const getUser = await userModel.findOne({
    email: email,
  });

  if (!getUser) throw "Email doesnt exist ";

  const resetCode = Math.floor(10000 + Math.random() * 90000);

  await userModel.updateOne(
    {
      email: email,
    },
    {
      reset_code: resetCode,
    },
    {
      runValidators: true,
    }
  );

  ///email sending
  await emailManager(
    email,
    "Your password reset code is " + resetCode,
    "Your password reset code is " + resetCode,
    "Reset your password - Expense Traker"
  );

  ////..

  res.status(200).json({
    status: "Rsest code to email succefully",
  });
};

module.exports = forgetPassword;
