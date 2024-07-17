import { Sidebar } from "flowbite-react";
import PropsTypes from "prop-types";
import { NavLink } from "react-router-dom";

export default function SidebarMenu({ Icon, name, links, isActive }) {
  return (
    <Sidebar.Collapse
      icon={Icon}
      label={name}
      className={`${
        isActive ? "bg-gray-800" : ""
      } mb-2 flex items-center w-full p-2 text-[#91a3b8] transition duration-75 rounded-lg  group hover:bg-gray-800 dark:text-white dark:hover:bg-gray-800 gap-3`}
    >
      <Sidebar.Items
        style={{
          paddingBottom: "10px",
        }}
      >
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.slug}
            className=" py-2 px-10 rounded-[8px]  w-full block transition duration-75  group text-white/40 hover:text-white/80  "
          >
            {link.name}
          </NavLink>
        ))}
      </Sidebar.Items>
    </Sidebar.Collapse>
  );
}

SidebarMenu.propTypes = {
  name: PropsTypes.string,
  isActive: PropsTypes.bool,
  links: PropsTypes.array,
  Icon: PropsTypes.elementType,
};
