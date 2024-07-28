import React, { useEffect, useState } from "react";
import { FaCartArrowDown, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { username } = user?.userInfo || {};

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(removeUser());

    localStorage.removeItem("Profile");

    navigate("/");
  };

  return (
    <header className="bg-white shadow-lg ">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-800">
          <a href="/" className="hover:text-gray-600">
            E-Shop
          </a>
        </div>
        <nav className="hidden md:flex space-x-4">
          <a href="/shop" className="text-gray-800 hover:text-gray-600">
            Product
          </a>
          <a href="/about" className="text-gray-800 hover:text-gray-600">
            Dashboard
          </a>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <a href="/account" className="text-gray-800 flex hover:text-gray-600">
            <CgProfile size={30} />
            <p className="ml-2 underline">{username}</p>
          </a>
          <button
            onClick={handleLogout}
            className="text-gray-800 hover:text-gray-600 focus:outline-none"
          >
            <FaSignOutAlt size={30} />
          </button>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-800 hover:text-gray-600 focus:outline-none"
          >
            {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col space-y-4 px-4 py-6">
            <a href="/shop" className="text-gray-800 hover:text-gray-600">
              Product
            </a>
            <a href="/about" className="text-gray-800 hover:text-gray-600">
              Dashboard
            </a>

            <a
              href="/account"
              className="text-gray-800 hover:text-gray-600 flex items-center"
            >
              <CgProfile size={20} className="mr-2" />
              Account
            </a>
            <button
              onClick={handleLogout}
              className="text-gray-800 hover:text-gray-600 flex items-center focus:outline-none"
            >
              <FaSignOutAlt size={20} className="mr-2" />
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
