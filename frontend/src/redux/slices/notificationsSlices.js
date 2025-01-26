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
exports.fetchNotifications = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const api_1 = require("../../api/api");
// Асинхронное действие для получения действий пользователя
exports.fetchNotifications = (0, toolkit_1.createAsyncThunk)("notifications/fetchNotifications", (userId_1, _a) => __awaiter(void 0, [userId_1, _a], void 0, function* (userId, { rejectWithValue }) {
    var _b;
    try {
        const response = yield api_1.$api.get(`/notifications/${userId}/actions`);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) || "Ошибка при загрузке уведомлений");
    }
}));
const notificationsSlice = (0, toolkit_1.createSlice)({
    name: "notifications",
    initialState: { actions: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchNotifications.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchNotifications.fulfilled, (state, action) => {
            state.loading = false;
            state.actions = action.payload.slice(0, 10); // Последние 10 действий
        })
            .addCase(exports.fetchNotifications.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
exports.default = notificationsSlice.reducer;
