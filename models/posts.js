const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // bonus
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);


const Post = mongoose.model("Post", postSchema);

module.exports = Post;