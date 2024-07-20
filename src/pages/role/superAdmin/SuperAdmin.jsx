import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSuperAdmins,
  updatePasswordBySuperAdmin,
} from "../../../features/role/roleApiSlice";
import Loading from "../../../components/loading/Loading";
import { Modal } from "flowbite-react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const SuperAdmin = () => {
  const [inputs, setInputs] = useState({
    password: "",
    confirm_password: "",
  });

  const { superAdmins, loading } = useSelector((state) => state.role);

  // modal
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();

  // password update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (inputs.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    if (inputs.password !== inputs.confirm_password)
      return toast.error("Password does not match");

    dispatch(
      updatePasswordBySuperAdmin({
        password: inputs.password,
        id: inputs.id,
      })
    );
  };

  useEffect(() => {
    dispatch(getSuperAdmins());
  }, [dispatch]);

  // loading
  if (loading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>SuperAdmin | KIN Dashboard</title>
      </Helmet>
      <section className=" p-4 pb-10 pt-4 w-full bg-[#121a2d] ">
        <h1 className=" pb-4 text-center font-bold text-xl text-[#38bdf8]">
          All SuperAdmins
        </h1>
        <div className="relative  shadow-md rounded-md sm:rounded-lg w-full overflow-x-auto box-border  ">
          <table className="w-full text-sm text-left text-gray-400  text-nowrap">
            <thead className="text-xs uppercase bg-gray-700 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  <span className="">Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="">
              {superAdmins?.map((user, index) => (
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
                    {user?.name}
                  </th>
                  <td className="px-6 py-4">{user?.email}</td>

                  <td className="px-6 py-4 text-right flex justify-center">
                    <button
                      className="border border-zinc-700 hover:border-zinc-700 px-2 text-[11px] py-[2px] rounded-sm font-medium  text-blue-600  "
                      onClick={() => {
                        setModalShow(true);
                        setInputs({
                          password: "",
                          confirm_password: "",
                          id: user.id,
                        });
                      }}
                    >
                      Change Password
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* no data found */}
          {!superAdmins.length && (
            <h1 className="text-lg py-5 text-center text-[#9ca3af]">
              No Data found!
            </h1>
          )}
        </div>
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
                  Change SuperAdmin Password
                </h3>
                <form className="space-y-6" onSubmit={handlePasswordUpdate}>
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

export default SuperAdmin;
