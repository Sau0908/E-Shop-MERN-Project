import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (product._id) {
      navigate(`/product/${product._id}`);
    }
  };

  const handleEditClick = (e) => {
    navigate(`/editproduct/${product._id}`);
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out relative w-64 h-96 bg-white cursor-pointer m-4 flex flex-col">
      <div onClick={handleCardClick} className="flex-grow">
        <div className="relative overflow-hidden rounded-lg h-40 mb-2">
          <img
            src={product.image}
            alt={product.productName}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1 hover:underline hover:cursor-pointer">
          {product.productName}
        </h2>
        <p className="text-gray-500 mb-1">Category: {product.category}</p>
        <p className="text-gray-500 mb-2">Quantity: {product.quantity}</p>
        <div className="flex justify-between items-center mb-2">
          <p className="text-xl font-bold text-indigo-600">₹{product.price}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <button
          className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out"
          onClick={handleEditClick}
        >
          <FaEdit className="mr-1" />
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
