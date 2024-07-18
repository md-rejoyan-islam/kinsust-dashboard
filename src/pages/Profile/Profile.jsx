import { Modal } from "flowbite-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { authPasswordUpdate } from "../../features/auth/authApiSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const [modalShow, setModalShow] = useState(false);

  const [inputs, setInputs] = useState({
    password: "",
    confirm_password: "",
    id: "",
  });

  const dispatch = useDispatch();

  // handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (inputs.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    if (inputs.password !== inputs.confirm_password)
      return toast.error("Password does not match");

    const response = await dispatch(
      authPasswordUpdate({
        password: inputs.password,
      })
    );
    if (response?.payload?.success) {
      setModalShow(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Profile | KIN Dashboard</title>
      </Helmet>
      <section className="w-full p-4 bg-[#121a2d]">
        <div className="pt-5 flex justify-center">
          <PhotoProvider>
            <PhotoView
              src={
                import.meta.env.VITE_SERVER_URL +
                "/public/images/users/" +
                user.user_photo
              }
            >
              <img
                src={
                  import.meta.env.VITE_SERVER_URL +
                  "/public/images/users/" +
                  user.user_photo
                }
                alt={user?.name}
                className="w-32 h-32 rounded-full object-cover"
              />
            </PhotoView>
          </PhotoProvider>
        </div>
        <div className="text-zinc-400">
          <p className="text-center font-semibold text-blue-500">
            {user?.role}
          </p>
          <p className="text-center text-lg">{user?.name}</p>
        </div>
        <div className="pt-2">
          <button
            className="text-sm px-2 py-1 rounded-sm bg-blue-600 text-white"
            onClick={() => {
              setModalShow(true);
              setInputs({
                id: user?.id,
                password: "",
                confirm_password: "",
              });
            }}
          >
            Change Password
          </button>
        </div>
        <div className="text-zinc-400 py-4 overflow-scroll">
          <table className="w-full details-table">
            <tbody>
              <tr>
                <td>Email</td>
                <td>{user?.email}</td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>{user?.gender}</td>
              </tr>

              <tr>
                <td>Phone</td>
                <td>{user?.phone}</td>
              </tr>
              <tr>
                <td>Blood Group</td>
                <td>{user?.blood_group}</td>
              </tr>
              <tr>
                <td>Sustian</td>
                <td>{user?.is_sustian ? "True" : "False"}</td>
              </tr>
              {user?.is_sustian && (
                <>
                  <tr>
                    <td>Department</td>
                    <td>{user?.department}</td>
                  </tr>
                  <tr>
                    <td>Session</td>
                    <td>{user?.session}</td>
                  </tr>
                </>
              )}
              {!user?.is_sustian && (
                <>
                  <tr>
                    <td>Profession</td>
                    <td>{user?.profession}</td>
                  </tr>
                  <tr>
                    <td>Organization</td>
                    <td>{user?.organization}</td>
                  </tr>
                </>
              )}

              <tr>
                <td>Location</td>
                <td>{user?.location}</td>
              </tr>
              <tr>
                <td>Feedback</td>
                <td>{user?.feedback}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      {/* password change modal  */}
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
            base: "w-full max-w-md m-auto ",
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
                  Change Password
                </h3>
                <form className="space-y-6" onSubmit={handlePasswordChange}>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={inputs.password}
                      onChange={(e) =>
                        setInputs({ ...inputs, password: e.target.value })
                      }
                      className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirm_password"
                      value={inputs.confirm_password}
                      onChange={(e) =>
                        setInputs({
                          ...inputs,
                          confirm_password: e.target.value,
                        })
                      }
                      className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                      placeholder="Enter confirm password"
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

export default Profile;
