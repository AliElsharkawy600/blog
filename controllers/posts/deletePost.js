const Post = require("./../../models/posts");
const CustomError = require("./../../utils/customError");

const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id).exec();

  if (!post) {
    throw new CustomError("No posts Found", 404);
  }

  if (post.userId.toString() !== req.user.userId) {
    throw new CustomError("You cannot delete the post you did not create", 400);
  }

  await Post.findByIdAndDelete(req.params.id);

  res.status(204).send();
};

module.exports = deletePost;