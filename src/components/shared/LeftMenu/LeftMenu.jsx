import { NavLink, useLocation } from "react-router-dom";
import "./LeftMenu.css";
import { Sidebar } from "flowbite-react";
import { BsFillPostcardHeartFill } from "react-icons/bs";
import { SiTripadvisor } from "react-icons/si";
import { BiUser } from "react-icons/bi";
import { MdEventRepeat, MdOutlineAdminPanelSettings } from "react-icons/md";
import { GiOrganigram } from "react-icons/gi";
import { MdRememberMe } from "react-icons/md";
import { TfiGallery } from "react-icons/tfi";

import DropDown from "../../dropDown/DropDown";
import PropTypes from "prop-types";

const LeftMenu = ({ openDrawer, setOpenDrawer }) => {
  const pathaname = useLocation().pathname;

  return (
    <section className=" z-50 lg:block relative h-full">
      <div
        className={` ${
          openDrawer ? "-translate-x-0" : "-translate-x-full"
        }  lg:-translate-x-0 absolute h-full top-[0px] lg:sticky lg:top-0  
           p-4 overflow-y-auto transition-transform    w-80 border-zinc-700 bg-[#0f172a] text-zinc-400`}
        aria-labelledby="drawer-navigation-label"
      >
        <div className="flex justify-between  items-center">
          <h5
            id="drawer-navigation-label"
            className="text-base font-semibold text-[#91a3b8] uppercase "
          >
            Menu
          </h5>
          <button
            type="button"
            onClick={() => setOpenDrawer((prev) => !prev)}
            className="lg:hidden  text-gray-400 bg-[#1f2937] hover:bg-gray-700  hover:text-[#91a3b8] rounded-lg text-sm p-1.5"
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
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <div className="py-4 overflow-y-auto bg-[#0f172a] border-none">
          <ul className="space-y-2 font-medium border-none  bg-black">
            {/* advisors */}
            <Sidebar
              aria-label="Sidebar with multi-level dropdown example"
              className=" bg-[#0f172a] "
            >
              <Sidebar.Items className="bg-[#0f172a]  overflow-hidden">
                <Sidebar.ItemGroup className="  rounded-lg border-none">
                  <DropDown
                    name={"Advisors"}
                    Icon={SiTripadvisor}
                    isActive={pathaname.includes("/advisors/")}
                    links={[
                      { name: "All Advisors", slug: "/advisors/all-advisors" },
                      {
                        name: "Add Advisor",
                        slug: "/advisors/add-advisor",
                      },
                    ]}
                  />
                  <DropDown
                    name={"EC"}
                    Icon={MdRememberMe}
                    isActive={pathaname.includes("/ecs/")}
                    links={[
                      { name: "All EC Committee", slug: "/ecs/all-ec" },
                      {
                        name: "Add New EC Committee",
                        slug: "/ecs/add-ec",
                      },
                      {
                        name: "EC Members",
                        slug: "/ecs/ec-members",
                      },
                    ]}
                  />
                  <DropDown
                    name={"Users"}
                    Icon={BiUser}
                    isActive={pathaname.includes("/users/")}
                    links={[
                      { name: "All Users", slug: "/users/all-users" },
                      {
                        name: "Add User",
                        slug: "/users/add-user",
                      },
                    ]}
                  />
                  {/* <DropDown
                    name={"Sliders"}
                    Icon={BiSlider}
                    isActive={pathaname.includes("/sliders/")}
                    links={[
                      { name: "All Sliders", slug: "/sliders/all-sliders" },
                      {
                        name: "Add Sliders",
                        slug: "/sliders/add-slider",
                      },
                    ]}
                  /> */}
                  <DropDown
                    name={"Program"}
                    Icon={MdEventRepeat}
                    isActive={pathaname.includes("/programs/")}
                    links={[
                      { name: "All Programs", slug: "/programs/all-programs" },
                      {
                        name: "Add Program",
                        slug: "/programs/add-program",
                      },
                    ]}
                  />
                  <DropDown
                    name={"Post"}
                    Icon={BsFillPostcardHeartFill}
                    isActive={pathaname.includes("/posts/")}
                    links={[
                      { name: "All Post", slug: "/posts/all-post" },
                      {
                        name: "Add Post",
                        slug: "/posts/add-post",
                      },
                    ]}
                  />

                  <li className="singleItem">
                    <NavLink
                      to={"/subscriber"}
                      className="singleItem flex items-center px-0   py-2 text-[#91a3b8] rounded-lg "
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        data-testid="flowbite-sidebar-item-icon"
                        className="h-6 w-6  ml-2 mr-3 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 10v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-6 4l-6-3.27v6.53L16 16z"></path>
                      </svg>
                      <span>Subscriber</span>
                    </NavLink>
                  </li>
                  <DropDown
                    name={"Gallery"}
                    Icon={TfiGallery}
                    isActive={pathaname.includes("/gallery/")}
                    links={[
                      { name: "Program", slug: "/gallery/program" },
                      {
                        name: "Post",
                        slug: "/gallery/post",
                      },
                      {
                        name: "Advisor",
                        slug: "/gallery/advisor",
                      },
                      {
                        name: "Users",
                        slug: "/gallery/users",
                      },
                      // {
                      //   name: "Slider",
                      //   slug: "/gallery/slider",
                      // },
                      // {
                      //   name: "EC",
                      //   slug: "/gallery/ec",
                      // },
                    ]}
                  />

                  <li className="singleItem">
                    <NavLink
                      to={"/organizational-week"}
                      className="singleItem flex items-center px-0   py-2 text-[#91a3b8] rounded-lg "
                    >
                      <span>
                        <GiOrganigram className="text-xl  ml-2 mr-3 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                      </span>
                      <span>Organizational Week</span>
                    </NavLink>
                  </li>
                  <DropDown
                    name={"Admin"}
                    Icon={MdOutlineAdminPanelSettings}
                    links={[
                      { name: "Moderator", slug: "/role/moderator" },
                      {
                        name: "Administrator",
                        slug: "/gallery/administrator",
                      },
                    ]}
                  />
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </Sidebar>
          </ul>
        </div>
      </div>
    </section>
  );
};

LeftMenu.propTypes = {
  openDrawer: PropTypes.bool,
  setOpenDrawer: PropTypes.func,
};

export default LeftMenu;
