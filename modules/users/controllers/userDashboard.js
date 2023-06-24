const mongoose = require("mongoose");
const transactionsModel = require("../../../models/transaction.model");

const userDashboard = async (req, res) => {
  const userModel = mongoose.model("users");
  const transactionModel = mongoose.model("transactions");

  //console.log(req.userinfo);

  const getUser = await userModel
    .findOne({
      _id: req.userinfo._id,
    })
    .select("-password");

  const transaction = await transactionsModel
    .find({
      user_id: req.userinfo._id,
    })
    .sort("-createdAt")
    .limit(2);

  res.status(200).json({
    status: "User Dashboard",
    data: getUser,
    transaction,
  });
};

module.exports = userDashboard;
