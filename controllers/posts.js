const Post = require("./../models/posts");
const CustomError = require("../utils/customError");

const createPost = async (req, res) => {
  const posts = await Post.create({ ...req.body, userId: req.user.userId });
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

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
