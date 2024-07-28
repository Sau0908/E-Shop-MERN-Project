import React, { useEffect } from "react";
import auth from "../assests/images/auth.png";

import Register from "./Register";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("Profile");

    if (user) {
      const { email, id, token, username } = JSON.parse(user);
      console.log(email, id, token, username);
      dispatch(
        addUser({ email: email, id: id, token: token, username: username })
      );
      navigate("/browse");
    } else {
      navigate("/");
    }
  }, [dispatch, navigate]);
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex flex-col  bg-white p-6">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Welcome to E-Commerce Store
        </h1>
        <p className="mb-4 text-center ">
          Welcome back! To Your Favourite Store
        </p>
        <div className="flex justify-center "></div>
        <div className=" w-full h-[2px] my-2 bg-gray-300"></div>
        <div className="mx-4 overflow-y-auto ">
          <Register />
        </div>
      </div>
      <div className="hidden object-fill  md:flex md:w-1/2 bg-blue-600 ">
        <div className="text-white text-center">
          <div className="flex justify-center">
            <img src={auth} alt="Illustration" className="h-4/5 w-4/5 " />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Connect with Our Store</h2>
            <h5>Everything you need in available here.</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
