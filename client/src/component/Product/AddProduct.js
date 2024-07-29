import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LeftNav from "../Home/LeftNav";
import Header from "../Header/Header";
import useAddProduct from "../../hooks/useAddProduct";
import { useSelector } from "react-redux";

const AddProduct = () => {
  const user = useSelector((state) => state.user);
  const { token } = user?.userInfo || {};
  console.log("token", token);
  const { productData, loading, error, handleChange, handleSubmit } =
    useAddProduct(token);

  return (
    <div>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="w-full md:w-1/4 bg-gray-800 text-white p-6">
          <LeftNav />
        </div>
        <div className="w-full md:w-3/4 md:mt-20 mt-0 text-white p-6">
          <div className="bg-gray-300 p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-black mb-6">
                Add New Product
              </h2>
              <div className="mb-4">
                <TextField
                  label="Product Name"
                  variant="outlined"
                  fullWidth
                  required
                  name="productName"
                  value={productData.productName}
                  onChange={handleChange}
                  inputProps={{ minLength: 3 }}
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  required
                  multiline
                  rows={4}
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  inputProps={{ minLength: 10 }}
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="Price"
                  variant="outlined"
                  fullWidth
                  required
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  type="number"
                  inputProps={{ min: 0 }}
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="Category"
                  variant="outlined"
                  fullWidth
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="Quantity"
                  variant="outlined"
                  fullWidth
                  required
                  name="quantity"
                  value={productData.quantity}
                  onChange={handleChange}
                  type="number"
                  inputProps={{ min: 0 }}
                />
              </div>
              <div className="mb-4">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="block w-full text-sm text-gray-500
               file:py-2 file:px-4
               file:rounded-full file:border-0
               file:bg-violet-50 file:text-violet-700
               hover:file:bg-violet-100"
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? "Submitting..." : "Add Product"}
              </Button>
              {error && (
                <div className="text-red-500 mt-4">{error.message}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
