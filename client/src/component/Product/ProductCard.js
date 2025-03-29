import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

const ProductCard = ({ product }) => {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleCardClick = () => {
    if (product._id) {
      navigate(`/product/${product._id}`);
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    navigate(`/editproduct/${product._id}`);
  };

  return (
    <div className="flex flex-col items-center w-56">
      <div
        className="relative w-full aspect-[3/4] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden mb-2"
        onClick={handleCardClick}
      >
        <div className="absolute inset-0">
          <img
            src={product.image}
            alt={product.productName}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {user.isAdmin && (
          <button
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 z-10"
            onClick={handleEditClick}
            aria-label="Edit product"
          >
            <FaEdit className="text-blue-600" />
          </button>
        )}
      </div>
      <div className="w-full px-1 flex justify-between items-start">
        <h4
          className="text-md font-medium text-gray-800 truncate pr-2 hover:underline cursor-pointer"
          onClick={handleCardClick}
        >
          {product.productName}
        </h4>
        <p className="text-lg font-semibold text-gray-800 whitespace-nowrap">
          ₹{product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
