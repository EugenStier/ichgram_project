import { emitNotification } from "../middlewares/notificationSocketHandler.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
//полученние всех уведомлений пользователя
export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user_id: req.params.userId,
    }).sort({
      created_at: -1,
    });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Error when receiving notifications" });
  }
};
//создание нового уведомления
export const createNotification = async (req, res) => {
  const { user_id, sender_id, type, content, avatar, postImg } = req.boby;
  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const notification = new Notification({
      user_id,
      sender_id,
      avatar,
      postImg,
      type,
      content: { username: content.username, message: content.message },
      created_at: new Date(),
    });
    await notification.save();
    //отправляем уведомления через  WebSocket
    const io = req.app.get("io");
    emitNotification(io, user_id, notification);
  } catch (error) {
    res.status(500).json({ error: "Error creating notification" });
  }
};
// удаление уведомления
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.notificationId);
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    await Notification.findByIdAndDelete(req.params.notificationId);
    res.status(200).json({ message: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ rror: "Error when deleting notification" });
  }
};
// обновление статуса уведомления читано или нечитано
export const updateNotificationStatus = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.notificationId);
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    notification.is.is_read + req.body.is_read;
    await notification.save();
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: "Error when updating update status" });
  }
};
