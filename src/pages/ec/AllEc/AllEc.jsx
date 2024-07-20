import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Modal } from "flowbite-react";
import { useRef } from "react";
import Swal from "sweetalert2";
import { allEc, deleteEc, updateEc } from "../../../features/ec/ecApiSlice";
import Loading from "../../../components/loading/Loading";
import { Helmet } from "react-helmet-async";

const AllEc = () => {
  const dispatch = useDispatch();
  const { ec, loading } = useSelector((state) => state.ecs);

  // inputs
  const [inputs, setInputs] = useState({
    name: "",
    year: "",
  });

  // modal
  const [modalShow, setModalShow] = useState(false);

  // modal ref
  const modalRef = useRef(null);

  // handle delete
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
      const response = await dispatch(deleteEc(id));
      if (response?.payload?.success) {
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

  // handle update ec data
  const handleUpdateData = async (e) => {
    e.preventDefault();
    const newForm = new FormData(e.target);
    const data = Object.fromEntries(newForm.entries());
    const { name, year } = data;
    if (!name || !year) {
      return toast.error("Please fill all the fields");
    }

    const response = await dispatch(updateEc({ data, id: inputs.id }));

    if (response?.payload?.success) {
      setModalShow(false);
    }
  };

  const handleModalEdit = (item) => {
    modalRef?.current?.reset();
    setInputs({ ...item });
    setModalShow(true);
  };

  // load data

  useEffect(() => {
    dispatch(allEc());
  }, [dispatch]);

  // loading
  if (loading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>All EC | KIN Dashboard</title>
      </Helmet>
      <section className="w-full p-4 bg-[#121a2d]">
        <h1 className=" pb-4 text-center font-bold text-xl text-[#38bdf8]">
          All EC Member
        </h1>
        <div className="relative overflow-x-auto shadow-md rounded-md sm:rounded-lg w-full">
          <table className="w-full text-sm text-left text-gray-400 ">
            <thead className="text-xs uppercase bg-gray-700 text-nowrap">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Executive Committee name
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Committee Year
                </th>
                <th scope="col" className="px-6 py-3">
                  Committee Member
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  <span className="">Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="">
              {ec?.map((item, index) => (
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
                  <td className="px-6 py-4">{item?.year}</td>
                  <td className="px-6 py-4">{item?.members?.length}</td>
                  <td className="px-6 py-4 text-right flex">
                    <button
                      className="border border-zinc-700 hover:border-zinc-700 px-2 py-1 rounded-sm font-medium  text-blue-600  "
                      onClick={() => handleModalEdit(item)}
                    >
                      Edit
                    </button>{" "}
                    &nbsp; &nbsp;
                    <button
                      className="border border-zinc-700 hover:border-zinc-700 px-2 py-1 rounded-sm font-medium  text-blue-600 "
                      onClick={() => {
                        handleDelete(item.id);
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
      {/* modal  */}

      <Modal
        show={modalShow}
        position={"center"}
        size={"md"}
        onClose={() => setModalShow(false)}
        dismissible
        className="bg-violet-500/10 "
        theme={{
          content: {
            inner: "bg-transparent",
          },
        }}
      >
        <Modal.Body className="p-0 ">
          <div className="m-auto w-full max-w-md  py-4 text-[#91a3b8]  h-[calc(100vh-16px)]">
            <div className="flex flex-col justify-center items-center h-full">
              <div className="relative  rounded-lg shadow bg-[#0d1424] text-[white] w-full ">
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
                    Update EC Committee
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
                        Enter EC Committee Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        // onChange={(e) => {
                        //   setInputs({ ...inputs, name: e.target.value });
                        // }}
                        defaultValue={inputs.name}
                        className=" bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Example : 17th executive committee"
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white">
                        Committee Year
                      </label>
                      <input
                        type="text"
                        name="year"
                        defaultValue={inputs.year}
                        // onChange={(e) => {
                        //   setInputs({ ...inputs, year: e.target.value });
                        // }}
                        className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Example : 2022"
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
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AllEc;
