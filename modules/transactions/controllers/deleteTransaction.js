const mongoose = require("mongoose");
const validator = require("validator");
// const userModel = require("../../../models/user.model");

const deleteTransaction = async (req, res) => {
  const transactionsModel = mongoose.model("transactions");
  const userModel = mongoose.model("users");

  const { transaction_id } = req.params;

  if (!validator.isMongoId(transaction_id.toString()))
    throw "Please provide a valid Id";

  const getTransaction = await transactionsModel.findOne({
    _id: transaction_id,
  });

  if (!getTransaction) throw "transaction not found";

  console.log(getTransaction);

  if (getTransaction.transaction_type === "income") {
    await userModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: {
          balance: getTransaction.amount * -1,
        },
      },
      {
        runValidators: true,
      }
    );
  } else {
    await userModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: {
          balance: getTransaction.amount,
        },
      },
      {
        runValidators: true,
      }
    );
  }

  await transactionsModel.deleteOne({
    _id: transaction_id,
  });

  res.status(200).json({
    status: "Success",
    message: "Transaction delete !!!",
  });
};

module.exports = deleteTransaction;
