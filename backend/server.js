import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/connectdb";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import followRoutes from "./routes/followRoutes.js";

//создаем приложение
const app = express();
const port = process.env.port; //port как аргумент для прослушки app.listen(???)

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extendet: true }));

connectDB();
//создаем сервер
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/follow, followRoutes");

app.listen(port, () => {
  console.log("Server is running on http://localhost:${port}");
});
