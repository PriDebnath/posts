import { createSlice, nanoid } from "@reduxjs/toolkit";
import { fetchPosts } from "./postApi";
const initialState: any = {
  status: "idle",
  posts: [
    { id: 0, time: "", tags: ["js"], title: "JavaScript", body: "JavaScript, often abbreviated as JS, is an interpreted programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions." },
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
          time: new Date().getTime(),
          tags: post.title.split(" "),
        };
      }).slice(1,10)

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
