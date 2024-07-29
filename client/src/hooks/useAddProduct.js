import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const useAddProduct = (authToken) => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProductData({
      ...productData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("quantity", productData.quantity);
    if (productData.image && typeof productData.image === "object") {
      formData.append("image", productData.image);
    }

    try {
      console.log("authToken From addProduct", authToken);
      const response = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      Swal.fire("Success", "Product Added Successfully", "success");
      navigate("/browse");
    } catch (error) {
      setError(error);
      Swal.fire("Error", "Failed to Add Product: " + error.message, "error");
      console.error("Error submitting product:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    productData,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};

export default useAddProduct;
