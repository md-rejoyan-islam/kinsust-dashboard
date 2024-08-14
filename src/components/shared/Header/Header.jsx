import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo/kin_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../../features/auth/authApiSlice";
import { toast } from "react-toastify";
import { setMessageEmpty } from "../../../features/auth/authSlice";
import PropTypes from "prop-types";
import useDropDownPopupControl from "../../../hook/dropDownPopup/useDropDownPopupControl";
import { IoMenu } from "react-icons/io5";

const Header = ({ setOpenDrawer }) => {
  const { isOpen, toggleMenu, dropDownRef } = useDropDownPopupControl();

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
          <div
            className="flex items-center md:order-2 relative"
            ref={dropDownRef}
          >
            <button
              type="button"
              onClick={() => toggleMenu()}
              className="flex mr-3 text-sm overflow-hidden bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={
                  import.meta.env.VITE_SERVER_URL +
                  "/public/images/users/" +
                  user?.user_photo
                }
                alt="userPhoto"
              />
            </button>

            {/* menu  */}
            {isOpen && (
              <div
                className={`z-50 absolute right-0 top-8 my-4 text-[#91a3b8] list-none bg-[#0f172a] border border-zinc-700 divide-y divide-gray-700 rounded-lg shadow`}
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
                      className="block px-4 py-2 text-sm text-[#91a3b8]  hover:bg-white/10 dark:text-gray-200 dark:hover:text-white"
                    >
                      Profile
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={handleSignOut}
                      className="block px-4 py-2 w-full text-left text-sm text-[#91a3b8]  hover:bg-white/10 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}

            <button
              type="button"
              onClick={() => setOpenDrawer((prev) => !prev)}
              className="lg:hidden inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg  hover:bg-[#1f2937] focus:outline-none  focus:ring-0 "
            >
              <span className="sr-only">Open main menu</span>
              <IoMenu className="w-6 h-6" />
            </button>
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
