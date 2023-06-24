const mongoose = require("mongoose");
const validator = require("validator");
// const userModel = require("../../../models/user.model");

const editTransaction = async (req, res) => {
  const transactionsModel = mongoose.model("transactions");
  const userModel = mongoose.model("users");

  const { transaction_id, remarks, amount, transaction_type } = req.body;
  if (!transaction_id) throw "transaction_id is required";

  if (!validator.isMongoId(transaction_id.toString()))
    throw "Please provide a valid Id";

  if (transaction_type !== "income" || transaction_type !== "expense")
    throw "transaction_type should only be income or expense";

  const getTransaction = await transactionsModel.findOne({
    _id: transaction_id,
  });
  if (!getTransaction) throw "transaction not found";

  await transactionsModel.updateOne(
    {
      _id: transaction_id,
    },
    {
      remarks,
      //   transaction_type,
      //   amount,
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "Success",
    message: "Transaction Edited !!!",
  });
};

module.exports = editTransaction;
