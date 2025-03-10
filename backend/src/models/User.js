import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  full_name: { type: String, required: true },
  bio: { type: String, default: "" },
  profile_image: { type: String, default: "" },
  fallowers_count: { type: Number, default: 0 },
  fallowing_count: { type: Number, default: 0 },
  posts_count: { type: Number, default: 0 },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  create_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
export default User;
