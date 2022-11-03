import { createSlice, nanoid } from "@reduxjs/toolkit";
import { fetchPosts } from "./postApi";
const initialState: any = {
  status: "idle",
  posts: [
    { id: 0, time: "", tags: ["m"], title: "title 1", body: "content 1" },
  ],
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state: any, action: any) => {
      state.posts = [...state.posts, action.payload];
      console.log("new", state.posts);
    },
    deletePost: (state: any, action: any) => {
      state.posts = state.posts.filter(
        (post: any) => post.id !== action.payload
      );
      console.log("new", state.posts);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "succeeded";
      //    Adding date and reactions
      const loadedData = action.payload.map((post: any) => {
        return {
          ...post,
          id: nanoid(),
          time: new Date().toLocaleString(),
          tags: post.title.split(" "),
        };
      });
      console.log("loaded data", loadedData);

      state.posts = [...state.posts, ...loadedData];
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { addPost } = postSlice.actions;
export const { deletePost } = postSlice.actions;

export default postSlice.reducer;
