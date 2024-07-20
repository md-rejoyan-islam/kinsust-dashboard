import { Modal, Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Swal from "sweetalert2";
import {
  deleteSubscriber,
  getSubscribers,
  updateSubscriber,
} from "../../features/subscriber/subscriberApiSlice";
import Loading from "../../components/Loading";
import { Helmet } from "react-helmet-async";

const Subscriber = () => {
  const dispatch = useDispatch();
  const { subscribers, loading } = useSelector((state) => state.subscriber);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  // search
  const [searchValue, setSearchValue] = useState("");

  // change any data
  const [change, setChange] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    name: "",
  });

  // modal
  const [modalShow, setModalShow] = useState(false);

  // handle Search
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getSubscribers(`?search=${searchValue}`));
  };

  // handle update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.email) return toast.error("Email is required!");

    // id add
    data.id = inputs.id;

    const response = await dispatch(updateSubscriber(data));
    if (response?.payload?.success) {
      setModalShow(false);
    }
  };
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
      const response = await dispatch(deleteSubscriber(id));
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

  // load data
  useEffect(() => {
    dispatch(getSubscribers());
  }, [dispatch]);

  // loading
  if (loading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Subscribers | KIN Dashboard</title>
      </Helmet>
      <section className="w-full p-4 bg-[#121a2d]">
        <h1 className=" pb-4 text-center font-bold text-xl text-[#38bdf8]">
          All SubScriber
        </h1>
        <form className="mb-2" onSubmit={handleSearch}>
          <input
            type="search"
            name="search"
            className="text-white bg-black/10 px-3 py-2 rounded-md min-w-[250px] border-sky-50/10 focus:outline-none focus:ring-2 ring-blue-500/50 border"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            placeholder="Search by Email"
          />
          <button
            type="submit"
            className="px-3 py-2 rounded-md text-white bg-violet-500 ml-2"
          >
            Search
          </button>
        </form>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
          <table className="w-full text-sm text-left text-gray-400 ">
            <thead className="text-xs uppercase bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>

                <th scope="col" className="px-6 py-3 text-center">
                  <span className="">Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="">
              {subscribers?.map((data, index) => (
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
                  <td className="px-6 py-4">{data.email}</td>
                  <td className="px-6 py-4">
                    {data?.name ? data.name : "null"}
                  </td>

                  <td className="px-6 py-4 text-center justify-center flex">
                    <button
                      className="border border-zinc-700 hover:border-zinc-700 px-2 py-1 rounded-sm font-medium  text-blue-600  "
                      onClick={() => {
                        setModalShow(true);
                        setInputs({ ...data });
                      }}
                    >
                      Edit
                    </button>{" "}
                    &nbsp; &nbsp;
                    <button
                      className="border border-zinc-700 hover:border-zinc-700 px-2 py-1 rounded-sm font-medium  text-blue-600 "
                      onClick={() => handleDelete(data.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* no data found */}
          {!subscribers && (
            <h1 className="text-lg py-5 text-center text-[#9ca3af]">
              No Data found!
            </h1>
          )}

          {/* pagination */}
          {subscribers?.data?.length > 0 && subscribers?.pages > 1 && (
            <div className="flex mt-10 mb-24 w-full rounded-md pagination   items-center justify-center text-center">
              <Pagination
                currentPage={currentPage}
                layout="pagination"
                onPageChange={(value) => {
                  setCurrentPage(value);
                  console.log(value);
                  change ? setChange(false) : setChange(true);
                }}
                showIcons={true}
                totalPages={
                  subscribers?.length > 1 && Number(subscribers.pages)
                }
              />
            </div>
          )}
        </div>
      </section>

      {/* modal */}
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
          {" "}
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
                  Update Subscriber Data
                </h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="email"
                      name="email"
                      defaultValue={inputs.email}
                      id="email"
                      className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                      placeholder="Enter subscriber email"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="name"
                      defaultValue={inputs?.name}
                      className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                      placeholder="Enter subscriber name"
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

export default Subscriber;
