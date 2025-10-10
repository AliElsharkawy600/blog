const User = require("../models/users");
const { isValidObjectId } = require("mongoose");
const CustomError = require("../utils/customError");

const getAllUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;

  const query = { isActive: true };

  const usersPromise = User.find(query, { password: 0 })
    .skip(Number(skip))
    .limit(Number(limit))
    .sort({ createdAt: -1 });
  const totalPromise = User.countDocuments(query);

  const [users, total] = await Promise.all([usersPromise, totalPromise]);

  res.status(200).json({
    status: "success",
    message: "Users fetched successfully",
    data: users,
    pagenation: {
      page: Number(page),
      total,
      totalPages: Math.ceil(total / Number(limit)),
      limit: Number(limit),
    },
  });
};

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

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    throw new CustomError("Name is required", 400);
  }
  if (!email) {
    throw new CustomError("email is required", 400);
  }
  if (!password) {
    throw new CustomError("password is required", 400);
  }

  const newUser = await User.create({ name, email, password });
  const savedUser = newUser.toObject();
  delete savedUser.password;

  res.json({
    status: "success",
    message: "User created successfully",
    data: savedUser,
  });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw new CustomError("Invalid ID", 400);
  }
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

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
