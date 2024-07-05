import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SweetAlert from "../../../components/sweetAlert/SweetAlert";
import ShowToast from "../../../components/toast/Toast";
import EmailPattern from "../../../components/Check/EmailPattern";
import Cookies from "js-cookie";

const ForgottenPassword = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  // handle submit
  const handleSubmit = async () => {
    // field check
    if (!input) {
      ShowToast("error", "Email is required!");
      return false;
    }

    // email format check
    if (!EmailPattern(input)) {
      ShowToast("error", "Invalid email format");
      return;
    }
    try {
      await axios
        .post(
          "https://backend-kin.onrender.com/api/v1/administrator/identify",
          {
            email: input,
          }
        )
        .then((res) => {
          console.log(res.data);
          const msg = res.data.status;
          // temporary token set
          Cookies.set("temToken", res.data.data.token, {
            expires: 7,
            path: "",
            sameSite: "strict",
          });
          // ShowToast("success", msg);
          navigate("/login/recover");
        })
        .catch((error) => {
          console.log(error);
          const errorMsg = error.response.data.message;
          ShowToast("error", errorMsg);
          // SweetAlert(errorMsg,"error");
        });
    } catch (error) {
      console.log(error);
    }

    // navigate('/login/recover')
  };
  return (
    <section className="bg-[#121a2d] h-screen flex flex-col">
      <div className="px-4  pt-6 pb-10 flex-1 flex justify-center items-center">
        <div className=" w-[460px] mx-auto h-fit  rounded-md text-[#33bdf8] bg-[#1e293bd6]">
          <div className="content-header border-b p-4 border-zinc-700">
            <h1 className="text-[#91a3b8] font-bold text-xl text-center">
              Find Your Account
            </h1>
          </div>
          <div className="content-body  text-[#91a3b8] border-b p-4 border-zinc-700">
            <p>
              Please enter your email address or mobile number to search for
              your account.
            </p>
            <input
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={input}
              type="text"
              placeholder="Enter your email address"
              className="mt-3 bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-3 "
            />
          </div>
          <div className="content-footer p-4 text-right">
            <Link
              to={"/login"}
              className="text-[#ffffff] font-bold bg-[#2a3a47] hover:bg-[#2e422e]  focus:outline-none focus:ring-0  rounded-lg text-sm   px-5 py-2.5 text-center"
            >
              Cancel
            </Link>{" "}
            &nbsp;
            <button
              className="text-[#ffffff] font-bold bg-[#4113d6] hover:bg-[#1c07ba]  focus:outline-none focus:ring-0  rounded-lg text-sm   px-5 py-2.5 text-center"
              onClick={handleSubmit}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgottenPassword;
