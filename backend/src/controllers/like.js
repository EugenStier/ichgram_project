import Like from "../models/Like.js";
import Post from "../models/Post.js";

export const likePostLikes = async (req, res) => {
  try {
    const likes = await Like.find({ post_id: req.params.postId });
    res.status(200).json({ status: "ok", data: likes });
  } catch (error) {
    res.status(500).json({ error: "Error when getting post's likes" });
  }
};
export const likePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  if (!postId) {
    return res
      .status(400)
      .json({ error: "Ether post or user id is not found" });
  }

  try {
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ error: "Post is not found" });

    const existingLike = await Like.findOne({
      post_id: postId,

      user_id: userId,
    });

    if (existingLike)
      return res
        .status(400)
        .json({ error: "This post has already been liked" });

    const like = new Like({
      post_id: postId,
      user_id: userId,
      created_at: new Date(),
    });

    await like.save();
    post.likes_count += 1;

    await post.save();
    res.status(201).json({ status: "ok", data: like });
  } catch (error) {
    res.status(500).json({ error: "Error when posting like" });
  }
};

export const unlikePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  if (!postId) {
    return res
      .status(400)
      .json({ error: "Ether post or user id is not found" });
  }

  try {
    const like = await Like.findOne({ post_id: postId, user_id: userId });
    if (!like) return res.status(404).json({ error: "Like is not found" });

    await Like.findByIdAndDelete(like._id);

    const post = await Post.findById(postId);

    post.likes_count -= 1;
    post.likes = post.likes.filter(
      (postLike) => postLike._id.toString() !== like._id.toString()
    );

    await post.save();
    res.status(200).json({ message: "Like was deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error when deleting like" });
  }
};
