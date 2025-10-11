const User = require("./../../models/users");

// promisify jwt.sign


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

module.exports = getAllUsers;