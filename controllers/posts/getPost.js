const Post = require("./../../models/posts");
const CustomError = require("./../../utils/customError");


const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate({
    path: "userId",
    select: "name email role",
  });
  if (!post) {
    throw new CustomError("No posts Found", 404);
  }

  // adding is the owner of the post
  const postsWithOwner = {
    ...post.toObject(),
    isOwner: post.userId._id.toString() === req.user.userId,
  };

  res.status(200).json({
    status: "success",
    message: "Post fetched successfully",
    data: postsWithOwner,
  });
};

module.exports = getPost;