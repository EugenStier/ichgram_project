import express from "express";
import {
  getUserNotifications,
  createNotification,
  deleteNotification,
  updateNotificationStatus,
} from " ../controllers/notificationController.js";
import authMiddleware from "../middlewares/authMiddlewares.js";

// создание маршрутизатора
const router = express.Router();
//получаем все уведомления польз-я
router.get("/:userId/notifications", authMiddleware, getUserNotifications);
// создание нового уведомления
router.post("/", authMiddleware, createNotification);
// удаление уведомления
router.delete("/:notificationId", authMiddleware, deleteNotification);
// обновление статуса уведомления
router.patch("/:notificationId", authMiddleware, updateNotificationStatus);

export default router;
