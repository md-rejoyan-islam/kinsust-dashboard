import { useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import usePhotoPreview from "../../../hook/photoPreviewHook/usePhotoPreview";
import { createPost } from "../../../features/post/postApiSlice";
import { Helmet } from "react-helmet-async";
import DetailsField from "../../../components/fields/DetailsField";

const AddPost = () => {
  const dispatch = useDispatch();
  // photo preview hook
  const { photoSrc, handlePhotoChange, resetPhotoPreview } = usePhotoPreview();

  const formField = useRef(null);

  // input fields
  const [input, setInputs] = useState({
    title: "",
    banner: "",
    slug: "",
    date: "",
    details: "",
  });
  const photoField = useRef(null);

  // handle htmlForm submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, banner, slug, date, details } = input;
    const photo = photoField.current.files[0];

    const formData = new FormData();
    formData.append("title", title);
    formData.append("banner", banner);
    formData.append("slug", slug);
    formData.append("post_photo", photo);
    formData.append("date", date);

    formData.append("description", details);

    console.log(formData);

    if (!title || !slug || !photo || !date || !banner || !details) {
      return toast.error("All fields are required!");
    }

    const response = await dispatch(createPost(formData));

    if (response?.payload?.success) {
      e.target.reset();
      setInputs({ title: "", banner: "", slug: "", date: "" });
      resetPhotoPreview();
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Post | KIN Dashboard</title>
      </Helmet>
      <section className="w-[530px] mx-auto h-fit p-4 rounded-md text-[#33bdf8] bg-[#1e293bd6] mt-5 mb-10">
        <div>
          <h1 className="text-xl font-bold text-center">Add New Post</h1>
        </div>

        <form className="w-full" ref={formField} onSubmit={handleSubmit}>
          <div className="mb-6 w-full">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white"
            >
              Date
            </label>
            <input
              type="date"
              name="slug"
              value={input.date}
              onChange={(e) => setInputs({ ...input, date: e.target.value })}
              className=" bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-6 w-full">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white"
            >
              Post slug
            </label>
            <textarea
              type="text"
              name="slug"
              value={input.slug}
              onChange={(e) => setInputs({ ...input, slug: e.target.value })}
              className=" bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Post Slug"
            />
          </div>

          <div className="mb-6 w-full">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white"
            >
              Title
            </label>
            <textarea
              type="text"
              name="title"
              value={input.title}
              onChange={(e) => setInputs({ ...input, title: e.target.value })}
              id="name"
              className=" bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Post Title"
            />
          </div>
          <div className="mb-6 w-full">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white"
            >
              Banner show
            </label>
            <textarea
              type="text"
              name="banner"
              id="name"
              value={input.banner}
              onChange={(e) => setInputs({ ...input, banner: e.target.value })}
              className=" bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Post Title"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white"
            >
              Details
            </label>
            <DetailsField setInputs={setInputs} content={input.details} />
          </div>

          <div className="mb-6">
            <div className="photo">
              <label className="block mb-2 text-sm font-medium text-[#91a3b8] ">
                Post Photo
              </label>
              <div className="mx-auto bg-[#111827] rounded-md">
                <div
                  className="w-full grid place-items-center h-full"
                  id="imageParent"
                >
                  <input
                    onChange={handlePhotoChange}
                    type="file"
                    id="upload"
                    ref={photoField}
                    className="h-full w-full cursor-pointer z-10 hidden"
                    name="post_photo"
                  />

                  <label
                    className="cursor-pointer w-full h-full"
                    htmlFor="upload"
                  >
                    <div
                      className="aspect-video w-full grid place-items-center border border-dashed rounded-md border-zinc-400"
                      id="photoUpload"
                    >
                      <div>
                        <span className="fill-[#927ef6] ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mx-auto"
                            width="96"
                            height="96"
                            x="0"
                            y="0"
                            viewBox="0 0 410.309 410.309"
                          >
                            <g>
                              <path
                                d="M382.955 58.96c16.936 2.176 29.014 17.507 27.167 34.482L386.09 306.079c-1.848 16.923-17.066 29.144-33.989 27.295-.339-.037-.677-.08-1.015-.128h-1.567V138.372c0-17.312-14.035-31.347-31.347-31.347H56.947l5.747-52.245c2.179-17.223 17.742-29.535 35.004-27.69l285.257 31.87z"
                                fill="#00acea"
                                data-original="#00acea"
                              ></path>
                              <path
                                d="M349.518 333.246v18.808c0 17.312-14.035 31.347-31.347 31.347H31.347C14.035 383.401 0 369.366 0 352.054v-43.886l86.204-62.694c13.668-10.37 32.794-9.491 45.453 2.09l57.469 50.155a37.094 37.094 0 0 0 42.841 3.657l117.551-68.963v100.833z"
                                fill="#00ceb4"
                                data-original="#00ceb4"
                              ></path>
                              <path
                                d="M349.518 138.372v94.041l-117.551 68.963a37.094 37.094 0 0 1-42.841-3.657l-57.469-50.155c-12.659-11.58-31.785-12.46-45.453-2.09L0 308.168V138.372c0-17.312 14.035-31.347 31.347-31.347h286.824c17.313.001 31.347 14.035 31.347 31.347z"
                                fill="#00efd1"
                                data-original="#00efd1"
                                className=""
                              ></path>
                              <circle
                                cx="208.98"
                                cy="192.707"
                                r="33.437"
                                fill="#d4e1f4"
                                data-original="#d4e1f4"
                              ></circle>
                            </g>
                          </svg>
                        </span>
                        <p className="text-center">Browse File to Upload</p>
                      </div>
                    </div>
                    <div id="photoShow" className="">
                      <img
                        src={photoSrc}
                        alt=""
                        className=" border-none rounded-md w-full"
                      />
                    </div>
                  </label>
                </div>
              </div>
            </div>
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
    </>
  );
};

export default AddPost;
