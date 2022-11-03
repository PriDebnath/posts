import { createAsyncThunk } from "@reduxjs/toolkit";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch(POSTS_URL);
  const data = await response.json();
  //console.log('fetched data',data);

  return data;
});

export { fetchPosts };
