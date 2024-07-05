import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { isEmail } from "../../../helper/helper";
import { addUser } from "../../../features/user/userApiSlice";

const AddUsers = () => {
  const dispatch = useDispatch();

  const formField = useRef(null);

  // handle htmlForm submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newForm = new FormData(e.target);
    const { name, email, gender, password } = Object.fromEntries(
      newForm.entries()
    );
    if (!name || !email || !gender || !password) {
      return toast.error("All fields are required!");
    }
    //email check
    if (!isEmail(email)) {
      return toast.error("Invalid email format");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }

    const response = await dispatch(addUser({ name, email, password, gender }));
    if (response?.payload?.success) {
      e.target.reset();
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className=" sm:w-[500px] mx-auto h-fit px-4 py-6 text-[#33bdf8]  mt-5 mb-10">
      <div className="bg-[#1e293bd6] p-4 rounded-md">
        <div>
          <h1 className="text-xl font-bold text-center">Add New User</h1>
        </div>

        <form className="w-full" onSubmit={handleSubmit} ref={formField}>
          <div className="mb-6 w-full">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className=" bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter User Name"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="web"
              className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white"
            >
              Gender
            </label>
            <div className="flex justify-evenly">
              <label className="border py-1 h-10 px-4 flex items-center rounded-md border-zinc-600">
                <input
                  type="radio"
                  className="text-center  bg-zinc-400 focus:outline-none focus:border-none focus:ring-0"
                  name="gender"
                  value={"male"}
                  id=""
                />
                <span className="pl-5">Male</span>
              </label>
              <label className="border py-1 h-10 px-4 flex items-center rounded-md border-zinc-600">
                <input
                  type="radio"
                  className="text-center  bg-zinc-400 focus:outline-none focus:border-none focus:ring-0"
                  name="gender"
                  value={"female"}
                  id=""
                />
                <span className="pl-5">Female</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter User Email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="cell"
              className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="cel"
                className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Password"
              />
              <span
                className="absolute right-6 top-3 cursor-pointer"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
          </div>

          <div className="w-full">
            <button
              type="submit"
              className=" text-[#ffffff] font-bold bg-[#259af8] hover:bg-blue-800  focus:outline-none focus:ring-0  rounded-lg text-sm  w-full px-5 py-2.5 text-center "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddUsers;
