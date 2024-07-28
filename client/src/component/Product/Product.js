import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import LeftNav from "../Home/LeftNav";
import Header from "../Header/Header";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://e-shop-mern-project.vercel.app/api/products/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError("Error fetching product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  if (loading) {
    return <div className="container mx-auto py-8 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className=" w-full min-h-screen flex flex-col md:flex-row  ">
        <LeftNav />
        <div className="flex flex-col md:flex-row items-start  bg-gray-200 shadow-lg rounded-lg w-full">
          <div className="w-full md:w-1/2 p-4">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src={product.image}
                alt={product.productName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              {product.productName}
            </h2>
            <p className="text-2xl font-bold text-indigo-600 mb-4">
              ₹{product.price}
            </p>
            <div className="flex items-center mb-6">
              <span className="text-black flex items-center mr-4">
                {product.description}
              </span>
            </div>
            <p className="text-gray-500 mb-4">Free Delivery</p>
            <div className="flex items-center mb-6">
              <button
                className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-300 ease-in-out"
                onClick={handleDecreaseQuantity}
              >
                <FaMinus />
              </button>
              <span className="mx-4 text-xl">{quantity}</span>
              <button
                className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-300 ease-in-out"
                onClick={handleIncreaseQuantity}
              >
                <FaPlus />
              </button>
            </div>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300 ease-in-out mb-6">
              Add to Cart
            </button>
            <div>
              <p className="text-gray-700 font-semibold mb-2">
                Product Details
              </p>
              <ul className="text-gray-600 mb-4">
                <li>
                  <span className="font-semibold">Name:</span>{" "}
                  {product.productName}
                </li>
                <li>
                  <span className="font-semibold">Available Quantity:</span>{" "}
                  {product.quantity}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
