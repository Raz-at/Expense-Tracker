const mongoose = require("mongoose");

const getTransactions = async (req, res) => {
  const transactionsModel = mongoose.model("transactions");

  console.log(req.query);
  const Usertransaction = await transactionsModel.find({
    user_id: req.userinfo._id,

    //this is also called as query string parameter
    //spread operator...
    ...req.query, //this is either transactions_type: 'income'o r transactions_type: 'expense'
  });

  res.status(200).json({
    status: "Success Get Transaction",
    message: Usertransaction,
  });
};

module.exports = getTransactions;
