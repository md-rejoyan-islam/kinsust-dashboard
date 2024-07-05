import { Modal } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import {
  allEc,
  removeMemberFromEc,
  singleEcData,
  updateMemberFromEc,
} from "../../../features/ec/ecApiSlice";
import Swal from "sweetalert2";

const EcMembers = () => {
  const dispatch = useDispatch();

  // inputs
  const [inputs, setInputs] = useState({
    designation: "",
    index: "",
  });

  // ec
  const { ec, singleEc, loading } = useSelector((state) => state.ecs);
  const [ecId, setEcId] = useState(ec[ec.length - 1]?.id || "");

  const [EcData, setEcData] = useState([]);

  const selectedRef = useRef(null);

  // modal show hide
  const [modalShow, setModalShow] = useState(false);

  // remove member from ec
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
      const response = await dispatch(removeMemberFromEc(id));

      if (response?.payload?.data?.success) {
        dispatch(singleEcData(ecId));
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

  // handle update Delete
  const handleUpdateData = async (e) => {
    e.preventDefault();
    const newForm = new FormData(e.target);
    const data = Object.fromEntries(newForm.entries());
    const { designation, index } = data;
    if (!designation || !index) {
      return toast.error("All fields are required!");
    }

    const response = await dispatch(
      updateMemberFromEc({
        data: { designation, index },
        id: inputs?.ECMember?.id,
      })
    );
    if (response?.payload?.success) {
      dispatch(singleEcData(ecId));
      setModalShow(false);
    }
  };
  // modal ref
  const modalRef = useRef(null);

  // handle ec data change
  const handleEcDataChange = (e) => {
    setEcId(e.target.value);
    dispatch(singleEcData(e.target.value));
  };

  const data = (singleEc.members ? singleEc : EcData)?.members;

  // load data
  useEffect(() => {
    dispatch(allEc());
  }, [dispatch]);

  if (loading) {
    return <div>loading.....</div>;
  }

  return (
    <>
      <section className="w-full px-4 py-10 bg-[#121a2d]">
        <div>
          <h1 className=" pb-4 text-center font-bold text-xl text-[#38bdf8]">
            EC Members
          </h1>
          {singleEc?.id && (
            <select
              className="bg-slate-700 text-white rounded-sm mb-2 py-1.5 px-3"
              onChange={handleEcDataChange}
              ref={selectedRef}
              defaultValue={singleEc.id}
            >
              {ec.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="relative overflow-x-auto shadow-md rounded-md sm:rounded-lg w-full">
          <table className="w-full text-sm text-left text-gray-400 ">
            <thead className="text-xs uppercase bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Designation
                </th>
                <th scope="col" className="px-6 py-3">
                  Index
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  <span className="">Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="">
              {data &&
                [...data]
                  ?.sort((a, b) => a.index - b.index)
                  ?.map((item, index) => (
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
                        {item?.name}
                      </th>

                      <td className="px-6 py-4">
                        {item?.ECMember?.designation}
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap "
                      >
                        {item?.ECMember?.index}
                      </th>
                      <td className="px-6 py-4 text-right flex">
                        <button
                          className="border border-zinc-700 hover:border-zinc-700 px-2 py-1 rounded-sm font-medium  text-blue-600  "
                          onClick={() => {
                            modalRef?.current?.reset();
                            setInputs({ ...item });
                            setModalShow(true);
                          }}
                        >
                          Edit
                        </button>{" "}
                        &nbsp; &nbsp;
                        <button
                          className="border border-zinc-700 hover:border-zinc-700 px-2 py-1 rounded-sm font-medium  text-blue-600 "
                          onClick={() => {
                            handleDelete(item?.ECMember?.id);
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
          {/* {!advisors && (
              <h1 className="text-lg py-5 text-center text-[#9ca3af]">
                No Data found!
              </h1>
            )} */}

          {/* pagination */}
          {/* {advisors?.length > 0 && advisors?.pages > 1 && (
              <div className="flex mt-10 mb-24 w-full rounded-md pagination   items-center justify-center text-center">
                <Pagination
                  currentPage={advisors?.currentPage}
                  layout="pagination"
                  onPageChange={(value) => {}}
                  showIcons={true}
                  totalPages={
                    advisors?.data?.length > 1 && Number(advisors.pages)
                  }
                />
              </div>
            )} */}
        </div>
      </section>
      {/*  modal */}

      <Modal
        show={modalShow}
        position={"center"}
        size={"md"}
        onClose={() => setModalShow(false)}
        dismissible
        className="bg-violet-500/10 "
        theme={{
          content: {
            inner: "bg-transparent py-6",
          },
        }}
      >
        <Modal.Body className="p-0 ">
          <div className="m-auto w-full max-w-md  text-[#91a3b8] h-full ">
            <div className="relative  rounded-lg shadow bg-[#0d1424] text-[white] ">
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
                  Update Member Data
                </h3>
                <form
                  className="space-y-6"
                  onSubmit={handleUpdateData}
                  ref={modalRef}
                >
                  <div className="mb-6 w-full">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white"
                    >
                      Designation
                    </label>
                    <input
                      type="text"
                      name="designation"
                      defaultValue={inputs?.ECMember?.designation}
                      className=" bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Example : President"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white">
                      Index
                    </label>
                    <input
                      type="text"
                      name="index"
                      defaultValue={inputs?.ECMember?.index}
                      className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Example : 1 / 2"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
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

export default EcMembers;
