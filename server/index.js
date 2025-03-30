import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import paymentRoutes from "./routes/payment.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.send("This is a E-Shop_assignment  API");
});

app.post("/success", (req, res) => {
  const id = req.body.txnid;
  console.log(req.body);
  res.redirect(`http://localhost:3000/success?id=${id}`);
});

app.use("/api/user", userRoutes);
app.use("/api", productRoutes);
app.use("/api/payment", paymentRoutes);
const PORT = process.env.PORT;

const DATABASE_URL = process.env.CONNECTION_URL;

cloudinary.config({
  cloud_name: `${process.env.CLOUD_NAME}`,
  api_key: `${process.env.API_KEY}`,
  api_secret: `${process.env.API_SECRET}`,
});
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
