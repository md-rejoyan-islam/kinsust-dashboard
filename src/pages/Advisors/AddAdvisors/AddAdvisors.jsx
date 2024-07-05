import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import useFormFields from "../../../hook/fromFieldsHook/useFormFields";
import usePhotoPreview from "../../../hook/photoPreviewHook/usePhotoPreview";
import { isEmail } from "../../../helper/helper";
import { createAdvisor } from "../../../features/advisor/advisorApiSlice";

const AddAdvisors = () => {
  const dispatch = useDispatch();

  // form field hook
  const { input, handleInputChange, resetForm } = useFormFields({
    name: "",
    designation: "",
    email: "",
    cell: "",
    website: "",
    institute: "",
  });

  // photo preview hook
  const { photoSrc, resetPhotoPreview, handlePhotoChange } = usePhotoPreview();

  // handle htmlForm submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldsData = {
      ...input,
      advisor_photo: e.target.advisor_photo.files[0],
    };

    const { name, designation, email, cell, advisor_photo } = fieldsData;
    // field data check
    if (!name || !designation || !email || !cell || !advisor_photo) {
      return toast.error("All fields are required!");
    }
    //email check
    if (!isEmail(email)) {
      return toast.error("Invalid email format");
    }

    const data = new FormData(e.target);

    if (data.get("advisor_photo").size > 200000) {
      return toast.warn("Maximum image is 200KB");
    }

    data.append("resetForm", resetForm);
    data.append("resetPhotoPreview", resetPhotoPreview);

    const response = await dispatch(createAdvisor(data));

    if (response?.payload?.success) {
      resetForm();
      resetPhotoPreview();
    }
  };

  return (
    <section className="sm:w-[500px] mx-auto h-fit px-4 py-6  rounded-md text-[#33bdf8]  mt-5 mb-10">
      <div className="bg-[#1e293bd6] p-4 rounded-md">
        <h1 className="text-xl font-bold text-center pb-4">Add New Advisor</h1>
        <form className="w-full  " onSubmit={handleSubmit}>
          <div className="mb-6 w-full">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              value={input.name}
              id="name"
              className=" bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Advisor Name"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="email"
              onChange={handleInputChange}
              value={input.email}
              id="email"
              className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Advisor Email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="cell"
              className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white"
            >
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="cell"
              onChange={handleInputChange}
              value={input.cell}
              id="cel"
              className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Advisor Designation"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="web"
              className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white"
            >
              Website URL
            </label>
            <input
              type="url"
              name="website"
              onChange={handleInputChange}
              value={input.website}
              id="web"
              className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Advisor Website URL"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="des"
              className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white"
            >
              Designation <span className="text-red-500">*</span>
            </label>
            <textarea
              type="text"
              name="designation"
              onChange={handleInputChange}
              value={input.designation}
              id="des"
              className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Advisor Designation"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="des"
              className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white"
            >
              Institute
            </label>
            <textarea
              type="text"
              name="institute"
              onChange={handleInputChange}
              value={input.institute}
              className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Advisor Institute"
            />
          </div>
          <div className="mb-6">
            <div className="photo">
              <label className="block mb-2 text-sm font-medium text-[#91a3b8] ">
                Advisor Photo <span className="text-red-500">*</span>
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
                    name="advisor_photo"
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

export default AddAdvisors;
