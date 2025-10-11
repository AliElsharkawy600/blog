const { isValidObjectId } = require("mongoose");
const CustomError = require("./../utils/customError");

const checkOwnership = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new CustomError("Invalid ID", 400);
  }

  if (id !== req.user.userId) {
    throw new CustomError("You are not authorized to access this field", 403);
  }

  next();
};

module.exports = checkOwnership;
