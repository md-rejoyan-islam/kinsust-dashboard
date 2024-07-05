import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Details = () => {
  const { email } = useParams();
  // token
  const token = Cookies.get("token");
  const [details, setDetails] = useState({});
  useEffect(() => {
    axios
      .get(
        `https://backend-kin.onrender.com/api/v1/users?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        [token]
      )
      .then((res) => setDetails(res.data.data[0]))
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <section className="py-10 px-6 mx-auto">
      <div className="m-auto sm:w-[440px] min-w-[360px]   text-[#496079]">
        {/* <!-- Modal content --> */}
        <div className="relative  rounded-lg shadow bg-[#0d1424] text-[white]">
          <div className="px-6 py-6 lg:px-8 ">
            <h3 className="mb-4 text-xl font-medium text-center">
              More Information
            </h3>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-[#91a3b8]"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="name"
                  value={details?.location ? details.location : "Not Set"}
                  className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                  Mobile Number
                </label>
                <input
                  type="text"
                  value={details?.cell ? details.cell : "Not Set"}
                  className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                />
              </div>
              {details?.isEC?.year && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                    EC Membership year
                  </label>
                  <input
                    type="text"
                    value={details.isEC.year}
                    className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                  />
                </div>
              )}
              <div>
                <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                  Blood Group
                </label>
                <input
                  type="text"
                  value={details?.group ? details.group : "Not Set"}
                  className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                  Age
                </label>
                <input
                  type="text"
                  value={details?.age ? details.age : "Not Set"}
                  className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                  Gender
                </label>
                <input
                  type="text"
                  value={details?.gender ? details.gender : "Not Set"}
                  className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                  Feedback
                </label>
                <textarea
                  className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-sm focus:ring-0 focus:border-gray-500 block w-full p-2.5 
                      "
                  value={details?.feedback ? details.feedback : "Not Set"}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-[#91a3b8]">
                  Social Media
                </label>
                <div className="flex justify-center gap-8 items-center">
                  <Link to={details?.fb ? details.fb : ""}>
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
                  <Link to={details?.instagram ? details.instagram : ""}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="fill-white"
                    >
                      <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                      <circle cx="16.806" cy="7.207" r="1.078"></circle>
                      <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-4">
          <Link
            to={"/all-users"}
            className="bg-blue-500 text-white font-bold hover:bg-violet-500 py-2 px-4 rounded-md w-full block text-center"
          >
            Back
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Details;
