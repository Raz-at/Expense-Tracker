const express = require("express");
const auth = require("../../middleware/auth");
const addIncome = require("./controllers/addIncome");
const addExpense = require("./controllers/addExpense");
const getTransactions = require("./controllers/getTransaction");
const deleteTransaction = require("./controllers/deleteTransaction");
const editTransaction = require("./controllers/editTransaction");

const transactionsRoutes = express.Router();

//routes...

//everything below this is control by auth ie middleware
transactionsRoutes.use(auth);

//protected routes
transactionsRoutes.post("/addIncome", addIncome);
transactionsRoutes.post("/addExpense", addExpense);
transactionsRoutes.get("/", getTransactions);
transactionsRoutes.delete("/:transaction_id", deleteTransaction);
transactionsRoutes.patch("/", editTransaction);

module.exports = transactionsRoutes;
