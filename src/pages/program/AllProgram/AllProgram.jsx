import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Pagination } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PhotoProvider, PhotoView } from "react-photo-view";
import usePhotoPreview from "../../../hook/photoPreviewHook/usePhotoPreview";
import {
  deleteProgram,
  getAllProgram,
  updateProgram,
} from "../../../features/program/programApiSlice";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";

const AllProgram = () => {
  const ApiURL = import.meta.env.VITE_SERVER_URL;
  const dispatch = useDispatch();
  const { programs, loading } = useSelector((state) => state.program);

  const formField = useRef(null);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);

  const [inputs, setInputs] = useState({
    title: "",
    fb_url: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    venue: "",
  });

  // photo preview hook
  const { photoSrc, handlePhotoChange, resetPhotoPreview } = usePhotoPreview();

  // handle program update
  const handleUpdateProgram = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { title, fb_url, photo, start_time, start_date, venue } =
      Object.fromEntries(formData.entries());

    // fields check
    if (!title || !fb_url || !start_time || !start_date || !venue) {
      return toast.error("All fields are required!");
    }
    formData.append("id", inputs.id);

    // program photo size check
    if (photo) {
      if (photo.size > 175000)
        return toast.error("Photo size should be less than 175KB");
    }

    //program photo add
    e.target.photo.files[0] &&
      formData.append("program_photo", e.target.photo.files[0]);
    formData.delete("photo");

    const response = await dispatch(updateProgram(formData));
    if (response?.payload?.success) {
      setModalShow(false);
    }
  };

  // handle program delete
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result?.isConfirmed) {
      const response = await dispatch(deleteProgram(id));
      if (response?.payload?.success) {
        programs.data.length <= 1 &&
          setCurrentPage(currentPage <= 1 ? 1 : currentPage - 1);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } else {
        Swal.fire({
          title: "Failed",
          text: response?.error?.message,
          icon: "error",
        });
      }
    }
  };

  // modal
  const [modalShow, setModalShow] = useState(false);

  // handle edit form
  const handleEdit = (program) => {
    formField?.current?.reset();
    resetPhotoPreview();
    setModalShow(true);
    setInputs({ ...program });
  };

  // load all programs
  useEffect(() => {
    dispatch(getAllProgram(`page=${currentPage}&limit=${limit}`));
  }, [dispatch, currentPage, limit]);

  // loading

  if (loading) return <Loading />;

  return (
    <>
      <section className="p-4 pb-10 pt-4 w-full bg-[#121a2d]">
        <h1 className=" pb-4 text-center font-bold text-xl text-[#38bdf8]">
          All Programs
        </h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
          <table className="w-full text-sm text-left text-gray-400 ">
            <thead className="text-xs uppercase bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Program Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Date
                </th>
                <th scope="col" className="px-6 py-3">
                  End Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Time
                </th>
                <th scope="col" className="px-6 py-3">
                  End Time
                </th>

                <th scope="col" className="px-6 py-3">
                  Photo
                </th>
                <th scope="col" className="px-6 py-3">
                  Facebook URL
                </th>

                <th scope="col" className="px-6 py-3 text-center">
                  <span className="">Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="">
              {programs?.data?.map((program, index) => (
                <tr
                  className="  border-b bg-gray-800 border-gray-700 hover:bg-gray-900"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap "
                  >
                    {index + 1}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap "
                  >
                    {program.title}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap "
                  >
                    {program.venue}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap "
                  >
                    {program.start_date}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap "
                  >
                    {program.end_date}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap "
                  >
                    {program.start_time}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap "
                  >
                    {program.end_time}
                  </th>

                  <td className="px-6 py-4">
                    <PhotoProvider>
                      <PhotoView
                        src={`${ApiURL}/public/images/programs/${program.program_photo}`}
                      >
                        <img
                          src={`${ApiURL}/public/images/programs/${program.program_photo}`}
                          alt=""
                          className="w-8 h-8 rounded-sm object-cover  cursor-pointer"
                        />
                      </PhotoView>
                    </PhotoProvider>
                  </td>
                  <td className="px-6 py-4">
                    <Link className=" inline-block" to={program.fb_url}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-white"
                      >
                        <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h8.615v-6.96h-2.338v-2.725h2.338v-2c0-2.325 1.42-3.592 3.5-3.592.699-.002 1.399.034 2.095.107v2.42h-1.435c-1.128 0-1.348.538-1.348 1.325v1.735h2.697l-.35 2.725h-2.348V21H20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"></path>
                      </svg>
                    </Link>
                  </td>

                  <td className="px-6 py-4 text-right flex">
                    <button
                      className="border border-zinc-700 hover:border-zinc-700 px-2 py-1 rounded-sm font-medium  text-blue-600  "
                      onClick={() => handleEdit(program)}
                    >
                      Edit
                    </button>{" "}
                    &nbsp; &nbsp;
                    <button
                      className="border border-zinc-700 hover:border-zinc-700 px-2 py-1 rounded-sm font-medium  text-blue-600 "
                      onClick={() => {
                        handleDelete(program.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* no data found */}
          {!programs && (
            <h1 className="text-lg py-5 text-center text-[#9ca3af]">
              No Data found!
            </h1>
          )}
        </div>
        {/* pagination */}
        {programs?.data?.length > 0 && programs?.pagination?.totalPages > 1 && (
          <div className="flex mt-10 mb-24 w-full rounded-md pagination   items-center justify-center text-center">
            <Pagination
              currentPage={currentPage}
              layout="pagination"
              onPageChange={(value) => {
                setCurrentPage(value);
              }}
              showIcons={true}
              totalPages={Number(programs.pagination.totalPages)}
            />
          </div>
        )}
      </section>

      {/*  modal */}

      <Modal
        show={modalShow}
        position={"center"}
        size={"md"}
        dismissible={true}
        onClose={() => setModalShow(false)}
        className="bg-violet-500/10 "
        theme={{
          content: {
            inner: "bg-transparent py-6",
          },
        }}
      >
        <Modal.Body className="p-0 ">
          <div className="m-auto w-full max-w-md  text-[#99b0ca]">
            {/* <!-- Modal content --> */}
            <div className="relative  rounded-lg shadow bg-[#0d1424] text-[white]">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-[#1f2937] hover:bg-gray-700 hover:text-gray-300 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                onClick={() => {
                  setModalShow(false);
                }}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8 ">
                <h3 className="mb-4 text-xl font-medium text-center">
                  Update Program Data
                </h3>
                <form
                  className="space-y-6"
                  onSubmit={handleUpdateProgram}
                  ref={formField}
                >
                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={inputs.title}
                      id="email"
                      className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                      placeholder="Enter program title"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                      Program Start Date
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      defaultValue={inputs.start_date}
                      id="email"
                      className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                      placeholder="Enter program start date"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                      Program End Date
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      defaultValue={inputs.end_date}
                      id="email"
                      className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                      placeholder="Enter program end date"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                      Program Start Time
                    </label>
                    <input
                      type="text"
                      name="start_time"
                      defaultValue={inputs.start_time}
                      id="email"
                      className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                      placeholder="Example: 10:00 AM"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                      Program End Time
                    </label>
                    <input
                      type="text"
                      name="end_time"
                      defaultValue={inputs.end_time}
                      id="email"
                      className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                      placeholder="Example: 10:00 PM"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                      Venue
                    </label>
                    <input
                      type="text"
                      name="venue"
                      defaultValue={inputs.venue}
                      id="email"
                      className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                      placeholder="Enter program venue"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                      Facebook URL
                    </label>
                    <input
                      type="text"
                      name="fb_url"
                      defaultValue={inputs.fb_url}
                      className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                      placeholder="Enter program facebook url"
                    />
                  </div>

                  <div className="mb-6">
                    <div className="photo">
                      <label className="block mb-2 text-sm font-medium text-[#91a3b8] ">
                        Program Photo
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
                            name="photo"
                          />

                          <label
                            className="cursor-pointer w-full h-full"
                            htmlFor="upload"
                          >
                            <div
                              className="aspect-video w-full grid place-items-center border border-dashed rounded-md border-zinc-400 "
                              id="photoUpload"
                            >
                              {inputs.program_photo ? (
                                <div>
                                  <img
                                    src={`${ApiURL}/public/images/programs/${inputs.program_photo}`}
                                    className="w-full"
                                    alt=""
                                  />
                                </div>
                              ) : (
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
                                  <p className="text-center">
                                    Browse File to Upload
                                  </p>
                                </div>
                              )}
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

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AllProgram;
