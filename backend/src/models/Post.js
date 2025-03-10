import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "User",
    required: true,
  },
  images: [{ type: String, required: true }],
  caption: { type: String, default: "" },
  likes_count: { type: Number, default: 0 },
  likes: [
    {
      type: mongoose.Schema.Types.ObyectId,
      ref: "Like",
      required: true,
    },
  ],
  comments_count: { type: Number, default: 0 },
  comments: [
    {
      type: mongoose.Schema.Types.ObyectId,
      ref: "Comment",
      required: true,
    },
  ],
  created_at: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
