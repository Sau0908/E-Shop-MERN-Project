import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import axios from "axios";
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
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Header from "../Header/Header";

const BuyNow = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    paymentMethod: "cashOnDelivery",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
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

  useEffect(() => {
    if (!user.isAuthenticated) {
      Swal.fire({
        title: "Authentication Required",
        text: "Please login to proceed with your purchase.",
        icon: "warning",
      }).then(() => {
        navigate("/login");
      });
    }
  }, [user, navigate]);

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    try {

          if (
            !user ||
            !user.userInfo ||
            !user.userInfo.id ||
            !user.userInfo.email
          ) {
            throw new Error(
              "User information is incomplete or improperly structured"
            );
          }
      const orderData = {
        userId: user.userInfo.id,
        products: [
          {
            productId: product._id,
            quantity: quantity,
            price: product.price,
          },
        ],
        shippingAddress: formData,
        totalAmount: product.price * quantity,
        paymentMethod: formData.paymentMethod,
      };

      console.log("order data payload",orderData)

      const response = await axios.post("http://localhost:5000/api/payment", {
        orderData,
      });

      console.log("response" , response.data)

      if (formData.paymentMethod === "cashOnDelivery") {
        Swal.fire({
          title: "Order Placed Successfully!",
          text: `Your order #${response.data.order._id} has been placed.`,
          icon: "success",
        }).then(() => {
          navigate("/orders");
        });
      } else {
        const { paymentData, payuUrl } = response.data;

        const form = document.createElement("form");
        form.method = "POST";
        form.action = payuUrl;

        Object.keys(paymentData).forEach((key) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = paymentData[key];
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      }
    } catch (error) {
      console.error("Order error:", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.error || "Failed to place order",
        icon: "error",
      });
    }
  };
  const validateForm = () => {
    const requiredFields = [
      "fullName",
      "mobile",
      "addressLine1",
      "city",
      "state",
      "pincode",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        Swal.fire({
          title: "Validation Error",
          text: `Please fill in the ${field
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()} field.`,
          icon: "error",
        });
        return false;
      }
    }

    // Validate mobile number
    if (!/^\d{10}$/.test(formData.mobile)) {
      Swal.fire({
        title: "Validation Error",
        text: "Please enter a valid 10-digit mobile number.",
        icon: "error",
      });
      return false;
    }

    // Validate pincode
    if (!/^\d{6}$/.test(formData.pincode)) {
      Swal.fire({
        title: "Validation Error",
        text: "Please enter a valid 6-digit pincode.",
        icon: "error",
      });
      return false;
    }

    return true;
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

  if (!product) {
    return (
      <Container className="py-8 text-center">
        <Typography>Product not found</Typography>
      </Container>
    );
  }

  return (
    <div>
      <Header />
      <Container maxWidth="lg" className="my-24">
        <Typography variant="h4" component="h1" className="font-bold mb-6">
          Place Your Order
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Paper elevation={3} className="p-6">
              <Typography variant="h6" className="font-bold mb-4">
                Delivery Address
              </Typography>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      maxLength="10"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Address Line 1 */}
                  <div>
                    <label
                      htmlFor="addressLine1"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      id="addressLine1"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Address Line 2 */}
                  <div>
                    <label
                      htmlFor="addressLine2"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Address Line 2 (Optional)
                    </label>
                    <input
                      type="text"
                      id="addressLine2"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* City */}
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>

                    {/* State */}
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Pincode */}
                    <div>
                      <label
                        htmlFor="pincode"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Pincode
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        maxLength="6"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Country */}
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="paymentMethod"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Payment Method
                    </label>
                    <FormControl fullWidth>
                      <Select
                        id="paymentMethod"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                        required
                      >
                        <MenuItem value="cashOnDelivery">
                          Cash on Delivery
                        </MenuItem>
                        <MenuItem value="creditCard">Payment Online</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper elevation={3} className="p-6">
              <Typography variant="h6" className="font-bold mb-4">
                Order Summary
              </Typography>
              <Card className="mb-4" variant="outlined">
                <CardContent className="flex">
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.productName}
                    className="w-24 h-24 object-contain"
                  />
                  <Box className="ml-4 flex-grow">
                    <Typography variant="subtitle1" className="font-bold">
                      {product.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.category}
                    </Typography>
                    <Typography variant="body1" className="font-bold mt-1">
                      ₹{product.price}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
              <Box className="flex items-center justify-between mb-4">
                <Typography variant="subtitle1">Quantity</Typography>
                <Box className="flex items-center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleDecreaseQuantity}
                    disabled={quantity <= 1}
                    sx={{
                      minWidth: "auto",
                      padding: "2px 4px",
                    }}
                  >
                    <FaMinus />
                  </Button>
                  <Typography
                    sx={{
                      marginX: 3,
                    }}
                  >
                    {quantity}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleIncreaseQuantity}
                    sx={{
                      minWidth: "auto",
                      padding: "2px 4px",
                    }}
                  >
                    <FaPlus />
                  </Button>
                </Box>
              </Box>

              <Divider className="my-3" />
              <Box className="mb-4">
                <Box className="flex justify-between mb-2">
                  <Typography>Subtotal</Typography>
                  <Typography>₹{product.price * quantity}</Typography>
                </Box>
                <Box className="flex justify-between mb-2">
                  <Typography>Shipping</Typography>
                  <Typography className="text-green-600">FREE</Typography>
                </Box>
                <Box className="flex justify-between font-bold text-lg">
                  <Typography>Total</Typography>
                  <Typography>₹{product.price * quantity}</Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleSubmit}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Place Order
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default BuyNow;
