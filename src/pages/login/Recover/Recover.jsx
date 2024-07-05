import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router-dom";

const Recover = () => {
  // auto input field focus
  const focusChange = (e) => {
    if (e.target.value && e.target.nextElementSibling) {
      e.target.nextElementSibling.focus();
    } else if (
      e.key === "Enter" &&
      e.target.value &&
      e.target.nextElementSibling
    ) {
      e.target.nextElementSibling.focus();
    }
    if (e.key === "Backspace" && e.target.previousElementSibling) {
      e.target.previousElementSibling.focus();
    }
  };

  const navigate = useNavigate();

  // handle code submit
  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("temToken");
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    // value reset
    e.target.reset();
    const codeArray = [data.code1, data.code2, data.code3, data.code4];
    const code = codeArray.join("");

    try {
      await axios
        .post(
          "https://backend-kin.onrender.com/api/v1/administrator/code-check",
          {
            code,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          Cookies.set("temData", res.data.result.token, {
            expires: 7,
            sameSite: "Strict",
            path: "",
          });
          navigate("/login/password-change");
          setTimeout(() => {
            Cookies.remove("temToken", { sameSite: "Strict" });
          }, 100);
        })
        .catch((err) => {
          console.log(err);
          // const msg = err.response.data.message;
          // ShowToast("success", msg);
        });
    } catch (err) {
      console.log(err);
    }
    // navigate("/login/password-change");
  };
  // handle submit
  // const handleSubmit = () => {
  //   alert(input);
  //   navigate("/login/password-change");
  // };
  return (
    <section className="bg-[#121a2d] h-screen flex flex-col">
      <div className="px-4  pt-6 pb-10 flex-1 flex justify-center items-center">
        <div className=" w-[460px] mx-auto h-fit  rounded-md text-[#33bdf8] bg-[#1e293bd6]">
          <div className="content-header border-b p-4 border-zinc-700">
            <h1 className="text-[#91a3b8] font-bold text-xl text-center">
              Enter security code
            </h1>
          </div>
          <div className=" content-body  text-[#91a3b8]  p-4 border-zinc-700 rounded-md">
            <p className="text-lg">
              Please check your emails for a message with your code. Your code
              is 4 numbers long.
            </p>
            <form className="pb-5 pt-4  " onSubmit={handleCodeSubmit}>
              <div className="flex justify-between px-4 ">
                <input
                  type="text"
                  maxLength={"1"}
                  name="code1"
                  className="text-center text-2xl border w-16  rounded-sm h-16 bg-[#0202246a] text-[#cdd6dd] border-zinc-700 focus:outline-none focus:border-zinc-600 focus:ring-0"
                  onKeyUp={focusChange}
                />
                <input
                  type="text"
                  maxLength={"1"}
                  name="code2"
                  className="text-center text-2xl border w-16  rounded-sm h-16 bg-[#0202246a] text-[#cdd6dd] border-zinc-700 focus:outline-none focus:border-zinc-600 focus:ring-0"
                  onKeyUp={focusChange}
                />
                <input
                  type="text"
                  maxLength={"1"}
                  name="code3"
                  className="text-center text-2xl border w-16  rounded-sm h-16 bg-[#0202246a] text-[#cdd6dd] border-zinc-700 focus:outline-none focus:border-zinc-600 focus:ring-0"
                  onKeyUp={focusChange}
                />
                <input
                  type="text"
                  maxLength={"1"}
                  name="code4"
                  className="text-center text-2xl border w-16  rounded-sm h-16 bg-[#0202246a] text-[#cdd6dd] border-zinc-700 focus:outline-none focus:border-zinc-600 focus:ring-0"
                  onKeyUp={focusChange}
                />
              </div>
              <div className="modal-action  pt-8 text-right">
                <button
                  type="submit"
                  className="py-[6px] px-3 hover:bg-[#1068f5] rounded-md text-lg  text-white bg-[#0c51d2]"
                >
                  next
                </button>
              </div>

              {/* <input className="tracking-[112px] px-6 text-3xl w-full overflow-hidden" maxLength={'4'} size={'4'} /> */}
            </form>
          </div>
          {/* <div className="content-footer p-4 text-right">
          
            <button
              className="text-[#ffffff] font-bold bg-[#4113d6] hover:bg-[#1c07ba]  focus:outline-none focus:ring-0  rounded-lg text-sm   px-5 py-2.5 text-center"
              onClick={handleSubmit}
            >
              Next
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Recover;
