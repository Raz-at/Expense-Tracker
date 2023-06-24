const mongoose = require("mongoose");

const viewUser = async (req, res) => {
  const userModel = mongoose.model("users");
  const userinfo = await userModel.find({});

  res.status(200).json({
    status: "Success",
    data: userinfo,
  });
};

module.exports = viewUser;
