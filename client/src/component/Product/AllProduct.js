import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://e-shop-mern-project.vercel.app/api/products"
        );
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
    <div className="mx-auto max-w-6xl">
      <div className="my-24 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 px-4">
        {products.map((product) => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
