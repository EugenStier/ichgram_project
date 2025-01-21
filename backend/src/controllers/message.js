import Message from "../models/Message.js";
export const loadMessages = async (
  useImperativeHandle,
  targetUserId,
  socket
) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender_id: userId, receiver_id: targetUserId },
        {
          sender_id: targetUserId,
          receiver_id: userId,
        },
      ],
    }).sort({ created_at: 1 });

    socket.emit("loadMessage", messages);
  } catch (error) {
    console.log("Error when getting messages:", error);
    socket.emit("error", { error: "Error when getting messages" });
  }
};

export const sendMessage = async (
  userId,
  targetUserId,
  roomId,
  messageText,
  io
) => {
  try {
    const message = new Message({
      sender_id: userId,
      receiver_id: targetUserId,
      message_text: messageText,
    });

    await message.save();

    io.to(roomId).emit("receiveMessage", message);
  } catch (error) {
    console.error("Error when getting message:", error);
  }
};
