const Post = require("./../../models/posts");
const CustomError = require("./../../utils/customError");

const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id).exec();

  if (!post) {
    throw new CustomError("No posts Found", 404);
  }

  if (post.userId.toString() !== req.user.userId) {
    throw new CustomError("You cannot update the post you did not create", 400);
  }

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    { ...req.body, userId: req.user.userId },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Post updated successfully",
    data: updatedPost,
  });
};

module.exports = updatePost;