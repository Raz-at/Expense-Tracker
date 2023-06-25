const mongoose = require("mongoose");
const validator = require("validator");
// const userModel = require("../../../models/user.model");

const editTransaction = async (req, res) => {
  const transactionsModel = mongoose.model("transactions");
  const userModel = mongoose.model("users");

  const { transaction_id, remarks, amount, transaction_type } = req.body;
  if (!transaction_id) throw "transaction_id is required";

  //console.log(transaction_type);

  if (!validator.isMongoId(transaction_id.toString()))
    throw "Please provide a valid transaction Id";

  // if (transaction_type !== "income" || transaction_type !== "expense")
  //   throw "transaction_type should only be income or expense";

  const getTransaction = await transactionsModel.findOne({
    _id: transaction_id,
  });

  if (!getTransaction) throw "transaction not found";
  // console.log(getTransaction.amount);

  await transactionsModel.updateOne(
    {
      _id: transaction_id,
    },
    {
      remarks,
      transaction_type,
      amount,
    },
    {
      runValidators: true,
    }
  );
  // console.log(getTransaction.amount);

  if (
    getTransaction.transaction_type === "income" &&
    transaction_type == "income"
  ) {
    await userModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: { balance: getTransaction.amount * -1 }, //: getTransaction.amount,
      },
      {}
    );
    await userModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: { balance: amount },
      },
      {}
    );
  }
  //
  else if (
    getTransaction.transaction_type === "income" &&
    transaction_type == "expense"
  ) {
    await userModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: { balance: getTransaction.amount * -1 },
      },
      {}
    );
    await userModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: { balance: amount * -1 },
      },
      {}
    );
  }
  //
  else if (
    getTransaction.transaction_type === "expense" &&
    transaction_type == "expense"
  ) {
    await userModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: { balance: getTransaction.amount * 1 }, //: getTransaction.amount,
      },
      {}
    );
    await userModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: { balance: amount * -1 },
      },
      {}
    );
  } else {
    await userModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: { balance: getTransaction.amount * 1 },
      },
      {}
    );
    await userModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: { balance: amount * 1 },
      },
      {}
    );
  }

  res.status(200).json({
    status: "Success",
    message: "Transaction Edited !!!",
  });
};

module.exports = editTransaction;
