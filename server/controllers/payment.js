import crypto from "crypto";
import axios from "axios";
import { MERCHANT_KEY, MERCHANT_SALT, PAYU_BASE_URL } from "./../utils/helper.js";
import Order from "../models/order.js"

export const createPayment = async (req, res) => {
  try {
    const { orderData } = req.body;

    if (!orderData.userId) {
      return res.status(400).json({
        success: false,
        error: "User ID is required",
      });
    }

    const paymentMethodMap = {
      creditCard: "onlinePayment",
      debitCard: "onlinePayment",
      netBanking: "onlinePayment",
      upi: "onlinePayment",
      cashOnDelivery: "cashOnDelivery",
    };

    const validPaymentMethod =
      paymentMethodMap[orderData.paymentMethod] || "onlinePayment";

    const newOrder = new Order({
      ...orderData,
      paymentMethod: validPaymentMethod,
      paymentStatus: "pending",
    });

    const savedOrder = await newOrder.save();

    if (validPaymentMethod === "cashOnDelivery") {
      return res.status(200).json({
        success: true,
        order: savedOrder,
        paymentData: null,
        payuUrl: null,
      });
    }

    const txnId = `txn${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const amount = orderData.totalAmount.toString();
    const productInfo = orderData.products
      .map((p) => `${p.quantity}x ${p.productId}`)
      .join(", ");

    const userEmail =
      orderData.userEmail ||
      orderData.shippingAddress.email ||
      "customer@example.com";

    const hashString = `${MERCHANT_KEY}|${txnId}|${amount}|${productInfo}|${orderData.shippingAddress.fullName}|${userEmail}|||||||||||${MERCHANT_SALT}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    const paymentData = {
      key: MERCHANT_KEY,
      txnid: txnId,
      amount: amount,
      productinfo: productInfo,
      firstname: orderData.shippingAddress.fullName,
      email: userEmail,
      phone: orderData.shippingAddress.mobile,
      surl: 'http://localhost:5000/success',
      furl: `http://localhost:3000/payment/failure?txnId=${txnId}`,
      hash: hash,
      service_provider: "payu_paisa",
    };

    savedOrder.transactionId = txnId;
    await savedOrder.save();

    res.status(200).json({
      success: true,
      order: savedOrder,
      paymentData,
      payuUrl: PAYU_BASE_URL,
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to create payment request",
    });
  }
};

export const getPaymentStatus = async (req, res) => {
  try {
    const txnId = req.params.txnid;

    const hashString = `${MERCHANT_KEY}|verify_payment|${txnId}|${MERCHANT_SALT}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    const response = await axios.post(
      "https://test.payu.in/merchant/postservice?form=2",
      new URLSearchParams({
        key: MERCHANT_KEY,
        command: "verify_payment",
        var1: txnId,
        hash,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const order = await Order.findOne({ transactionId: txnId })
      .populate({
        path: "userId",
        select: "username email",
      })
      .populate({
        path: "products.productId",
        select: "name image category",
      });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      });
    }

    const payuData = response.data;
    const paymentStatus =
      payuData.transaction_details[txnId]?.status || "pending";

    if (paymentStatus === "success" && order.paymentStatus !== "completed") {
      order.paymentStatus = "completed";
      order.orderStatus = "processing"; 
      await order.save();
    }

    const responseData = {
      payment: {
        status: paymentStatus,
        payuResponse: payuData,
        transactionId: txnId,
        amount: order.totalAmount,
        paymentMethod: order.paymentMethod,
      },
      order: {
        _id: order._id,
        createdAt: order.createdAt,
        status: order.orderStatus,
        products: order.products.map((p) => ({
          productId: p.productId._id,
          name: p.productId.name,
          image: p.productId.image,
          category: p.productId.category,
          quantity: p.quantity,
          price: p.price,
        })),
        shippingAddress: order.shippingAddress,
        user: {
          username: order.userId.username,
          email: order.userId.email,
        },
      },
    };

    res.status(200).json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error(
      "Error checking payment status:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch payment status",
    });
  }
};