import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddPostForm from "./AddPostForm";
import { fetchPosts } from "../../redux/posts/postApi";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../redux/posts/postsSlice";
import FullPostModal from "./FullPostModal";

const Posts = () => {
  const dispatch: any = useDispatch();

  const posts = useSelector((state: any) => state.posts.posts);

  console.log("posts", posts);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const [open, setOpen] = React.useState(false);
  const [post, setPost] = useState({});

  return (
    <>
      <div>
        <button
          onClick={() => {
            navigate("/add-post");
          }}
          type="button"
          className="z-50 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out fixed right-2 top-2"
        >
          Add Post
        </button>

        <div className="flex  flex-wrap justify-center flex-row-reverse">
          {posts &&
            posts.map((post: any) => {
              return (
                <div
                  className="m-2 w-full md:w-3/12 card   p-4 rounded-lg shadow-lg shadow-blue-200 bg-white  border-2 relative"
                  key={post.id}
                >
                  <button
                    className="absolute z-50 right-0 top-0 p-2 cursor-pointer	deleteIcon"
                    onClick={() => dispatch(deletePost(post.id))}
                  >
                    ❌
                  </button>
                  <h5
                    className="text-gray-900 text-xl  font-medium mb-2 "
                    key={post.id}
                  >
                    {post.title.slice(0, 25)}...
                  </h5>
                  <p
                    className="text-gray-700 text-base mb-4 cursor-pointer"
                    onClick={(e) => {
                      setOpen(true);
                      setPost(post);
                    }}
                  >
                    {post.body.slice(0, 100)}...
                    <span className="font-mono absolute right-0 bottom-0 p-2 ">
                      {post.time}
                    </span>
                  </p>
                </div>
              );
            })}
        </div>
      </div>
      <FullPostModal open={open} setOpen={setOpen} post={post} />
    </>
  );
};

export default Posts;
