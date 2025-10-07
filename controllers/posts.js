const Post = require("./../models/posts");

const createPost = async (req, res) => {
  const posts = await Post.create(req.body);
  res.status(201).json({
    status: "success",
    message: "Posts Created successfully",
    data: posts,
  });
};

const getPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const totalPromise = Post.countDocuments();
  const postsPromise = Post.find().skip(skip).limit(limit);

  const [posts, total] = await Promise.all([postsPromise, totalPromise]);

  if (!posts) {
    return res.status(404).json({
      status: "failure",
      message: "No posts Found",
    });
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
    data: posts,
    pagination,
  });
};

const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate({
    path: "userId",
    select: "name email role",
  });
  if (!post) {
    return res.status(404).json({
      status: "failure",
      message: "No posts Found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Post fetched successfully",
    data: post,
  });
};

const updatePost = async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!post) {
    return res.status(404).json({
      status: "failure",
      message: "No posts Found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "Post updated successfully",
    data: post,
  });
};

const deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    return res.status(404).json({
      status: "failure",
      message: "No posts Found",
    });
  }
  res.status(204).send();
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
