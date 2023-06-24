const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailManager = require("../../../managers/emailManager");

const resetPassword = async (req, res) => {
  const userModel = mongoose.model("users");

  const { email, new_password, reset_code } = req.body;

  if (!email) throw "Email id required";
  if (!new_password) throw "Password id required";
  if (!reset_code) throw "Reset code id required";

  const getUserResetCode = await userModel.findOne({
    email: email,
    reset_code: reset_code,
  });
  if (!getUserResetCode) throw "Reset Code doesnt match!!!!";

  const hashedpassword = await bcrypt.hash(new_password, 12);

  await userModel.updateOne(
    {
      email: email,
    },
    {
      password: hashedpassword,
      reset_code: "",
    },
    {
      runValidators: true,
    }
  );

  ////send email after pw changed
  await emailManager(
    email,
    "Your password has been changed. Thank you",
    "<h1>Your password has been changed. !!!</h1>.<br/><br/><h2> Thank you.</h2>",
    "Your password has been changed.!!!"
  );
  ///....

  res.status(200).json({
    status: "Success",
    message: "Successfully password reseted.....!!!!",
  });
};

module.exports = resetPassword;
