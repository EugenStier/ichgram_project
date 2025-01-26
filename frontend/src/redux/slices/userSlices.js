"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeTimeInLastMessage = exports.getUsersWithChats = exports.getFollowing = exports.getFollow = exports.getAllUsers = exports.getUserById = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const usersService_1 = require("../../api/services/usersService");
const api_1 = require("../../api/api");
const initialState = {
    user: [],
    currentUser: null,
    loading: false,
    error: null,
};
// Получение данных пользователя по ID
exports.getUserById = (0, toolkit_1.createAsyncThunk)("user/getUserById", (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // принимаем userId
    const data = yield (0, usersService_1.getUserByIdApi)(userId);
    return data;
}));
// Получение всех пользователей
exports.getAllUsers = (0, toolkit_1.createAsyncThunk)("user/getAllUsers", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api_1.$api.get("/user");
    return response.data;
}));
exports.getFollow = (0, toolkit_1.createAsyncThunk)("user/getFollow", (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api_1.$api.get(`/follow/${userId}/followers`);
    return response.data;
}));
exports.getFollowing = (0, toolkit_1.createAsyncThunk)("user/getFollowing", (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api_1.$api.get(`/follow/${userId}/following`);
    return response.data;
}));
// Получение пользователей с перепиской
exports.getUsersWithChats = (0, toolkit_1.createAsyncThunk)("user/getUsersWithChats", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api_1.$api.get("/messages/chats");
    return response.data;
}));
const userSlice = (0, toolkit_1.createSlice)({
    name: "user",
    initialState,
    reducers: {
        changeTimeInLastMessage: (state, { payload }) => {
            state.user = state.user.map((user) => {
                if (user._id === payload.userId) {
                    return Object.assign(Object.assign({}, user), { lastMessage: payload.lastMessage });
                }
                return user;
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.getUserById.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.currentUser = null;
        })
            .addCase(exports.getUserById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload || null;
        })
            .addCase(exports.getUserById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Error loading posts";
        })
            .addCase(exports.getAllUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.getAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
            .addCase(exports.getAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Error loading posts";
        })
            .addCase(exports.getFollow.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.getFollow.fulfilled, (state, { payload }) => {
            state.loading = false;
            if (state.currentUser) {
                state.currentUser.followers_count = payload.length;
            }
        })
            .addCase(exports.getFollow.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Error loading posts";
        })
            .addCase(exports.getFollowing.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.getFollowing.fulfilled, (state, { payload }) => {
            state.loading = false;
            if (state.currentUser) {
                state.currentUser.following_count = payload.length;
            }
        })
            .addCase(exports.getFollowing.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Error loading posts";
        })
            .addCase(exports.getUsersWithChats.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.getUsersWithChats.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload; // Записываем список пользователей в стейт
        })
            .addCase(exports.getUsersWithChats.rejected, (state, action) => {
            state.loading = false;
            state.error =
                action.error.message ||
                    "Ошибка при загрузке пользователей с перепиской";
        });
    },
});
exports.changeTimeInLastMessage = userSlice.actions.changeTimeInLastMessage;
exports.default = userSlice.reducer;
