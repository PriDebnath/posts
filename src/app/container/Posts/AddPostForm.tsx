import React, { useState } from "react";
import { addPost } from "../../redux/posts/postsSlice";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { Dialog, DialogProps, DialogActions, Button } from "@mui/material";
const AddPostForm = (props: any) => {
  const { openForm, setOpenForm } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");

  const formik = useFormik({
    initialValues: {
      title: "",
      tags: "",
      body: "",
    },
    onSubmit: (values) => {
      const data = {
        ...values,
        id: nanoid(),
        time: new Date().getTime(),
        tags: values.tags.split(","),
      };

      dispatch(addPost(data));
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

    },
  });

  const handleClose = () => {
    setOpenForm(false);
  };

  return (
    <Dialog
      open={openForm}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <form onSubmit={formik.handleSubmit} className=" p-4 m-4 ">
        <div className="form-group mb-6  ">
          <input
            type="text"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInput7"
            placeholder="Title"
          />
        </div>
        <div className="form-group mb-6">
          <input
            type="text"
            name="tags"
            onChange={formik.handleChange}
            value={formik.values.tags}
            className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInput8"
            placeholder="Add tags comma separated"
          />
        </div>
        <div className="form-group mb-6">
          <textarea
            onChange={formik.handleChange}
            name="body"
            value={formik.values.body}
            className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
            id="exampleFormControlTextarea13"
            rows={3}
            placeholder="Content"
          ></textarea>
        </div>

        <button
          onClick={() => setOpenForm(false)}
          type="submit"
          className="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
        >
          Add Post
        </button>
      </form>
    </Dialog>
  );
};

export default AddPostForm;
