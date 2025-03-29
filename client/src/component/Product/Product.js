import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const user = useSelector((state) => state.user);

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

  const handleAddToCart = () => {
    if (!user.isAuthenticated) {
      Swal.fire("Oops! Please login first to add items to the cart.");
    }
  };

  const handleBuyNow = () => {
    if (!user.isAuthenticated) {
      Swal.fire("Please login to proceed with your purchase.");
    }
    // Add your buy now logic here
  };

  if (loading) {
    return (
      <Container className="py-8 text-center">
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-8 text-center">
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <div>
      <Header />
      <Container maxWidth="lg" className="my-24">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box className="aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.productName}
                  className="w-full h-full object-contain p-4"
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                component="h1"
                className="font-bold mb-4"
              >
                {product.productName}
              </Typography>

              <Typography
                variant="h5"
                className="text-indigo-600 font-bold mb-12"
              >
                ₹{product.price}
              </Typography>

              <Box className="my-6">
                <Typography variant="body2" className="font-semibold my-8">
                  Description
                </Typography>
                <Typography variant="body1" className="text-gray-700">
                  {product.description}
                </Typography>
              </Box>

              <Box className="flex items-center mb-6">
                <Typography variant="subtitle1">
                  Quantity
                </Typography>
                <Paper
                  elevation={2}
                  className="flex items-center rounded-lg overflow-hidden ml-4"
                   
                >
                  <IconButton
                    size="small"
                    onClick={handleDecreaseQuantity}
                    className="hover:bg-gray-100"
                  >
                    <FaMinus className="text-gray-600" />
                  </IconButton>
                  <Divider orientation="vertical" flexItem />
                  <Typography className="px-4">{quantity}</Typography>
                  <Divider orientation="vertical" flexItem />
                  <IconButton
                    size="small"
                    onClick={handleIncreaseQuantity}
                    className="hover:bg-gray-100"
                  >
                    <FaPlus className="text-gray-600" />
                  </IconButton>
                </Paper>
              </Box>

              {!user.isAdmin && (
                <Box className="flex gap-4 mb-8">
                  <Button
                    variant="contained"
                    color="primary"
                    className="bg-indigo-600 hover:bg-indigo-700"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </Button>
                </Box>
              )}

              <Divider className="my-4" />
              <Box>
                <Typography variant="h6" className="font-semibold mb-3">
                  Product Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography className="font-medium">Category:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>{product.category}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className="font-medium">
                      Availability:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      color={
                        product.quantity > 0 ? "success.main" : "error.main"
                      }
                    >
                      {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className="font-medium">Shipping:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>Free Delivery</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
      </Container>
    </div>
  );
};

export default Product;
