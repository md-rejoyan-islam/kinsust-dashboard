import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import usePhotoPreview from "../../../hook/photoPreviewHook/usePhotoPreview";
import { createSlider } from "../../../features/slider/sliderApiSlice";

const AddSlider = () => {
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.slider);

  // photo preview
  const [photoSrc, setPhotoSrc] = useState(null);
  // handle photo change
  const handlePhotoChange = (e) => {
    const imageFile = e.target.files[0];
    usePhotoPreview(imageFile, setPhotoSrc);
  };

  // handle htmlForm submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { title, slider_photo } = Object.fromEntries(formData.entries());
    if (!title || !slider_photo) {
      return toast.error("All fields are required!");
    }

    dispatch(createSlider(formData));
  };

  const formRef = useRef();
  // useEffect(() => {
  //   if (message) {
  //     toast.success(message);
  //     formRef.current.reset();
  //     setPhotoSrc("");
  //   }
  //   error && toast.error(error);
  //   dispatch(setMessageEmpty());
  // }, [error, message]);

  return (
    <section className="sm:w-[500px] mx-auto h-fit px-4 py-9 rounded-md text-[#33bdf8] mt-5 mb-10">
      <div className="bg-[#1e293bd6]  p-5 rounded-md">
        <h1 className="text-xl font-bold text-center pb-2">Add New Slider</h1>
        <form className="w-full" onSubmit={handleSubmit} ref={formRef}>
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

          <div className="mb-6">
            <div className="photo">
              <label className="block mb-2 text-sm font-medium text-[#91a3b8] ">
                Slider Photo
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
                    className="h-full w-full cursor-pointer z-10 hidden"
                    name="slider_photo"
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
      </div>
    </section>
  );
};

export default AddSlider;
