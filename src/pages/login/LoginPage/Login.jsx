import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

import { isEmail } from "../../../helper/helper";
import { userLogin } from "../../../features/auth/authApiSlice";
import SmallLoader from "../../../components/SmallLoader";
import { Helmet } from "react-helmet-async";

const Login = () => {
  // dispatch
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // password show hide
  const [showPassword, setShowPassword] = useState(false);
  // auth context

  // inputs
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  //handle input field change
  const handleChange = async (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // handle htmlForm submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = inputs;
    // input fields check
    if (!email || !password) {
      return toast.error("All fields are required!");
    }
    // email format check
    if (!isEmail(email)) {
      return toast.error("Invalid email format");
    }

    dispatch(userLogin({ email, password, setLoading }));
  };

  return (
    <>
      <Helmet>
        <title>Login| KIN Dashboard</title>
      </Helmet>
      <main className="bg-[#121a2d] min-h-screen flex flex-col">
        <section className="px-4  py-12 flex-1 flex justify-center items-center">
          <div className=" w-[460px] mx-auto h-fit p-4 rounded-md text-[#33bdf8] bg-[#1e293bd6] ">
            <div>
              <h1 className="text-xl font-bold text-center">Login</h1>
            </div>

            <form className="w-full" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={inputs.email}
                  id="email"
                  className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 
                  "
                  placeholder="Enter  Email Address"
                />
              </div>
              <div className="mb-3 relative">
                <label className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  value={inputs.password}
                  className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter password"
                />
                <span
                  onClick={() => {
                    showPassword
                      ? setShowPassword(false)
                      : setShowPassword(true);
                  }}
                  className="cursor-pointer top-[41.5px] right-4 absolute"
                >
                  {showPassword ? <BsFillEyeSlashFill /> : <IoEyeSharp />}
                </span>
              </div>
              <div className="mb-4">
                <Link to={"/login/identify"} className="hover:underline">
                  Forgotten password?
                </Link>
              </div>
              <div className="w-full">
                <button
                  type="submit"
                  className=" text-[#ffffff] font-bold bg-[#259af8] hover:bg-blue-800  focus:outline-none focus:ring-0  rounded-lg text-sm  w-full px-5 py-2.5 text-center "
                >
                  {loading ? <SmallLoader /> : "Login"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
