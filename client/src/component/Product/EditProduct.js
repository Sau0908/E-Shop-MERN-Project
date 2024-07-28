import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LeftNav from "../Home/LeftNav";
import Header from "../Header/Header";
import useEditProduct from "../../hooks/useEditProduct";

const EditProduct = () => {
  const {
    productData,
    loading,
    error,
    handleChange,
    handleSubmit,
    handleDeleteProduct,
  } = useEditProduct();

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col md:flex-row">
        <LeftNav />
        <div className="flex-1 text-white p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-black mb-6">Edit Product</h2>
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
              style={{ marginBottom: "6px" }}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
            {error && <div className="text-red-500 mt-4">{error.message}</div>}
          </form>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleDeleteProduct}
          >
            Delete Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
