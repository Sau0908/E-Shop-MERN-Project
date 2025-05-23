import React from "react";
import Header from "../Header/Header";
import AllProduct from "../Product/AllProduct";
import { useSelector } from "react-redux";
import AdminPannel from "../Admin/AdminPannel";

const Body = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="">
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="w-full md:flex-grow p-4">
          {!user.isAdmin ? <AllProduct /> : <AdminPannel />}
        </div>
      </div>
    </div>
  );
};

export default Body;
