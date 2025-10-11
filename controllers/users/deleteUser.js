const User = require("./../../models/users");
const { isValidObjectId } = require("mongoose");
const CustomError = require("./../../utils/customError");





const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw new CustomError("Invalid ID", 400);
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    throw new CustomError("User Not Found", 404);
  }

  return res.status(204).send();
};

module.exports = deleteUser;