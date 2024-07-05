import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import ShowToast from "../../../components/toast/Toast";
import { useDispatch } from "react-redux";
import { createNews } from "../../../features/news/newsApiSlice";

const AddNews = () => {
  const dispatch = useDispatch();

  // handle htmlForm submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { title, fb_url } = Object.fromEntries(formData.entries());
    if (!title || !fb_url) {
      ShowToast("error", "All fields are required!");
      return;
    }
    dispatch(createNews({ title, fb_url }));
  };
  return (
    <section className="w-[500px] mx-auto h-fit p-4 rounded-md text-[#33bdf8] bg-[#1e293bd6] mt-5 mb-10">
      <div>
        <h1 className="text-xl font-bold text-center">Add News </h1>
      </div>

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-6 w-full">
          <label className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white">
            Title
          </label>
          <input
            type="text"
            name="title"
            className=" bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter slider title"
          />
        </div>

        <div className="mb-6 w-full">
          <label className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white">
            Facebook URL
          </label>
          <input
            type="text"
            name="fb_url"
            className=" bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter program facebook url"
          />
        </div>

        <div className="w-full">
          <button
            type="submit"
            className=" text-[#ffffff] font-bold bg-[#259af8] hover:bg-blue-800  focus:outline-none focus:ring-0  rounded-lg text-sm  w-full px-5 py-2.5 text-center "
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddNews;
