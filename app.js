require("express-async-errors");
const express = require("express");
const cors = require("cors");
const errorHandlers = require("./handlers/errorHandlers");
const mongoose = require("mongoose");
const userRoutes = require("./modules/users/users.routes");
const transactionsRoutes = require("./modules/transactions/transactions.routes");

require("dotenv").config();

const app = express();
app.use(cors());

mongoose
  .connect(process.env.mongo_connection, {})
  .then(() => {
    console.log("Connection with db establish!!!");
  })
  .catch(() => {
    console.log("Connection Failed");
  });

//model initialization
require("./models/user.model");
require("./models/transaction.model");

app.use(express.json());

//routes....
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionsRoutes);

// '*' means that any route that is not handled by uppers app.use routes fall here
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: "not found",
  });
});
app.use(errorHandlers);

app.listen(8000, () => {
  console.log("Succefully server started!!!");
});
