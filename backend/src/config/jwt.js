import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
    expirensIn: "1h", //токен живет 1 час
  });
};
export default generateToken;
