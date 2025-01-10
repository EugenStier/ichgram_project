import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db";
//создаем приложение
const app = express();
const port = process.env.port; //port как аргумент для прослушки app.listen(???)

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extendet: true }));
//создаем сервер
app.listen(port, () => {
  console.log("Server is running on http://localhost:${port}");
});
