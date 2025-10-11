const User = require("./../../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {promisify} = require("util")
const CustomError = require("./../../utils/customError");

// promisify jwt.sign

const jwtSign = promisify(jwt.sign);


const logIn = async (req, res) => {
  const { email, password } = req.body;

  // 1- check user with the given email exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("Invalid Email or Password combination", 400);
  }
  // 2- compare hashed password from db with the given password
  const isPasswordMached = await bcrypt.compare(password, user.password);

  if (!isPasswordMached) {
    throw new CustomError("Invalid Email or Password combination", 400);
  }
  // 3- matched ? generate JWT token
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  const secretKey = process.env.JWT_SECRET_KEY;

  const token = await jwtSign(payload, secretKey, { expiresIn: "1d" });

  return res.status(200).json({
    status: "success",
    message: "User logged in successfully",
    data: { token },
  });
};

module.exports = logIn;