import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowToast from "../../../components/toast/Toast";
import Cookies from "js-cookie";
import axios from "axios";

const PasswordChange = () => {
  const [inputs, setInputs] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  // handle change
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // handle submit

  const token = Cookies.get("temData");
  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = inputs;
    console.log(inputs);
    if (!newPassword || !confirmPassword) {
      ShowToast("error", "All field are required!");
      return false;
    }
    if (newPassword !== confirmPassword) {
      ShowToast("error", "Password not match");
      return false;
    }

    try {
      await axios
        .post(
          "https://backend-kin.onrender.com/api/v1/administrator/password-change",
          {
            password: inputs.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            //  const msg = res.data.message;
            ShowToast("success", "Successfully Password Recover.");
            setInputs({
              password: "",
              con_password: "",
            });
            Cookies.remove("temData", { sameSite: "Strict" });
            navigate("/login");
          }
        })
        .catch((err) => {
          const msg = err.response.data.message;
          ShowToast("success", msg);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="bg-[#121a2d] h-screen flex flex-col">
      <div className="px-4  pt-6 pb-10 flex-1 flex justify-center items-center">
        <div className=" w-[460px] mx-auto h-fit  rounded-md text-[#33bdf8] bg-[#1e293bd6] ">
          <div className="content-header  p-4 border-zinc-700">
            <h1 className="text-[#91a3b8] font-bold text-xl text-center">
              Password Recovery
            </h1>
          </div>
          <div className="content-body  text-[#91a3b8]  p-4 border-zinc-700">
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter your new password"
                className="mt-3 bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-3 "
                value={inputs.newPassword}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Confirm your password"
                name="confirmPassword"
                className="mt-3 bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-3 "
                value={inputs.confirmPassword}
                onChange={handleChange}
              />
              <div className="pt-6 text-right">
                <button
                  className=" text-[#ffffff] font-bold bg-[#4113d6] hover:bg-[#1c07ba]  focus:outline-none focus:ring-0  rounded-lg text-sm   px-5 py-2.5 text-center"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PasswordChange;
