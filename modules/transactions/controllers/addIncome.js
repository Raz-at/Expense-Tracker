const mongoose = require("mongoose");
const validator = require("validator");
const userModel = require("../../../models/user.model");

const addIncome = async (req, res) => {
  const usersModel = mongoose.model("users");
  const transactionsModel = mongoose.model("transactions");

  const { amount, remarks } = req.body;
  if (!amount) throw "amount is required!!";
  if (!remarks) throw "remarks is required!!";
  //console.log(validator.isNumeric(amount.toString()));

  if (!validator.isNumeric(amount.toString())) throw "Amount must be in number";
  if (amount < 0)
    throw "Amount must not be negative or should be greater than 0";

  await transactionsModel.create({
    user_id: req.userinfo._id,
    amount: amount,
    remarks: remarks,
    transaction_type: "income",
  });

  await userModel.updateOne(
    {
      _id: req.userinfo._id,
    },
    {
      $inc: {
        balance: amount,
      },
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "Success",
    message: "Income Added!!!",
  });
};

module.exports = addIncome;
