import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Button,
  Grid,
  Chip,
  CircularProgress,
} from "@mui/material";
import { CheckCircle, LocalShipping, Home, Payment } from "@mui/icons-material";
import axios from "axios";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const txnId = params.get("txnId");

        if (!txnId) {
          throw new Error("Transaction ID not found");
        }

        const response = await axios.get(
          `http://localhost:5000/api/payment/status/${txnId}`
        );

        console.log("Response from success screen", response.data);
        if (!response.data.success) {
          throw new Error(
            response.data.error || "Failed to fetch order details"
          );
        }

        setOrderData(response.data.data);
      } catch (err) {
        setError(err.message || "Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [location.search]);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!orderData) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <Typography variant="h6">No order data found</Typography>
      </Box>
    );
  }

  const { payment, order } = orderData;

  return (
    <Box className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Box className="max-w-4xl mx-auto">
        <Paper elevation={3} className="p-6 mb-8">
          <Box className="text-center mb-8">
            <CheckCircle
              className={
                payment.status === "success"
                  ? "text-green-500"
                  : "text-yellow-500"
              }
              style={{ fontSize: 80 }}
            />
            <Typography variant="h4" className="font-bold mt-4">
              {payment.status === "success"
                ? "Order Confirmed!"
                : "Payment Processing"}
            </Typography>
            <Typography variant="subtitle1" className="text-gray-600 mt-2">
              {payment.status === "success"
                ? "Thank you for your purchase"
                : "We're verifying your payment"}
            </Typography>
            <Box className="mt-4 space-y-2">
              <Chip
                label={`Order #${order._id}`}
                color="primary"
                size="medium"
              />
              <Chip
                label={`Transaction #${payment.transactionId}`}
                color="secondary"
                size="medium"
                className="ml-2"
              />
            </Box>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Paper elevation={2} className="p-6 mb-6">
                <Typography variant="h6" className="font-bold mb-4">
                  Payment & Delivery Information
                </Typography>
                <Divider className="mb-4" />

                {/* Payment Information */}
                <Box className="mb-6">
                  <Typography variant="subtitle2" className="font-bold mb-2">
                    Payment Details
                  </Typography>
                  <Box className="space-y-2">
                    <Typography>
                      <span className="font-semibold">Amount:</span> ₹
                      {payment.amount}
                    </Typography>
                    <Typography>
                      <span className="font-semibold">Method:</span>{" "}
                      {payment.paymentMethod === "onlinePayment"
                        ? "Online Payment"
                        : "Cash on Delivery"}
                    </Typography>
                    <Typography>
                      <span className="font-semibold">Status:</span>
                      <Chip
                        label={payment.status.toUpperCase()}
                        color={
                          payment.status === "success"
                            ? "success"
                            : payment.status === "pending"
                            ? "warning"
                            : "error"
                        }
                        className="ml-2"
                        size="small"
                      />
                    </Typography>
                  </Box>
                </Box>

                {/* Delivery Information */}
                <Box>
                  <Typography variant="subtitle2" className="font-bold mb-2">
                    Delivery Details
                  </Typography>
                  <Box className="space-y-2">
                    <Typography>
                      <span className="font-semibold">Name:</span>{" "}
                      {order.shippingAddress.fullName}
                    </Typography>
                    <Typography>
                      <span className="font-semibold">Address:</span>{" "}
                      {order.shippingAddress.addressLine1},{" "}
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state} -{" "}
                      {order.shippingAddress.pincode}
                    </Typography>
                    <Typography>
                      <span className="font-semibold">Phone:</span>{" "}
                      {order.shippingAddress.mobile}
                    </Typography>
                    <Typography>
                      <span className="font-semibold">Order Status:</span>
                      <Chip
                        label={order.status.toUpperCase()}
                        color={
                          order.status === "processing"
                            ? "warning"
                            : order.status === "shipped"
                            ? "info"
                            : order.status === "delivered"
                            ? "success"
                            : "default"
                        }
                        className="ml-2"
                        size="small"
                      />
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              <Box className="flex justify-center space-x-4 mt-6">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<LocalShipping />}
                  onClick={() => navigate("/orders")}
                >
                  Track Order
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Home />}
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={5}>
              <Paper elevation={3} className="p-6">
                <Typography variant="h6" className="font-bold mb-4">
                  Order Summary
                </Typography>

                {order.products.map((item, index) => (
                  <Card key={index} className="mb-4" variant="outlined">
                    <CardContent className="flex">
                      <CardMedia
                        component="img"
                        image={item.image || "/placeholder-product.jpg"}
                        alt={item.name}
                        className="w-24 h-24 object-contain"
                      />
                      <Box className="ml-4 flex-grow">
                        <Typography variant="subtitle1" className="font-bold">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.category}
                        </Typography>
                        <Typography variant="body1" className="font-bold mt-1">
                          ₹{item.price} × {item.quantity}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}

                <Divider className="my-3" />
                <Box className="mb-4">
                  <Box className="flex justify-between mb-2">
                    <Typography>Subtotal</Typography>
                    <Typography>₹{order.totalAmount}</Typography>
                  </Box>
                  <Box className="flex justify-between mb-2">
                    <Typography>Shipping</Typography>
                    <Typography className="text-green-600">FREE</Typography>
                  </Box>
                  <Box className="flex justify-between font-bold text-lg">
                    <Typography>Total</Typography>
                    <Typography>₹{order.totalAmount}</Typography>
                  </Box>
                </Box>

                {payment.status === "success" && (
                  <Box className="mt-4 p-3 bg-green-50 rounded">
                    <Typography variant="body2" className="text-green-700">
                      <Payment className="mr-1" fontSize="small" />
                      Your payment of ₹{payment.amount} was successful.
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default OrderSuccess;
