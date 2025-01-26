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
exports.updatePost = exports.likePost = exports.getOtherUserPosts = exports.getAllPublicPosts = exports.getAllPosts = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const api_1 = require("../../api/api");
const initialState = {
    posts: [],
    loading: false,
    error: null,
};
exports.getAllPosts = (0, toolkit_1.createAsyncThunk)("allPosts", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api_1.$api.get("/post/all");
    return response.data;
}));
exports.getAllPublicPosts = (0, toolkit_1.createAsyncThunk)("allPublicPosts", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api_1.$api.get("/post/all/public");
    return response.data;
}));
exports.getOtherUserPosts = (0, toolkit_1.createAsyncThunk)("posts/getOtherUserPosts", (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api_1.$api.get(`/post/${user_id}`);
    return response.data;
}));
// Новый thunk для обработки лайков
exports.likePost = (0, toolkit_1.createAsyncThunk)("posts/likePost", (_a) => __awaiter(void 0, [_a], void 0, function* ({ postId, userId }) {
    const response = yield api_1.$api.post(`/post/${postId}/like`, { userId });
    return { postId, likes_count: response.data.likes_count };
}));
exports.updatePost = (0, toolkit_1.createAsyncThunk)("posts/updatePost", (_a) => __awaiter(void 0, [_a], void 0, function* ({ postId, updatedData, }) {
    const response = yield api_1.$api.put(`/post/${postId}`, updatedData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}));
const postsSlice = (0, toolkit_1.createSlice)({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(exports.updatePost.fulfilled, (state, action) => {
            const updatedPost = action.payload; // Получаем обновлённый объект поста из сервера
            const postIndex = state.posts.findIndex((post) => post._id === updatedPost._id);
            if (postIndex !== -1) {
                // Обновляем пост в массиве
                state.posts[postIndex] = Object.assign(Object.assign({}, state.posts[postIndex]), updatedPost);
            }
        })
            .addCase(exports.getAllPosts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.getAllPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        })
            .addCase(exports.getAllPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Error loading posts";
        })
            .addCase(exports.getAllPublicPosts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.getAllPublicPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        })
            .addCase(exports.getAllPublicPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Error loading posts";
        })
            .addCase(exports.getOtherUserPosts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.getOtherUserPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        })
            .addCase(exports.getOtherUserPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Error loading posts";
        })
            // Добавлено для обработки лайков
            .addCase(exports.likePost.fulfilled, (state, action) => {
            const { postId, likes_count } = action.payload;
            const post = state.posts.find((p) => p._id === postId);
            if (post) {
                post.likes_count = likes_count;
            }
        });
    },
});
exports.default = postsSlice.reducer;
