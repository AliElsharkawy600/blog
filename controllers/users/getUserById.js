const User = require("./../../models/users");
const { isValidObjectId } = require("mongoose");
const CustomError = require("./../../utils/customError");

// promisify jwt.sign



const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new CustomError("Invalid ID", 400);
  }

  const user = await User.findOne({ _id: id }, { password: 0 });

  if (!user) {
    throw new CustomError("User Not Found", 404);
  }
  res.status(200).json({
    status: "success",
    message: "User fetched successfully",
    data: user,
  });
};

module.exports = getUserById;