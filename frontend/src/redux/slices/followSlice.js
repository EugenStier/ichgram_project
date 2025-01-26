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
exports.getFollowingMe = exports.getFollowMe = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const api_1 = require("../../api/api");
const initialState = {
    follower: null,
    following: null,
};
exports.getFollowMe = (0, toolkit_1.createAsyncThunk)("user/getFollow", (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api_1.$api.get(`/follow/${userId}/followers`);
    return response.data;
}));
exports.getFollowingMe = (0, toolkit_1.createAsyncThunk)("user/getFollowing", (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api_1.$api.get(`/follow/${userId}/following`);
    return response.data;
}));
const followSlice = (0, toolkit_1.createSlice)({
    name: "follow",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(exports.getFollowMe.fulfilled, (state, { payload }) => {
            state.following = payload.map((item) => item.user_id._id);
        });
        builder.addCase(exports.getFollowingMe.fulfilled, (state, { payload }) => {
            state.follower = payload.map((item) => item.user_id._id);
        });
    },
});
exports.default = followSlice.reducer;
