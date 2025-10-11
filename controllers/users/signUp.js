const User = require("./../../models/users");
const bcrypt = require("bcrypt");




const signUp = async (req, res) => {
  const { name, email, password, profilePicture } = req.body;

  // hash password
  const saltRounds = +process.env.SALT_ROUNDS;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    profilePicture,
  });

  const savedUser = newUser.toObject();
  delete savedUser.password;

  res.status(201).json({
    status: "success",
    message: "User created successfully",
    data: savedUser,
  });
};

module.exports = signUp;