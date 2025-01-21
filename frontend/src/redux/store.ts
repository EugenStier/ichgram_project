import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import commentReducer from "./slices/commentsSlice";
import followSlice from "./slices/followSlice";
import likesReducer from "./slices/likeSlice";
import notificationsReducer from "./slices/notificationsSlice";
import postReducer from "./slices/postSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    posts: postReducer,
    user: userReducer,
    auth: authReducer,
    follow: followSlice,
    likes: likesReducer,
    comments: commentReducer,
    notifications: notificationsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type Appdispatch = typeof store.dispatch;
export default store;
