import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import usePhotoPreview from "../../hook/photoPreviewHook/usePhotoPreview";

import { Modal, Pagination } from "flowbite-react";
import Download from "./Download";
const ApiURL = import.meta.env.VITE_SERVER_URL;
const OrganizationalWeek = () => {
  // dispatch
  const dispatch = useDispatch();
  const { organizations, orgMembers, message, error } = useSelector(
    (state) => state.organizations
  );

  const { photoSrc, handlePhotoChange } = usePhotoPreview();
  const formField = useRef(null);

  // handle htmlForm submit
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  // handle advisor delete
  const handleDelete = async (id) => {};
  // modal
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);

  // message and error
  useEffect(() => {
    if (message) {
      toast.success(message);
      setModalShow(false);
    }
    error && toast.error(error);
    // dispatch(setMessageEmpty());
  }, [message, error]);

  // handle download
  const handleDownload = async (id) => {};

  return (
    <>
      <section className="w-full p-4 bg-[#121a2d] h-full  max-w-[1200px] ">
        <h1 className=" pb-4 text-center font-bold text-xl text-[#38bdf8]">
          All Advisors
        </h1>
        <div className="relative  shadow-md sm:rounded-lg w-full overflow-x-auto box-border  ">
          <table className="w-full text-sm text-left text-gray-400 ">
            <thead className="text-xs uppercase bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Advisor name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Mobile Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Photo
                </th>
                <th scope="col" className="px-6 py-3">
                  index
                </th>
                <th scope="col" className="px-6 py-3">
                  URL
                </th>
                <th scope="col" className="px-6 py-3">
                  Designation
                </th>
                <th scope="col" className="px-6 py-3">
                  Institute
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  <span className="">Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="">
              {orgMembers?.map((org, index) => (
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
                    {org?.name}
                  </th>
                  <td className="px-6 py-4">{org?.email}</td>
                  <td className="px-6 py-4">{org?.cell}</td>
                  <td className="px-6 py-4">
                    <img
                      src={
                        org.org_photo &&
                        `${ApiURL}/public/images/orgs/${org?.org_photo}`
                      }
                      alt=""
                      className="w-8 h-8 rounded-sm object-cover "
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span>{org?.index}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span>{org?.website}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span>{org?.designation}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span>{org?.institute}</span>
                  </td>
                  <td className="px-6 py-4 text-right flex">
                    <button
                      className="border border-zinc-700 hover:border-zinc-700 px-2 py-1 rounded-sm font-medium  text-blue-600  "
                      onClick={() => {
                        setModalShow2(true);
                      }}
                    >
                      View
                    </button>{" "}
                    <button
                      className="border border-zinc-700 hover:border-zinc-700 px-2 py-1 rounded-sm font-medium  text-blue-600  "
                      onClick={() => {
                        setModalShow(true);
                        formField.current.reset();
                        // setInputs({ ...advisor });
                      }}
                    >
                      Edit
                    </button>{" "}
                    &nbsp; &nbsp;
                    <button
                      className="border border-zinc-700 hover:border-zinc-700 px-2 py-1 rounded-sm font-medium  text-blue-600 "
                      onClick={() => {
                        handleDelete(org.id);
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
          {!organizations && (
            <h1 className="text-lg py-5 text-center text-[#9ca3af]">
              No Data found!
            </h1>
          )}

          {/* pagination */}
          {organizations?.length > 0 && organizations?.pages > 1 && (
            <div className="flex mt-10 mb-24 w-full rounded-md pagination   items-center justify-center text-center">
              <Pagination
                currentPage={organizations?.currentPage}
                layout="pagination"
                onPageChange={(value) => {}}
                showIcons={true}
                totalPages={
                  organizations?.data?.length > 1 && Number(organizations.pages)
                }
              />
            </div>
          )}
        </div>

        {/* react modal */}

        {/* <Modal
          show={modalShow}
          className="  modalBlurBody  absolute "
          onClose={() => {
            setModalShow(false);
          }}
        >
          <Modal.Body>
            <div className="m-auto w-full max-w-md  text-[#91a3b8] h-full ">

              <div className="relative  rounded-lg shadow bg-[#0d1424] text-[white] h-screen">
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
                    Sign in to our platform
                  </h3>
                  <form
                    className="space-y-6"
                    onSubmit={handleSubmit}
                    ref={formField}
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-[#91a3b8]"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={inputs.name}
                        className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                        placeholder="Enter advisor name"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                        Designation
                      </label>
                      <input
                        type="text"
                        name="designation"
                        defaultValue={inputs.designation}
                        className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                        placeholder="Enter designation"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                        Institute
                      </label>
                      <input
                        type="text"
                        name="institute"
                        defaultValue={inputs.institute}
                        className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                        placeholder="Enter Institute name"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        defaultValue={inputs.email}
                        className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                        placeholder="Enter advisor email"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        name="cell"
                        defaultValue={inputs.cell}
                        className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                        placeholder="Enter advisor number"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                        Website URL
                      </label>
                      <input
                        type="text"
                        name="website"
                        defaultValue={inputs.website}
                        className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                        placeholder="Enter advisor website URL"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                        Index
                      </label>
                      <input
                        type="text"
                        name="index"
                        defaultValue={inputs.index}
                        className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                        placeholder="Enter advisor index number"
                      />
                    </div>
                    <div className="mb-6">
                      <div className="photo">
                        <label className="block mb-2 text-sm font-medium text-[#91a3b8] ">
                          Advisor Photo
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
                                className="aspect-video w-full grid place-items-center border border-dashed rounded-md border-zinc-400 "
                                id="photoUpload"
                              >
                                {inputs.advisor_photo ? (
                                  <div>
                                    <img
                                      src={`http://localhost:8080/public/images/advisors/${inputs.advisor_photo}`}
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
        </Modal> */}
      </section>

      <Modal
        show={modalShow2}
        className="  modalBlurBody  absolute "
        onClose={() => {
          setModalShow2(false);
        }}
      >
        <Modal.Body>
          <div className="m-auto w-full   text-[#91a3b8] h-full ">
            <div className="relative  rounded-lg shadow bg-[#0d1424] text-[white] h-screen">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-[#1f2937] hover:bg-gray-700 hover:text-gray-300 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                onClick={() => {
                  setModalShow2(false);
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
                  Sign in to our platform
                </h3>
                <div className="w-full">
                  <Download />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OrganizationalWeek;
