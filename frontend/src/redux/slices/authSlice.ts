import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface User {
  _id: string;
  username: string;
  fuii_name: string;
  email: string;
  bio: string;
  bio_website: string;
  profile_image: string;
  followers_count: number;
  following_count: number;
  posts_count: number;
  created_at: string;
}
interface AuthState {
  token: string | null;
  user: User | null;
}
//инициализвция состояния из localStorage
const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
};
const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      //сохраняем данные пользователя в lS
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      //удаляем данные пользователя из lS
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      //удаляем доп.данные (лайки и др.)
      localStorage.removeItem("likedposts");
    },
  },
});
export const { setUser, logout } = authSlice.actions;
export default authslice.reducer;
