import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import LeftNav from "../Home/LeftNav";
import Header from "../Header/Header";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://e-shop-mern-project.vercel.app/api/products");
        setProducts(response.data);
      } catch (error) {
        setError("Error fetching products");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col md:flex-row">
        <LeftNav />
        <div className="flex-grow grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:gap-16 gap-12 p-4 ">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
