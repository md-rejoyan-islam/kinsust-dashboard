import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import ShowToast from "../../../components/toast/Toast";
import Cookies from "js-cookie";

const Moderator = () => {
  const token = Cookies.get("token");

  const [inputs, setInputs] = useState({
    title: "",
    fb_url: "",
  });

  const [moderators, setModerators] = useState([]);
  // change any data
  const [change, setChange] = useState(false);
  //fetch advisors data
  useEffect(() => {
    axios
      .get(`https://backend-kin.onrender.com/api/v1/administrator`)
      .then((res) => setModerators(res.data))
      .catch((err) => console.log(err));
  }, [inputs, change]);

  //handle input field change
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // handle update submit
  //   const handleSubmit = async(e) => {
  //  e.preventDefault();
  //  const formData = new FormData(e.target);
  //     const { title, fb_url } = Object.fromEntries(formData.entries())
  //     if (!title || !fb_url) {
  //       ShowToast("error", "All fields are  required!");
  //       return
  //     }
  //  try {
  //    axios
  //      .patch(`https://backend-kin.onrender.com/api/v1/news-ticker/${inputs.id}`, {title,fb_url}, {
  //        headers: {
  //          Authorization: `Bearer ${token}`,
  //        },
  //      })
  //      .then((res) => {
  //        setModalShow(false);
  //        ShowToast("success", "Successfully Updated");
  //        e.target.reset()
  //      })
  //      .catch((err) => {
  //        ShowToast("error", err.response.data.message);
  //        console.log(err);
  //      });
  //  } catch (error) {
  //    console.log(error);
  //  }
  //   };
  // delete
  const handleDelete = (id) => {
    try {
      axios
        .delete(`https://backend-kin.onrender.com/api/v1/news-ticker/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setModalShow(false);
          ShowToast("success", "Successfully Deleted");
          change ? setChange(false) : setChange(true);
        })
        .catch((err) => {
          ShowToast("error", err.response.data.message);
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  // modal
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <section className="w-full p-4 bg-[#121a2d]">
        <h1 className=" pb-4 text-center font-bold text-xl text-[#38bdf8]">
          All Moderator
        </h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
          <table className="w-full text-sm text-left text-gray-400 ">
            <thead className="text-xs uppercase bg-gray-700">
              <tr>
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
              {moderators?.data?.map((data) => (
                <tr className="  border-b bg-gray-800 border-gray-700 hover:bg-gray-900">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap "
                  >
                    {data.title}
                  </th>

                  <td className="px-6 py-4">
                    <Link className=" inline-block" to={data.fb_url}>
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
                    {/* <button
                      className="border border-zinc-700 hover:border-zinc-700 px-2 py-1 rounded-sm font-medium  text-blue-600  "
                      onClick={() => {
                        setModalShow(true);
                        setInputs({...data})
                      }}
                    >
                      Edit
                    </button>{" "}
                    &nbsp; &nbsp; */}
                    <button
                      className="border border-zinc-700 hover:border-zinc-700 px-2 py-1 rounded-sm font-medium  text-blue-600 "
                      onClick={() => {
                        handleDelete(data.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* modal part */}

      {/* react modal */}
      {/* <Modal
        dismissible={true}
        position="center"
        show={modalShow}
        className=" modalBlurBody "
      >
        <Modal.Body className="">
          <div className="m-auto w-full max-w-md  text-[#99b0ca]">
            
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
                  Update News Ticker Data
                </h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
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
                      placeholder="Enter advisor name"
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
    </>
  );
};

export default Moderator;
