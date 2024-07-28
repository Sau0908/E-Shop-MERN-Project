import React from "react";
import { NavLink } from "react-router-dom";

const LeftNav = () => {
  return (
    <div className="w-full md:w-1/4 bg-gray-800 text-white p-6">
      <h2 className="text-3xl font-bold mb-6 bg-gray-700 rounded">Account</h2>
      <ul>
        <li className="mb-4">
          <NavLink
            to="/browse"
            className="text-left w-full p-2 mb-2 rounded block"
            activeClassName="bg-gray-300"
          >
            My Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/alluser"
            className="text-left w-full p-2 mb-2 block"
            activeClassName="bg-gray-300"
          >
            All Users
          </NavLink>
        </li>
      </ul>
      <h2 className="text-3xl font-bold bg-gray-700 mb-6 rounded">Product</h2>
      <ul>
        <li className="mb-4">
          <NavLink
            to="/allproduct"
            className="text-left w-full p-2 mb-2 rounded block"
            activeClassName="bg-gray-300"
          >
            All Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/addproduct"
            className="text-left w-full p-2 mb-2 block"
            activeClassName="bg-gray-300"
          >
            Add Product
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default LeftNav;
