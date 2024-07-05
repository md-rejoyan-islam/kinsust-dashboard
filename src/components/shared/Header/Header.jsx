import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo/KIN Logo white-01.png";

import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../../features/auth/authApiSlice";
import { toast } from "react-toastify";
import { setMessageEmpty } from "../../../features/auth/authSlice";
import PropTypes from "prop-types";

const Header = ({ setOpenDrawer }) => {
  const [avatarMenu, setAvatarMenu] = useState(false);

  const dispatch = useDispatch();
  const { message, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    error && toast.error(error);
    dispatch(setMessageEmpty());
  }, [message, error, dispatch]);

  // handle sign out
  const handleSignOut = () => {
    dispatch(userLogout());
  };
  return (
    <section>
      <nav className="border-b border-gray-800 bg-[#0f172a] ">
        <div className=" flex flex-wrap items-center justify-between mx-auto px-4 py-2">
          <Link to={"/"} className="flex items-center">
            <img src={logo} className=" mr-3 lg:h-16 h-12 " alt="KIN Logo" />
          </Link>
          {/* <!-- Dropdown menu --> */}
          <div className="flex items-center md:order-2 relative">
            <button
              type="button"
              onClick={() => {
                avatarMenu ? setAvatarMenu(false) : setAvatarMenu(true);
              }}
              className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={user?.photo}
                alt="userPhoto"
              />
            </button>

            <div
              className={`z-50 absolute ${
                avatarMenu ? "block" : "hidden"
              } right-0 top-8 my-4 text-[#91a3b8] list-none bg-[#0f172a] border border-zinc-700 divide-y divide-gray-700 rounded-lg shadow`}
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-[#91a3b8] dark:text-white">
                  {user?.name}
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  {user?.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <Link
                    to={"/profile"}
                    onClick={() => {
                      setAvatarMenu(false);
                    }}
                    className="block px-4 py-2 text-sm text-[#91a3b8]  hover:bg-[#1f2937] dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <button
                    onClick={handleSignOut}
                    className="text-left w-full  px-4 py-2 text-sm text-[#91a3b8]  hover:bg-[#1f2937] dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => setOpenDrawer((prev) => !prev)}
              className="lg:hidden inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg  hover:bg-[#1f2937] focus:outline-none  focus:ring-0 "
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full lg:flex md:w-auto md:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li className="relative w-full h-[42px]">
                <input
                  type="search"
                  placeholder="Search"
                  className="rounded-md bg-gray-800 border-gray-800 w-[350px] pl-12 focus:outline-none focus:ring-0 focus:border-zinc-900 text-zinc-400 h-full"
                  name=""
                  id=""
                />
                <span className="absolute top-[11px] fill-gray-600 left-3 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                  </svg>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
};

Header.propTypes = {
  setOpenDrawer: PropTypes.func,
};

export default Header;
