import React, { useState } from "react";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import UserAvatar from "../User/UserAvatar";
import { FaSignInAlt } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogIn = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    dispatch(removeUser());
    localStorage.removeItem("Profile");
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-800">
          <a href="/" className="hover:text-gray-600">
            E-Shop
          </a>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Link to="/browse" className="text-gray-800 hover:text-gray-600">
            Product
          </Link>
          <Link to="/shop" className="text-gray-800 hover:text-gray-600">
            Categories
          </Link>
          {user.isAdmin && (
            <Link to="/browse" className="text-gray-800 hover:text-gray-600">
              Admin Panel
            </Link>
          )}
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <UserAvatar />
          {!user.isAuthenticated ? (
            <button
              onClick={handleLogIn}
              className="text-gray-800 flex mr-2 hover:text-gray-600 focus:outline-none"
            >
              <FaSignInAlt size={30} />{" "}
              <p className="ml-2 hover:underline ">LogIn </p>
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="text-gray-800 flex mr-2 hover:text-gray-600 focus:outline-none"
            >
              <FaSignOutAlt size={30} />{" "}
              <p className="ml-2 hover:underline">LogOut </p>
            </button>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-800 hover:text-gray-600 focus:outline-none mr-4"
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
              Admin Pannel
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
