import { useEffect, useRef, useState } from "react";
import { Modal, Pagination } from "flowbite-react";
import avatar from "../../../assets/avatar/avatar.png";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PhotoProvider, PhotoView } from "react-photo-view";
import {
  allUsers,
  banUser,
  unbannedUser,
  updateUser,
  updateUserRole,
} from "../../../features/user/userApiSlice";
import { addMemberToEc, allEc } from "../../../features/ec/ecApiSlice";
import { paginationTheme } from "../../../components/ui/theme";
import usePhotoPreview from "../../../hook/photoPreviewHook/usePhotoPreview";
import Loading from "../../../components/Loading";

const AllUsers = () => {
  const ApiURL = import.meta.env.VITE_SERVER_URL;
  const dispatch = useDispatch();
  // photo preview
  const { photoSrc, handlePhotoChange, resetPhotoPreview } = usePhotoPreview();
  // all users
  const { users, pagination, loading } = useSelector((state) => state.user);
  // ec data
  const { ec } = useSelector((state) => state.ecs);

  // inputs
  const [inputs, setInputs] = useState({
    name: "",
    designation: "",
    email: "",
    mobile: "",
    role: "",
    blood_group: "",
    department: "",
    session: "",
    profession: "",
    organization: "",
  });

  // search query data from url
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);

  // modal
  const [modalShow, setModalShow] = useState(false);

  // credential modal
  const [credentialModalShow, setCredentialModalShow] = useState(false);
  // ec modal
  const [ecModalShow, setEcModalShow] = useState(false);

  const editForm = useRef(null);
  // identity
  const [identity, setIdentity] = useState("select");

  // credential ref
  const credentialRef = useRef(null);
  const deleteForm = useRef(null);
  // message and  error

  const handleIdentityUpdate = () => {};

  const searchRef = useRef();

  const [searchValue, setSearchValue] = useState("");

  // handle search
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(allUsers(`search=${searchValue}`));
  };

  // handle identity change
  const handleIdentityChange = (value) => {
    if (value === "sustian") {
      setIdentity("sustian");
    } else if (value === "nonSustian") {
      setIdentity("nonSustian");
    } else {
      setIdentity("select");
    }
  };

  // banned change
  const handleBanChange = (id, isBanned) => {
    if (isBanned) {
      dispatch(unbannedUser(id));
    } else {
      dispatch(banUser(id));
    }
  };

  // handle ec add
  const handleEcAdd = async (e) => {
    e.preventDefault();
    const newForm = new FormData(e.target);
    const { index, designation, id } = Object.fromEntries(newForm.entries());
    const ecData = {
      UserId: inputs.id,
      ECId: id,
      index,
      designation,
    };

    const response = await dispatch(addMemberToEc({ data: ecData, id }));

    if (response?.payload?.data?.success) {
      setEcModalShow(false);
    }
  };

  // handle credential submit
  const handleCredentialSubmit = async (e) => {
    e.preventDefault();
    const newForm = new FormData(e.target);
    const { role } = Object.fromEntries(newForm.entries());
    const response = await dispatch(updateUserRole({ role, id: inputs.id }));

    if (response?.payload?.success) {
      setCredentialModalShow(false);
    }
  };

  // handle update submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newForm = new FormData(e.target);

    !e.target.user_photo.files[0] && newForm.delete("user_photo");
    const {
      blood_group,
      session,
      department,
      profession,
      organization,
      mobile,
    } = Object.fromEntries(newForm.entries());
    blood_group === "select" && newForm.delete("blood_group");

    newForm.append("id", inputs.id);

    // check is sustian or not
    if (session || department) {
      newForm.append("is_sustian", true);
    } else if (profession || organization) {
      newForm.append("is_sustian", false);
    }

    // phone number
    if (!mobile) {
      newForm.delete("mobile");
    }

    const response = await dispatch(updateUser(newForm));
    if (response?.payload?.success) {
      setModalShow(false);
      resetPhotoPreview();
    }
  };

  useEffect(() => {
    setSearchParams(`page=${currentPage}`);
    dispatch(allUsers(`page=${currentPage}`));
    dispatch(allEc());
  }, [currentPage, dispatch, setSearchParams]);

  // loading

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <section className="w-full px-4 py-6 bg-[#121a2d] h-full  max-w-[1200px]  ">
        <h1 className=" pb-4 text-center font-bold text-xl text-[#38bdf8]">
          All Users
        </h1>
        <form onSubmit={handleSearch} className="mb-2 flex gap-2 flex-wrap">
          <input
            type="search"
            ref={searchRef}
            name="search"
            value={searchValue}
            className="text-white bg-black/10 px-3 py-2 rounded-md min-w-[250px] border-sky-50/10 focus:outline-none focus:ring-2 ring-blue-500/50 border"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Enter Email or mobile or name"
          />
          <button
            className="bg-violet-600 py-2 px-3 rounded-md text-white"
            type="submit"
          >
            Search
          </button>
        </form>
        <div className="relative  shadow-md rounded-md sm:rounded-lg w-full overflow-x-auto box-border">
          <table className="w-full text-sm text-left text-gray-400 ">
            <thead className="text-xs uppercase bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Mobile
                </th>

                <th scope="col" className="px-6 py-3 text-nowrap">
                  Blood Group
                </th>
                <th scope="col" className="px-6 py-3">
                  Verified
                </th>
                <th scope="col" className="px-6 py-3">
                  Identity
                </th>
                <th scope="col" className="px-6 py-3">
                  Banned
                </th>
                <th scope="col" className="px-6 py-3">
                  Photo
                </th>

                <th scope="col" className="px-6 py-3 text-center text-nowrap">
                  Add to EC
                </th>

                <th scope="col" className="px-6 py-3 text-center">
                  <span className="">Action</span>
                </th>
                <th scope="col" className="px-6 py-3 text-center text-nowrap">
                  <span className="">Roll Change</span>
                </th>
              </tr>
            </thead>
            <tbody className="">
              {users?.map((user, index) => (
                <tr
                  className="  border-b bg-gray-800 border-gray-700 hover:bg-gray-900"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap "
                  >
                    {user.id}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap "
                  >
                    {user.name}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    {user.mobile ? user.mobile : "Not set"}
                  </td>
                  <td className="px-6 py-4">
                    {user.blood_group ? user.blood_group : "Not set"}
                  </td>
                  <td className="px-6 py-4">
                    {user.isVerified ? "True" : "False"}
                  </td>
                  <td className="px-6 py-4">
                    {user.is_sustian
                      ? user.department + "_" + user.session ||
                        user.profession + "_" + user?.organization
                      : "Not set"}
                  </td>
                  <td className="px-6 py-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        onChange={() => {
                          handleBanChange(user.id, user.isBanned);
                        }}
                        checked={user.isBanned ? true : false}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </td>

                  <td className="px-6 py-4 ">
                    <PhotoProvider>
                      <PhotoView
                        src={`${ApiURL}/public/images/users/${user.user_photo}`}
                      >
                        <img
                          src={
                            user.user_photo
                              ? `${ApiURL}/public/images/users/${user.user_photo}`
                              : avatar
                          }
                          alt=""
                          className="w-8 h-8 rounded-sm object-cover cursor-pointer"
                        />
                      </PhotoView>
                    </PhotoProvider>
                  </td>

                  <td className="px-6 py-4 ">
                    <button
                      className="border border-zinc-700 hover:border-zinc-700 px-2 py-1 rounded-sm font-medium h-fit w-[120px] text-blue-600  "
                      onClick={() => {
                        setEcModalShow(true);
                        setInputs({ ...user });
                      }}
                    >
                      Add to EC
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right flex gap-2 items-center">
                    <Link
                      to={`/all-users/${user.email}`}
                      className="border border-zinc-700 hover:border-zinc-700 px-2 py-1 rounded-sm font-medium  text-blue-600  h-fit"
                    >
                      More
                    </Link>{" "}
                    &nbsp; &nbsp;
                    <button
                      className="border border-zinc-700 hover:border-zinc-700 px-2 py-1 rounded-sm font-medium h-fit text-blue-600  "
                      onClick={() => {
                        setInputs({ ...user });
                        setModalShow(true);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-4 ">
                    <button
                      className="border border-zinc-700 hover:border-zinc-700 px-2 py-1 rounded-sm font-medium h-fit text-blue-600  "
                      onClick={() => {
                        // credentialRef.current.reset();
                        setCredentialModalShow(true);
                        setInputs({ ...user });
                      }}
                    >
                      Credential
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* no data found */}
          {!users?.length && (
            <h1 className="text-lg py-5 text-center text-[#9ca3af]">
              No Data found!
            </h1>
          )}
        </div>
        {/* pagination */}
        {pagination?.totalPages > 0 && (
          <div className="flex mt-10 mb-24 w-full rounded-md pagination   items-center justify-center text-center">
            <Pagination
              currentPage={currentPage}
              layout="pagination"
              onPageChange={(value) => {
                setCurrentPage(value);
              }}
              showIcons={true}
              totalPages={Number(pagination?.totalPages)}
              theme={paginationTheme}
            />
          </div>
        )}
      </section>

      {/* update  modal  data*/}

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
          {" "}
          <div className="m-auto w-full max-w-md  text-[#323838]">
            {/* <!-- Modal content --> */}
            <div className="relative top-0  rounded-lg shadow bg-[#0d1424] text-[white] ">
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
                  Update User Data
                </h3>
                <form
                  className="space-y-6"
                  onSubmit={handleSubmit}
                  ref={editForm}
                >
                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      name="mobile"
                      defaultValue={inputs.mobile}
                      className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 placeholder:text-zinc-600
                      "
                      placeholder="+8801xxxxxxxx"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                      isVerified
                    </label>
                    <select
                      name="isVerified"
                      defaultValue={inputs.isVerified}
                      className="bg-slate-800 focus:outline-none py-2.5 px-3 focus:border-none text-[#91a3b8] w-full rounded-md"
                    >
                      <option
                        value={true}
                        disabled={inputs?.isVerified ? true : false}
                      >
                        True
                      </option>
                      <option
                        value={false}
                        disabled={!inputs?.isVerified ? true : false}
                      >
                        False
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                      Blood Group
                    </label>
                    <select
                      name="blood_group"
                      defaultValue={inputs?.blood_group}
                      className="bg-slate-800 py-2.5 px-3 focus:outline-none focus:border-none text-[#91a3b8] w-full rounded-md"
                    >
                      <option value="select">--select--</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                      Facebook
                    </label>
                    <input
                      type="text"
                      name="fb_url"
                      defaultValue={inputs?.fb_url}
                      id="email"
                      className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                      placeholder="Enter Linkedin URL"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                      LinkedIn
                    </label>
                    <input
                      type="text"
                      name="linkedIn_url"
                      defaultValue={inputs?.linkedIn_url}
                      id="email"
                      className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                      placeholder="Enter Facebook URL"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-[#91a3b8]"
                    >
                      Instagram
                    </label>
                    <input
                      type="text"
                      name="instagram_url"
                      defaultValue={inputs?.instagram_url}
                      id="email"
                      className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                      placeholder="Enter Instagram URL"
                    />
                  </div>

                  <div className="my-2 space-y-1 flex flex-col">
                    <label className="text-[17px] font-semibold">
                      Identity{" "}
                    </label>
                    <select
                      onChange={(e) => {
                        handleIdentityChange(e.target.value);
                      }}
                      defaultValue={
                        inputs?.is_sustian ? "sustian" : "nonSustian"
                      }
                      className="bg-slate-800 py-2.5 px-3 focus:outline-none focus:border-none text-[#91a3b8] w-full rounded-md"
                    >
                      <option value="select">--Select--</option>
                      <option
                        value="sustian"
                        disabled={
                          inputs?.is_sustian === null
                            ? false
                            : inputs?.is_sustian
                            ? false
                            : true
                        }
                      >
                        SUSTian
                      </option>
                      <option
                        value="nonSustian"
                        disabled={
                          inputs?.is_sustian === null
                            ? false
                            : inputs?.is_sustian
                            ? true
                            : false
                        }
                      >
                        NON-SUSTian
                      </option>
                    </select>
                  </div>
                  {identity === "sustian" && (
                    <>
                      {/* department  */}
                      <div className="my-2 space-y-1 flex flex-col">
                        <label className="text-[17px] font-semibold">
                          Department{" "}
                        </label>
                        <input
                          type="text"
                          name="department"
                          defaultValue={inputs?.department}
                          onChange={handleIdentityUpdate}
                          className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                        />
                      </div>
                      {/* session  */}
                      <div className="my-2 space-y-1 flex flex-col">
                        <label className="text-[17px] font-semibold">
                          Session{" "}
                        </label>
                        <input
                          type="text"
                          name="session"
                          defaultValue={inputs?.session}
                          onChange={handleIdentityUpdate}
                          className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                        />
                      </div>
                    </>
                  )}

                  {identity === "nonSustian" && (
                    <>
                      {/* profession  */}
                      <div className="my-2 space-y-1 flex flex-col">
                        <label className="text-[17px] font-semibold">
                          Profession{" "}
                        </label>
                        <input
                          type="text"
                          name="profession"
                          value={inputs?.profession}
                          onChange={handleIdentityUpdate}
                          className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                        />
                      </div>
                      {/* organization  */}
                      <div className="my-2 space-y-1 flex flex-col">
                        <label className="text-[17px] font-semibold">
                          Organization{" "}
                        </label>
                        <input
                          type="text"
                          name="organization"
                          value={inputs?.organization}
                          onChange={handleIdentityUpdate}
                          className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                        />
                      </div>{" "}
                    </>
                  )}

                  <div className="mb-6 h-full">
                    <div className="photo">
                      <label className="block mb-2 text-sm font-medium text-[#91a3b8] ">
                        User Photo
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
                            name="user_photo"
                          />

                          <label
                            className="cursor-pointer w-full h-full"
                            htmlFor="upload"
                          >
                            <div
                              className="aspect-video w-full grid place-items-center border border-dashed rounded-md border-zinc-400 "
                              id="photoUpload"
                            >
                              {inputs?.user_photo ? (
                                <div>
                                  <img
                                    src={`${ApiURL}/public/images/users/${inputs?.user_photo}`}
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
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* credential modal */}

      <Modal
        show={credentialModalShow}
        position={"center"}
        size={"md"}
        dismissible={true}
        onClose={() => setCredentialModalShow(false)}
        className="bg-violet-500/10 "
        theme={{
          content: {
            inner: "bg-transparent py-6",
          },
        }}
      >
        <Modal.Body className="p-0 ">
          {" "}
          <div className="m-auto w-full max-w-md  text-[#323838]">
            {/* <!-- Modal content --> */}
            <div className="relative  rounded-lg shadow bg-[#0d1424] text-[white]">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-[#1f2937] hover:bg-gray-700 hover:text-gray-300 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                onClick={() => {
                  setCredentialModalShow(false);
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
                  Update User data
                </h3>
                <form
                  className="space-y-6"
                  ref={credentialRef}
                  onSubmit={handleCredentialSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-[#91a3b8]"
                    >
                      Role
                    </label>
                    <select
                      name="role"
                      className="bg-slate-800 focus:outline-none py-2.5 px-2 focus:border-none text-[#91a3b8] w-full rounded-md text-center disabled:cursor-none disabled:bg-gray-700 disabled:text-gray-400 disabled:opacity-50"
                      defaultValue={inputs.role}
                    >
                      <option
                        value="user"
                        disabled={inputs.role === "user" ? true : false}
                      >
                        User
                      </option>
                      <option
                        value="admin"
                        disabled={inputs.role === "admin" ? true : false}
                      >
                        Admin
                      </option>
                      <option
                        value="superAdmin"
                        disabled={inputs.role === "superAdmin" ? true : false}
                      >
                        Super Admin
                      </option>
                    </select>
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

      {/*  ec add modal */}
      <Modal
        show={ecModalShow}
        position={"center"}
        size={"md"}
        dismissible={true}
        onClose={() => setEcModalShow(false)}
        className="bg-violet-500/10 "
        theme={{
          content: {
            inner: "bg-transparent py-6",
          },
        }}
      >
        <Modal.Body className="p-0 ">
          <div className="m-auto w-full max-w-md  text-[#323838]">
            {/* <!-- Modal content --> */}
            <div className="relative  rounded-lg shadow bg-[#0d1424] text-[white]">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-[#1f2937] hover:bg-gray-700 hover:text-gray-300 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                onClick={() => setEcModalShow(false)}
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
                  Add to EC
                </h3>
                <form
                  className="space-y-6"
                  onSubmit={handleEcAdd}
                  ref={deleteForm}
                >
                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                      EC Nam
                    </label>
                    <select
                      name="id"
                      className="bg-gray-700 focus:outline-none focus:border-none text-[#91a3b8] w-full rounded-md text-center py-2.5 px-2"
                    >
                      {ec?.map((item, index) => (
                        <option
                          disabled={
                            item?.members?.find(
                              (member) => member.ECMember.UserId === inputs?.id
                            )?.id
                              ? true
                              : false
                          }
                          value={item?.id}
                          key={index}
                        >
                          {item?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white">
                      Index
                    </label>
                    <input
                      type="text"
                      name="index"
                      className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter EC Serial Number"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white">
                      Designation
                    </label>
                    <input
                      type="text"
                      name="designation"
                      className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter EC Designation"
                    />
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

export default AllUsers;
