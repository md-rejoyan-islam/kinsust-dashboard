import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const DropDown = ({ name, links, Icon, isActive }) => {
  return (
    <>
      <li>
        <button
          type="button"
          className={`${
            isActive ? "bg-gray-800" : ""
          } mb-2 flex items-center w-full p-2 text-[#91a3b8] transition duration-75 rounded-lg  group hover:bg-gray-800 dark:text-white dark:hover:bg-gray-800`}
          aria-controls={`dropdown-id-${name}}`}
          data-collapse-toggle={`dropdown-id-${name}}`}
        >
          <Icon className="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-gray-300 " />

          <span className="flex-1 ml-3 text-left whitespace-nowrap">
            {name}
          </span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <ul id={`dropdown-id-${name}}`} className="hidden py-2 space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.slug}
                className=" rounded-[8px]  w-full block transition duration-75  group text-white/40 hover:text-white/80  "
                style={{
                  padding: "8px 40px",
                }}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </li>
    </>
  );
};

DropDown.propTypes = {
  name: PropTypes.string,
  isActive: PropTypes.bool,
  links: PropTypes.array,
  Icon: PropTypes.func,
};

export default DropDown;
