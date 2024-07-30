import React from "react";
import Header from "../Header/Header";
import LeftNav from "./LeftNav";

const ShimmerLoadingUI = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="w-full md:w-1/4 bg-gray-800 text-white p-6 md:static">
          <LeftNav />
        </div>
      </div>
    </div>
  );
};

export default ShimmerLoadingUI;
