const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} = require("./../controllers/posts");

const validator = require("../middlewares/validator");
const {
  createPostSchema,
  updatePostSchema,
} = require("../utils/schemas/posts");

router.post("/", auth, validator(createPostSchema), createPost);

router.get("/", auth, getPosts);

router.get("/:id", auth, getPost);

router.patch("/:id", auth, validator(updatePostSchema), updatePost);

router.delete("/:id", auth, deletePost);

module.exports = router;
