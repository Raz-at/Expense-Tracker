const express = require("express");
const register = require("./controllers/register");
const viewUser = require("./controllers/viewUser");
const deleteUser = require("./controllers/deleteUser");
const login = require("./controllers/login");
const forgetPassword = require("./controllers/forgetPassword");
const resetPassword = require("./controllers/resetPassword");
const userDashboard = require("./controllers/userDashboard");
const auth = require("../../middleware/auth");

const userRoutes = express.Router();

//routes...
userRoutes.post("/register", register);
userRoutes.post("/login", login);

userRoutes.post("/forgetPassword", forgetPassword);
userRoutes.post("/resetPassword", resetPassword);

//everything below this is control by auth ie middleware
userRoutes.use(auth);

//protected routes
userRoutes.get("/userDashboard", userDashboard);

userRoutes.get("/viewUser", viewUser);
userRoutes.delete("/viewUser/:user_id", deleteUser);

module.exports = userRoutes;
