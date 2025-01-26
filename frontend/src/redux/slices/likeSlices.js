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
exports.unlikePost = exports.likePost = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const api_1 = require("../../api/api");
exports.likePost = (0, toolkit_1.createAsyncThunk)("likes/likePost", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ postId, userId }, { rejectWithValue }) {
    var _c;
    try {
        const response = yield api_1.$api.post(`/likes/${postId}/${userId}`);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(((_c = error.response) === null || _c === void 0 ? void 0 : _c.data) || "Error liking the post");
    }
}));
exports.unlikePost = (0, toolkit_1.createAsyncThunk)("likes/unlikePost", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ postId, userId }, { rejectWithValue }) {
    var _c;
    try {
        const response = yield api_1.$api.delete(`/likes/${postId}/${userId}`);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(((_c = error.response) === null || _c === void 0 ? void 0 : _c.data) || "Error unliking the post");
    }
}));
const likesSlice = (0, toolkit_1.createSlice)({
    name: "likes",
    initialState: {
        likes: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(exports.likePost.fulfilled, (state, action) => {
            state.likes[action.meta.arg.postId] = true;
        })
            .addCase(exports.unlikePost.fulfilled, (state, action) => {
            state.likes[action.meta.arg.postId] = false;
        })
            .addCase(exports.likePost.rejected, (state, action) => {
            state.error = action.payload;
        })
            .addCase(exports.unlikePost.rejected, (state, action) => {
            state.error = action.payload;
        });
    },
});
exports.default = likesSlice.reducer;
