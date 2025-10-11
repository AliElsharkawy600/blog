const User = require("./../../models/users");
const CustomError = require("./../../utils/customError");

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const user = await User.findOneAndUpdate(
    { _id: id },
    { name, email },
    {
      new: true,
    }
  );

  if (!user) {
    throw new CustomError("User Not Found", 404);
  }

  const savedUser = user.toObject();
  delete savedUser.password;

  return res.status(200).json({
    status: "success",
    message: "User updated successfully",
    data: savedUser,
  });
};

module.exports = updateUser;
