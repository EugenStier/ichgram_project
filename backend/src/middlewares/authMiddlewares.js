import jwt from "jsonwebtoken";
import User from "../models/User";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Autorization").replace("Bearer", "");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Token hasn' been provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await user.findbyId(decoded.user_id);
    if (!user) {
      return res.status(401).jon({ message: "User is not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
export default authMiddleware;
