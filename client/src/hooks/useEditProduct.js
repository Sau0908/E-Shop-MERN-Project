import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const useEditProduct = (authToken) => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error);
      }
    };
    fetchProduct();
  }, [id]);

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
      console.log("authToken From editProduct", authToken);
      await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });
      Swal.fire("Success", "Product Edited Successfully", "success");
      navigate("/browse");
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire("Error", "Failed to Edit Profile: " + error.message, "error");
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      console.log("authToken From DeleteProduct", authToken);
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      Swal.fire("Success", "Product Successfully Deleted", "success");
      navigate("/browse");
    } catch (error) {
      console.error("There was an error deleting the product!", error);
      Swal.fire("Error", "Failed to Delete Product: " + error.message, "error");
    }
  };

  return {
    productData,
    loading,
    error,
    handleChange,
    handleSubmit,
    handleDeleteProduct,
  };
};

export default useEditProduct;
