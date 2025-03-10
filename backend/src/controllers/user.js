import User from "../models/User.js";
import multer from "multer";
import upload from "../middlewares/multer.js";

export const getUserProfile = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId).select([
      "-password",
      "-created_at",
    ]);

    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }

    res.status(200).json({ status: "ok", data: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occured while fetching user's data." });
  }
};
export const updateUserProfile = async (req, res) => {
  console.log(req.user);
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }
    const { usernsme, bio } = req.body;
    if (usernsme) user.username = username;
    if (bio) user.bio = bio;
    if (req.file) {
      const base64Image = req.file.buffer.toString("base64");
      user.profile_image = base64Image;
    }

    await user.save();
    res.status(200).json({ message: "succesfully updated" });
  } catch (error) {
    res.status(500).json({ message: "Error when updating profile" });
  }
};

export const uploadProfileImage = upload.single("profile_image");
