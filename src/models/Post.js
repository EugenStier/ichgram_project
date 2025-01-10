import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "User",
        required: true,
    },
    images: [{ type: String, required: true}],
    caption: {type: String, default: "" },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: "Like",
            required: true,
        },
    ],
    comments:
})