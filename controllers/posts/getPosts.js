const Post = require("./../../models/posts");
const CustomError = require("./../../utils/customError");

const getPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const totalPromise = Post.countDocuments();
  const postsPromise = Post.find().skip(skip).limit(limit);

  const [posts, total] = await Promise.all([postsPromise, totalPromise]);

  // adding is the owner of the post
  const postsWithOwner = posts.map((post) => ({
    ...post.toObject(),
    isOwner: post.userId.toString() === req.user.userId,
  }));

  if (!posts) {
    throw new CustomError("No posts Found", 404);
  }

  const pagination = {
    page: Number(page),
    totalPosts: total,
    totalPages: Math.ceil(total / Number(limit)),
    limit: Number(limit),
  };

  res.status(200).json({
    status: "success",
    message: "Posts fetched successfully",
    data: postsWithOwner,
    pagination,
  });
};

module.exports = getPosts