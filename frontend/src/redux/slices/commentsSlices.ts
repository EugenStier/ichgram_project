import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "../../api/api";
// получить комментарии
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId: string, { rejectWithValue }) => {
    try[
        const response = await $api.get("/comments/${postId}");
        return response.data;
    ] catch (error: any) {
        return isRejectedWithValue(error.response?.data || "Error ferching comments");
    }
  }
);
//добавить комментарий
export const addComment = createAsyncThunk(
    "comments/addComments",
    async ({ postId, userId, comment_text, profile_image }: {postId: string; userId: string; comment_text: string; profile_image: string;}, { rejectWithValue }) => {
        try {
            const response = await $api.post("/comments/${postId", {userId, comment_text, profile_image });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error adding comment");
        }
    }
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState: { comments: [], loading: false, error: null },
    reducers: {
      setComments: (state, action) => {
        state.comments = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchComments.fulfilled, (state, action) => {
          state.comments = action.payload;
        })
        .addCase(addComment.fulfilled, (state, action) => {
          state.comments.push(action.payload);
        })
        .addCase(likeComment.fulfilled, (state, action) => {
          const index = state.comments.findIndex((c: any) => c._id === action.payload._id);
          if (index !== -1) {
            state.comments[index] = action.payload;
          }
        });
    },
  });
  
  export const { setComments } = commentsSlice.actions;
  
  export default commentsSlice.reducer;
  