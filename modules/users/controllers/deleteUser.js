const mongoose = require("mongoose");

const deleteUser = async (req, res) => {
  const userModel = mongoose.model("users");
  const user_id = req.params.user_id;
  console.log("this is frm delete", user_id);

  await userModel.deleteOne({
    _id: user_id,
  });

  res.status(200).json({
    status: "User is deleted",
  });
};

module.exports = deleteUser;
