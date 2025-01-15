import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/connectdb";
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

app.listen(port, () => {
  console.log("Server is running on http://localhost:${port}");
});
