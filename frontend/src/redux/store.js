"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const authSlice_1 = __importDefault(require("./slices/authSlice"));
const commentsSlice_1 = __importDefault(require("./slices/commentsSlice"));
const followSlice_1 = __importDefault(require("./slices/followSlice"));
const likeSlice_1 = __importDefault(require("./slices/likeSlice"));
const notificationsSlice_1 = __importDefault(require("./slices/notificationsSlice"));
const postSlice_1 = __importDefault(require("./slices/postSlice"));
const userSlice_1 = __importDefault(require("./slices/userSlice"));
const store = (0, toolkit_1.configureStore)({
    reducer: {
        posts: postSlice_1.default,
        user: userSlice_1.default,
        auth: authSlice_1.default,
        follow: followSlice_1.default,
        likes: likeSlice_1.default,
        comments: commentsSlice_1.default,
        notifications: notificationsSlice_1.default,
    },
});
exports.default = store;
