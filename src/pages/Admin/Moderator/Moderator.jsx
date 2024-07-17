import { useState } from "react";
import axios from "axios";
import ShowToast from "../../../components/toast/Toast";

const Moderator = () => {
  const [inputs, setInputs] = useState({
    title: "",
    fb_url: "",
  });

  const [moderators, setModerators] = useState([]);
  // change any data
  const [change, setChange] = useState(false);

  //handle input field change
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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

  // handle edit
  const handleEdit = () => {};
  // modal
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <section className=" p-4 pb-10 pt-4 w-full bg-[#121a2d] ">
        <h1 className=" pb-4 text-center font-bold text-xl text-[#38bdf8]">
          All Moderator
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
              {moderators?.map((advisor, index) => (
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
                    {advisor?.name}
                  </th>
                  <td className="px-6 py-4">{advisor?.email}</td>

                  <td className="px-6 py-4 text-right flex">
                    <button
                      className="border border-zinc-700 hover:border-zinc-700 px-2 py-1 rounded-sm font-medium  text-blue-600  "
                      onClick={() => handleEdit(advisor)}
                    >
                      Edit
                    </button>{" "}
                    &nbsp; &nbsp;
                    <button
                      className="border border-zinc-700 hover:border-zinc-700 px-2 py-1 rounded-sm font-medium  text-blue-600 "
                      onClick={() => {
                        handleDelete(advisor.id);
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
          {!moderators && (
            <h1 className="text-lg py-5 text-center text-[#9ca3af]">
              No Data found!
            </h1>
          )}
        </div>
      </section>

      {/* modal part */}
    </>
  );
};

export default Moderator;
