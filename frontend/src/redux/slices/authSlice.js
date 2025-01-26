"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.setUser = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
//инициализвция состояния из localStorage
const initialState = {
    token: localStorage.getItem("token"),
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,
};
const authslice = (0, toolkit_1.createSlice)({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
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
_a = authSlice.actions, exports.setUser = _a.setUser, exports.logout = _a.logout;
exports.default = authslice.reducer;
