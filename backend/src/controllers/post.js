import User from "../models/User.js";
import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  const userId = req.user._id;
  const { content } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User is not found" });
    }
    const post = new Post({
      user_id: userId,
      images: ["fileNumber1"],
      content,
      created_at: new Date(),
    });

    await post.save();
    user.posts_count += 1;
    await user.save();
    res.status(200).json({ status: "ok", data: post });
  } catch (error) {
    res.status(500).json({ error: "Error when creating post" });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user_id: req.user._id });
    res.status(200).json({ status: "ok", data: posts });
  } catch (error) {
    res.status(500).json({ error: "Error when fetching posts" });
  }
};

export const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (post.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Access denied" });
    }

    if (!post) {
      return res.status(404).json({ error: "Post is not found" });
    }

    await Post.findByIdAndDelete(postId);

    const user = await User.findById(post.user_id);

    user.posts_count -= 1;

    await user.save();

    res.status(200).json({ message: "Post was successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error when deleting post" });
  }
};

export const getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId).populate(
      "user_id",
      "username profile_image"
    );

    if (!post) {
      return res.status(404).json({ error: "Post is not found" });
    }

    res.status(200).json({ status: "ok", data: post });
  } catch (error) {
    res.status(500).json({ error: "Error when fetching post" });
  }
};

export const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { content, images } = req.body;

  try {
    const post = await Post.findById(postId);

    if (post.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Access denied" });
    }

    if (!post) {
      return res.status(404).json({ error: "Post is not found" });
    }

    if (content) post.content = content;
    if (images) post.images = images;

    await post.save();

    res.status(200).json({ status: "ok", data: post });
  } catch (error) {
    res.status(500).json({ error: "Error when updating post" });
  }
};
