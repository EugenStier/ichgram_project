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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setComments = exports.addComment = exports.fetchComments = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const api_1 = require("../../api/api");
// получить комментарии
exports.fetchComments = (0, toolkit_1.createAsyncThunk)("comments/fetchComments", (postId_1, _a) => __awaiter(void 0, [postId_1, _a], void 0, function* (postId, { rejectWithValue }) {
    try { }
    finally { }
    [];
    const response = yield api_1.$api.get("/comments/${postId}");
    return response.data;
}));
try { }
catch (error) {
    return isRejectedWithValue(((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || "Error ferching comments");
}
;
//добавить комментарий
exports.addComment = (0, toolkit_1.createAsyncThunk)("comments/addComments", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ postId, userId, comment_text, profile_image }, { rejectWithValue }) {
    var _c;
    try {
        const response = yield api_1.$api.post("/comments/${postId", { userId, comment_text, profile_image });
        return response.data;
    }
    catch (error) {
        return rejectWithValue(((_c = error.response) === null || _c === void 0 ? void 0 : _c.data) || "Error adding comment");
    }
}));
const commentsSlice = (0, toolkit_1.createSlice)({
    name: 'comments',
    initialState: { comments: [], loading: false, error: null },
    reducers: {
        setComments: (state, action) => {
            state.comments = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchComments.fulfilled, (state, action) => {
            state.comments = action.payload;
        })
            .addCase(exports.addComment.fulfilled, (state, action) => {
            state.comments.push(action.payload);
        })
            .addCase(likeComment.fulfilled, (state, action) => {
            const index = state.comments.findIndex((c) => c._id === action.payload._id);
            if (index !== -1) {
                state.comments[index] = action.payload;
            }
        });
    },
});
exports.setComments = commentsSlice.actions.setComments;
exports.default = commentsSlice.reducer;
