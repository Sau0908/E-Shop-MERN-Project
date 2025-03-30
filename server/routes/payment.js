import express from "express";
import { createPayment , getPaymentStatus } from "../controllers/payment.js";

const router = express.Router();

router.post("/", createPayment);
router.get("/status/:txnid", getPaymentStatus);

export default router;
