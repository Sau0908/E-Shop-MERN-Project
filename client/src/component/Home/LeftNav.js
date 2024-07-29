import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const LeftNav = ({ className }) => {
  const user = useSelector((state) => state.user);
  return (
    <div
      className={`${className} md:fixed md:top-20 md:left-0 md:h-full overflow-auto bg-gray-800 text-white w-full md:w-auto`}
    >
      <div className="p-6">
        {user.isAdmin && (
          <div>
            <ul>
              <li className="mb-4">
                <NavLink
                  to="/alluser"
                  className="text-left w-full p-2 mb-2 rounded block"
                  activeClassName="bg-gray-300"
                >
                  All User
                </NavLink>
              </li>
            </ul>
            <h2 className="text-3xl font-semibold underline mb-6">Product</h2>
            <ul>
              <li className="mb-4">
                <NavLink
                  to="/addproduct"
                  className="text-left w-full p-2 mb-2 rounded block"
                  activeClassName="bg-gray-300"
                >
                  Add Product
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        <h2 className="text-3xl font-semibold underline mb-6 rounded p-2">
          Categories
        </h2>
        <ul>
          <li className="mb-4">
            <NavLink
              to="/allcategories"
              className="text-left w-full p-2 mb-2 rounded block"
              activeClassName="bg-gray-300"
            >
              MAC OS
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/allcategories"
              className="text-left w-full p-2 mb-2 rounded block"
              activeClassName="bg-gray-300"
            >
              IPhone
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/allcategories"
              className="text-left w-full p-2 mb-2 rounded block"
              activeClassName="bg-gray-300"
            >
              Samsung Phone
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/allcategories"
              className="text-left w-full p-2 mb-2 rounded block"
              activeClassName="bg-gray-300"
            >
              Samsung Laptop
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftNav;
