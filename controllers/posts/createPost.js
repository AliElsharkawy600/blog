const Post = require("./../../models/posts");


const createPost = async (req, res) => {
  const posts = await Post.create({ ...req.body, userId: req.user.userId });
  res.status(201).json({
    status: "success",
    message: "Posts Created successfully",
    data: posts,
  });
};

module.exports = createPost;